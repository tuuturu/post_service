const nanoid = require('nanoid')
const DBManager = require('../db')

const db_manager = DBManager.create('posts')

async function getPosts() {
	return await db_manager.getAll()
}

async function getPost(id) {
	return await db_manager.get(id)
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

	await db_manager.set(post.id, updatedPost)

	return updatedPost
}

module.exports = {
	getPosts,
	getPost,
	deletePost,
	savePost
}
