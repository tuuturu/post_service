const express = require('express')
const multer = require('multer')
const { nanoid } = require('nanoid')

const router = express.Router()

const UPLOAD_DIR = 'static'

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, UPLOAD_DIR)
	},
	filename: (req, file, cb) => {
		cb(null, nanoid())
	}
})

const uploader = multer({ storage })

router.post('/', uploader.single('picture'), (req, res) => {
	res.json({ id: req.file.filename }).end()
})

module.exports = router
