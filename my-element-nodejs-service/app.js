const express = require('express')
const router = require('./router/index.js')
const bodyParser = require('body-parser')
const cors = require('cors')

// 创建 express 应用
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', router)

// 使 express 监听 5000 端口号发起的 http 请求
const server = app.listen(8081, '127.0.0.1', function () {
  const { address, port } = server.address()
  console.log('Http Server is running on http://%s:%s', address, port)
})
