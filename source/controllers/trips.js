const { Router } = require('express')

const { createTrip, getTripsForAuthor } = require('../services/TripService')
const { getPostsByTrip } = require('../services/PostService')
const log = require('../logging')

const router = Router()

router.get('/', async (req, res) => {
	const query = req.query.query
	console.log(`fetching posts for ${query}`)

	if (!query) return res.status(400).end()

	res.json(await getTripsForAuthor(query))
})

router.get('/:id/posts', async (req, res) => {
	res.json(await getPostsByTrip(req.params.id))
})

router.post('/', async (req, res) => {
	if (!req.principal) {
		log.error('No principal found')
		return res.status(401).end()
	}

	res.json(await createTrip({ author: req.principal }))
})

module.exports = router
