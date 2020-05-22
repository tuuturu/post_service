const express = require('express')
const multer = require('multer')
const { nanoid } = require('nanoid')
const Minio = require('minio')

const router = express.Router()

const BUCKET_DIR = 'motoblog-post-pictures'
const BUCKET_POLICY = JSON.stringify({
	Version: '2012-10-17',
	Statement: [
		{
			Sid: 'PublicRead',
			Effect: 'Allow',
			Action: ['s3:GetObject'],
			Principal: '*',
			Resource: [`arn:aws:s3:::${BUCKET_DIR}/*`]
		}
	]
})

const minioClient = new Minio.Client({
	endPoint: process.env.MINIO_URL,
	port: parseInt(process.env.MINIO_PORT),
	useSSL: false,
	accessKey: process.env.MINIO_ACCESS_KEY,
	secretKey: process.env.MINIO_SECRET_KEY
})

async function ensureBucket(bucket) {
	const exists = await minioClient.bucketExists(bucket)

	if (exists) return

	await minioClient.makeBucket(bucket)
	await minioClient.setBucketPolicy(BUCKET_DIR, BUCKET_POLICY)
}

async function storeImage(mimetype, file) {
	await ensureBucket(BUCKET_DIR)
	const id = nanoid()

	const metadata = {
		'Content-Type': mimetype
	}

	await minioClient.putObject(BUCKET_DIR, id, file, metadata)

	return id
}

const uploader = multer({ storage: multer.memoryStorage() })

router.post('/', uploader.single('picture'), async (req, res) => {
	const id = await storeImage(req.file.mimetype, req.file.buffer)

	res.json({ id }).end()
})

module.exports = router
