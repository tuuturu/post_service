const express = require('express')

const { savePost, deletePost, getPost, getPublicPostsByUser } = require('../services/PostService')

const router = express.Router()

router.post('/', async (req, res) => {
	const post = req.body

	if (post.id) return res.status(400).end()

	post.author = req.principal
	if (post.images.length === 0) delete post.images

	const result = await savePost(post)

	res.status(201).json(result).end()
})

router.patch('/:id', async (req, res) => {
	const post = req.body

	if (!req.params.id) return res.status(400).end()

	post.id = req.params.id

	await savePost(post)

	res.json(post).end()
})

router.delete('/:id', async (req, res, next) => {
	const id = req.params.id

	if (!id) return res.status(400).end()

	try {
		await deletePost(id)

		res.status(204).end()
	}
	catch (error) {
		if (error instanceof ReferenceError) res.status(404).end()
		else next(error)
	}
})

router.get('/:id', async (req, res, next) => {
	const id = req.params.id

	if (!id) return res.status(400).end()

	try {
		const post = await getPost(id)

		res.json(post).end()
	}
	catch (error) {
		if (error instanceof ReferenceError) res.status(404).end()
		else next(error)
	}
})

router.get('/', async (req, res, next) => {
	let posts = []
	const user = req.query.user

	try {
		posts = await getPublicPostsByUser(user)

		res.json(posts).end()
	}
	catch (error) {
		if (error instanceof ReferenceError) res.status(404).end()
		else next(error)
	}
})


module.exports = router
