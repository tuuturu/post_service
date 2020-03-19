const express = require('express')

const { models } = require('@tuuturu/motoblog-common')
const { savePost, deletePost, getPost, getPublicPostsByUser } = require('../services/PostService')

const router = express.Router()

router.post('/', async (req, res) => {
	if (req.body.id) return res.status(400).end()
	if (!req.principal) return res.status(401).end()

	const post = new models.Post(req.body)
	post.author = req.principal

	const result = await savePost(post)

	res.status(201).json(result).end()
})

router.patch('/:id', async (req, res) => {
	if (!req.params.id) return res.status(400).end()
	const post = new models.Post(req.body)

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
	if (!req.params.id) return res.status(400).end()

	const id = req.params.id

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
	if (!req.query.user) return res.status(400).end()

	try {
		const posts = await getPublicPostsByUser(req.query.user)

		res.json(posts).end()
	}
	catch (error) {
		if (error instanceof ReferenceError) res.status(404).end()
		else next(error)
	}
})


module.exports = router
