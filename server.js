const express = require('express')
const { mockPosts } = require('./source/mock_data')
const cors = require('cors')


const app = express()
const port = 3000

app.use(cors({
  origin: 'http://localhost:8080'
}))

// res.json()
function getPosts(req, res) {
  return res.json(mockPosts)
}
app.get('/posts', getPosts)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))