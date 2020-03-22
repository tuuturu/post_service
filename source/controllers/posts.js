const express = require('express')

const { models } = require('@tuuturu/motoblog-common')
const { savePost, deletePost, getPost, getAllPostsForPrincipal } = require('../services/PostService')

const router = express.Router()

/*
 * POST /posts/
 */
router.post('/', async (req, res) => {
	if (req.body.id) return res.status(400).end()
	if (!req.principal) return res.status(401).end()

	const post = new models.Post(req.body)
	post.author = req.principal

	const result = await savePost(post)

	res.status(201).json(result).end()
})

/*
 * PATCH /posts/:id
 */
router.patch('/:id', async (req, res) => {
	if (!req.params.id) return res.status(400).end()
	const post = new models.Post(req.body)

	post.id = req.params.id

	await savePost(post)

	res.json(post).end()
})

/*
 * DELETE /posts/:id
 */
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

/*
 * GET /posts/:id
 */
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

/*
 * GET /posts/
 */
router.get('/', async (req, res, next) => {
	if (!req.principal) return res.status(401).end()

	try {
		const posts = await getAllPostsForPrincipal(req.principal)

		res.json(posts).end()
	}
	catch (error) {
		if (error instanceof ReferenceError) res.status(404).end()
		else next(error)
	}
})

module.exports = router
