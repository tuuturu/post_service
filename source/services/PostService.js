const nanoid = require('nanoid')
const DBManager = require('../db')

const { models } = require('@tuuturu/motoblog-common')
const log = require('../logging')

const db_manager = DBManager.create('posts')
const image_manager = DBManager.create('images')

async function getPublicPostsByUser(user) {
	const all_posts = await db_manager.getAll()

	return all_posts
		.filter(post => post.author === user)
		.filter(post => post.status === models.PostType.PUBLISHED)
		.map(post => new models.Post(post))
}

async function getAllPostsForPrincipal(principal) {
	const all_posts = await db_manager.getAll()

	return all_posts
		.filter(post => post.author === principal)
		.map(post => new models.Post(post))
}

async function getPostsByTrip(trip_id) {
	const all_posts = await db_manager.getAll()

	let relevant_posts = all_posts.filter(post => post.trip === trip_id)

	relevant_posts = relevant_posts.map(post => {
		post.images = image_manager.getAll().filter(image => image.post_id === post.id)
	})

	return relevant_posts.map(post => new models.Post(post))
}

async function getPost(id) {
	const post = new models.Post(await db_manager.get(id))
	post.images = await image_manager.getAll().filter(image => image.post_id === id)

	return post
}

async function deletePost(id) {
	return await db_manager.del(id)
}

async function savePost(post) {
	if (!post.id) post.id = nanoid()

	let original_post = {}
	try {
		original_post = await db_manager.get(post.id)

		await db_manager.del(post.id)
	}
	catch (error) {}

	const updatedPost = Object.assign(original_post, post)

	if (updatedPost.hasOwnProperty('images')) {
		if (updatedPost.images)
			updatedPost.images.map(image_id => image_manager.set(image_id, { post_id: updatedPost.id }))

		delete updatedPost.images
	}

	log.debug('Saving post', updatedPost)

	await db_manager.set(post.id, updatedPost)

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
