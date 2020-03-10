const redis = require('redis')

const client = redis.createClient({
	url: process.env.REDIS_URL,
	retry_strategy: options => {
		if (options.error && options.error.code === "ECONNREFUSED") {
			// End reconnecting on a specific error and flush all commands with
			// a individual error
			return new Error("The server refused the connection");
		}
		if (options.total_retry_time > 1000 * 60 * 60) {
			// End reconnecting after a specific timeout and flush all commands
			// with a individual error
			return new Error("Retry time exhausted");
		}
		if (options.attempt > 10) {
			// End reconnecting with built in error
			return undefined;
		}
		// reconnect after
		return Math.min(options.attempt * 100, 3000);
	}
})

client.on('error', function(error) {
	console.error(error)
})

function appendToCollection(prefix, key) {
	return new Promise((resolve, reject) => {
		client.rpush(prefix, key, (error, value) => {
			if (error) reject(error)
			if (!value) reject()

			resolve(value)
		})
	})
}

function removeFromCollection(prefix, key) {
	return new Promise((resolve, reject) => {
		client.lrem([prefix, 0, key], (error, value) => {
			if (error) reject(error)
			if (value === 0) reject(new Error('Not found'))

			resolve(value)
		})
	})
}

function getCollection(prefix) {
	return new Promise((resolve, reject) => {
		client.lrange(prefix, 0, -1, (error, values) => {
			if (error) reject(error)

			resolve(values)
		})
	})
}

function set(prefix, key, obj) {
	return new Promise((resolve, reject) => {
		const true_key = [prefix, key].join(':')

		const destructed = []
		for(let [key, value] of Object.entries(obj))
			destructed.push(key, value)

		client.hmset(true_key, ...destructed, (error, value) => {
			if (error) reject(error)
			if (!value) reject()

			appendToCollection(prefix, key)
				.then(() => resolve(value))
				.catch(error => reject(error))
		})
	})
}

function get(prefix, key) {
	return new Promise((resolve, reject) => {
		const true_key = [prefix, key].join(':')

		client.hgetall(true_key, (error, value) => {
			if (error) reject(error)
			if (!value) reject()

			resolve(value)
		})
	})
}
function getAll(prefix) {
	return new Promise(async (resolve, reject) => {
		const operations = []

		const items = await getCollection(prefix)
		items.map(item => {
			const true_key = [prefix, item].join(':')

			operations.push(['hgetall', true_key])
		})

		client.multi(operations).exec((error, replies) => {
			if (error) reject(error)

			resolve(replies)
		})
	})
}

function del(prefix, key) {
	return new Promise((resolve, reject) => {
		const true_key = [prefix, key].join(':')

		client.del(true_key, (error, value) => {
			if (error) reject(error)
			if (!value || value !== 1) reject()

			removeFromCollection(prefix, key)
				.then(() => resolve())
				.catch(error => reject(error))
		})
	})
}

function create(namespace) {
	return {
		del: (key) => del(namespace, key),
		get: (key) => get(namespace, key),
		getAll: () => getAll(namespace),
		set: (key, obj) => set(namespace, key, obj),
	}
}

module.exports = {
	create,
	del,
	get,
	getAll,
	set
}
