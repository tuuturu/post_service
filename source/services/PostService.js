const nanoid = require('nanoid')

const { mockPosts } = require('../controllers/__tests__/mock_data')

const db = {
	posts: [ ...mockPosts ]
}

async function getPosts() {
	return [ ...db.posts ]
}

async function getPost(id) {
	const results = db.posts.filter(post => post.id === id)

	if (results.length === 0) throw new ReferenceError()

	return results[0]
}

async function deletePost(id) {
	const index = db.posts.findIndex(item => item.id === id)

	if (index < 0) throw new ReferenceError()

	return db.posts.splice(index, 1)[0]
}

async function savePost(post) {
	if (!post.id) post.id = nanoid()

	let original_post = {}
	try {
		original_post = await getPost(post.id)

		await deletePost(post.id)
	}
	catch (error) {}

	const updatedPost = Object.assign(original_post, post)

	db.posts.push(updatedPost)

	return updatedPost
}

module.exports = {
	getPosts,
	getPost,
	deletePost,
	savePost
}
