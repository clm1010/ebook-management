const jwt = require('express-jwt')
const { PRIVATE_KEY } = require('../utils/constant')

module.exports = jwt({
  secret: PRIVATE_KEY,
  credentialsRequired: true, // 设置为false不验证
  algorithms: ['HS256'] // express-jwt 6.0.0 后要加这个属性
}).unless({
  path: ['/', '/user/login']
  // jwt白名单
})
