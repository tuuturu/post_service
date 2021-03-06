const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')

let expressOasGenerator
if (process.env.NODE_ENV !== 'production')
	expressOasGenerator = require('express-oas-generator')

const log = require('./logging')

// Middleware
const { middleware } = require('@tuuturu/toolbox-node/authentication')

// Controllers
const media_controller = require('./controllers/media')
const posts_controller = require('./controllers/posts')
const trips_controller = require('./controllers/trips')

const app = express()
if (expressOasGenerator)
	expressOasGenerator.handleResponses(app, {})

app.disable('x-powered-by')

app.use(cookieParser())
app.use(bodyParser.raw({ limit: '20mb' }))
app.use(bodyParser.json({ limit: '20mb' }))

app.use('/media', media_controller)

app.use(middleware.authenticationMiddleware(`${process.env.GATEKEEPER_URL}/userinfo`))

app.use('/posts', posts_controller)
app.use('/trips', trips_controller)

// 404 if nothing else catches the request
app.all('*', (req, res) => res.status(404).end() )

// Catch all error handler
app.use((error, req, res, next) => {
	log.error(error.stack)

	res.status(500).end()
})

if (expressOasGenerator)
	expressOasGenerator.handleRequests()

module.exports = app
