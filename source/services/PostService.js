const { nanoid } = require('nanoid')

const { models } = require('@tuuturu/motoblog-common')
const { SaneRedis } = require('@tuuturu/toolbox-node/data')
const log = require('../logging')

const client = new SaneRedis.Client()
client.connect(process.env.REDIS_URI)
	.then(() => log.info('Successfully connected to Redis'))
	.catch(() => log.error(`Unable to connect to Redis on ${process.env.REDIS_URI}`))

const createKey = principal => [ principal, 'posts' ].join(':')

function ensureID(id) {
	if(!id || id === -1) return nanoid()
	
	return id
}

async function getPublicPostsByUser(user) {
	const repo = client.createCollectionRepository(createKey(user))

	return repo.getAll()
		.filter(post => post.status === models.PostType.PUBLISHED)
		.map(post => new models.Post(post))
}

async function getAllPostsForPrincipal(principal) {
	const repo = client.createCollectionRepository(createKey(principal))

	const all_posts = await repo.getAll()

	return all_posts
		.filter(post => post.author === principal)
		.map(post => new models.Post(post))
}

async function getPostsByTrip(principal, trip_id) {
	const repo = client.createCollectionRepository(createKey(principal))
	const imageRepo = client.createCollectionRepository([ principal, 'images' ].join(':'))
	const all_posts = await repo.getAll()

	let relevant_posts = all_posts.filter(post => post.trip === trip_id)

	relevant_posts = relevant_posts.map(async post => {
		const images = await imageRepo.getAll()

		return new models.Post({
			...post,
			images: images.filter(image => image.post_id === post.id)
		})
	})

	return relevant_posts
}

async function getPost(principal, id) {
	const repo = client.createCollectionRepository(createKey(principal))
	const imageRepo = client.createCollectionRepository([ principal, 'images' ].join(':'))
	const pointsRepo = client.createCollectionRepository([ principal, 'points', id].join(':'))

	const post = new models.Post(await repo.get(id))
	const images = await imageRepo.getAll()
	post.images = images.filter(image => image.post_id === id)
	post.points = await pointsRepo.getAll()

	return post
}

async function deletePost(principal, id) {
	const repo = client.createCollectionRepository(createKey(principal))

	return repo.del(id)
}

async function savePost(principal, post) {
	post.id = ensureID(post.id)
	post.author = principal

	const repo = client.createCollectionRepository(createKey(principal))
	const imageRepo = client.createCollectionRepository([ principal, 'images' ].join(':'))
	const pointsRepo = client.createCollectionRepository([ principal, 'points', post.id].join(':'))

	let original_post = {}
	try {
		original_post = await repo.get(post.id)

		await repo.del(post.id)
	}
	catch (error) {}

	const updatedPost = new models.Post(Object.assign(original_post, post))

	updatedPost.images.forEach(image => imageRepo.set(image.id, { id: image.id, post_id: updatedPost.id }))
  updatedPost.points.forEach(point => pointsRepo.set(point.time, point))

	log.debug('Saving post', updatedPost)
	const payload = { ...updatedPost }
	delete payload.images
	delete payload.points
	await repo.set(post.id, payload)

	return updatedPost
}

module.exports = {
	getPostsByTrip,
	getAllPostsForPrincipal,
	getPublicPostsByUser,
	getPost,
	deletePost,
	savePost
}
