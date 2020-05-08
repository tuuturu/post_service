const { Router } = require('express')
const { nanoid } = require('nanoid')

const { getPostsByTrip } = require('../services/PostService')
const { SaneRedis } = require('@tuuturu/toolbox-node/data')

const client = new SaneRedis.Client()
client.connect(process.env.REDIS_URI)
	.then(() => console.log('Established connection to Redis'))
	.catch(() => console.log('Failure connecting to Redis'))

const router = Router()

router.get('/', async (req, res) => {
	const query = req.query.query

	if (!query) return res.status(400).end()
	if (query.length > 35) return res.status(400).end()

	const key = [ query, 'trips' ].join(':')
	const repo = client.createCollectionRepository(key)

	const trips = await repo.getAll()

	res.json(trips).end()
})

router.get('/:id/posts', async (req, res) => {
	res.json(await getPostsByTrip(req.principal, req.params.id))
})

router.post('/', async (req, res) => {
	const key = [ req.principal, 'trips' ].join(':')
	const repo = client.createCollectionRepository(key)

	const trip = { id: nanoid(), author: req.principal }
	await repo.set(trip.id, trip)

	res.json(trip).end()
})

module.exports = router
