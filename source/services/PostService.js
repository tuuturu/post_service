const { nanoid } = require('nanoid')

const { models } = require('@tuuturu/motoblog-common')
const { SaneRedis } = require('@tuuturu/toolbox-node/data')
const log = require('../logging')

const client = new SaneRedis.Client()
client.connect(process.env.REDIS_URI)
	.then(() => log.info('Successfully connected to Redis'))
	.catch(() => log.error(`Unable to connect to Redis on ${process.env.REDIS_URI}`))

const createKey = principal => [ principal, 'posts' ].join(':')

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

	const post = new models.Post(await repo.get(id))
	const images = await imageRepo.getAll()
	post.images = images.filter(image => image.post_id === id)

	return post
}

async function deletePost(principal, id) {
	const repo = client.createCollectionRepository(createKey(principal))

	return repo.del(id)
}

async function savePost(principal, post) {
	const repo = client.createCollectionRepository(createKey(principal))
	const imageRepo = client.createCollectionRepository([ principal, 'images' ].join(':'))
	if (!post.id) post.id = nanoid()
	post.author = principal

	let original_post = {}
	try {
		original_post = await repo.get(post.id)

		await repo.del(post.id)
	}
	catch (error) {}

	const updatedPost = new models.Post(Object.assign(original_post, post))

	if (updatedPost.images) {
		updatedPost.images.map(image_id => imageRepo.set(image_id, { post_id: updatedPost.id }))

		delete updatedPost.images
	}

	log.debug('Saving post', updatedPost)

	await repo.set(post.id, updatedPost)

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
