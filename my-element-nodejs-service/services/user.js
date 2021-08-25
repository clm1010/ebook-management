const { querySql, queryOne } = require('../db')

/**
 * @description 用户登录查询
 * @param {用户名} username
 * @param {密码} password
 * @returns 返回查询结果
 */
function login(username, password) {
  const sql = `select * from admin_user where username='${username}' and password='${password}'`
  return querySql(sql)
}

/**
 * @description 查询用户
 * @param {用户名} username
 * @returns 返回一条用户查询结果
 */
function findUser(username) {
  const sql = `select id,username,role,nickname,avatar from admin_user where username='${username}'`
  return queryOne(sql)
}

module.exports = {
  login,
  findUser
}
