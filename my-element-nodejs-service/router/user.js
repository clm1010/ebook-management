const express = require('express')
const Result = require('../models/Result')
const { login, findUser } = require('../services/user')
const { md5, decoded } = require('../utils')
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
const { body, validationResult } = require('express-validator')
const boom = require('boom')
const jwt = require('jsonwebtoken')

const router = express.Router()

// 用户登录
router.post(
  '/login',
  [
    body('username').isString().withMessage('用户名必须为字符'),
    body('password').isString().withMessage('密码必须为字符')
  ],
  function (req, res, next) {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      const [{ msg }] = err.errors
      next(boom.badRequest(msg))
    } else {
      const username = req.body.username
      const password = md5(`${req.body.password}${PWD_SALT}`)
      login(username, password).then((user) => {
        if (!user || user.length === 0) {
          new Result('登录失败').fail(res)
        } else {
          // 如果需要其它信息也可以把user解开
          // const [_user] =
          // expiresIn过期时间
          const token = jwt.sign({ username }, PRIVATE_KEY, {
            expiresIn: JWT_EXPIRED
          })
          new Result({ token }, '登录成功').success(res)
        }
      })
    }
  }
)

router.get('/info', function (req, res, next) {
  const decode = decoded(req)
  console.log(decode)
  if (decode && decode.username) {
    findUser(decode.username).then((user) => {
      console.log(user)
      // 如果user不存在
      if (user) {
        user.roles = [user.role]
        new Result(user, '获取用户信息成功').success(res)
      } else {
        new Result('获取用户信息失败').fail(res)
      }
    })
  } else {
    new Result('用户信息解析失败').fail(res)
  }
})

module.exports = router
