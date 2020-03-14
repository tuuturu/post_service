const nanoid = require('nanoid')
const DBManager = require('../db')

const db_manager = DBManager.create('trips')

async function createTrip(trip) {
	const id = nanoid()

	trip.id = id

	await db_manager.set(id, trip)

	return trip
}

async function getTripsForAuthor(author) {
	const all_trips = await db_manager.getAll()

	return all_trips.filter(trip => trip.author === author)
}

module.exports = {
	createTrip,
	getTripsForAuthor
}
