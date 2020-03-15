const axios = require('axios')
const log = require('./logging')

function extractToken(req) {
	if (!req.headers.authorization) return null
	const parts = req.headers.authorization.split(' ')

	if (parts.length !== 2) return null

	return parts[1]
}

module.exports = async (req, res, next) => {
	const access_token = extractToken(req)

	if (!access_token) return next()

	try {
		const { data } = await axios.request({
			url: `${process.env.GATEKEEPER_URL}/userinfo`,
			method: 'get',
			headers: {
				Cookie: `access_token=${access_token}`
			}
		})

		req.user = data
		req.principal = data.sub
	}
	catch (error) {
		if (error.response && error.response.status === 401)
			log.debug('Invalid token')

		log.error('Something went wrong. No user attached')
		log.error(error)

		req.user = null
		req.principal = null
	}

	next()
}
