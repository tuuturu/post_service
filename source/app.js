const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

// Controllers
const posts_controller = require('./controllers/posts')
const media_controller = require('./controllers/media')


const app = express()

app.use(cors({ origin: 'http://localhost:8080' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static('static', {
	setHeaders: (res, path, stat) => {
		res.set('Content-Type', 'image/png;')
		res.set('Encoding', 'base64')
	}
}))

app.use('/posts', posts_controller)
app.use('/media', media_controller)

// 404 if nothing else catches the request
app.all('*', (req, res) => res.status(404).end() )

// Catch all error handler
app.use((error, req, res, next) => {
	console.error(error.stack)

	res.status(500).end()
})

module.exports = app
