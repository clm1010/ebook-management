const { env } = require('./env')
// 上传路径
const UPLOAD_PATH =
  env === 'dev'
    ? 'D:/Users/sam/upload/admin-upload-ebook'
    : '/root/upload/admin-upload/ebook'
// 下载路径
const UPLOAD_URL =
  env === 'dev'
    ? 'D:/Users/sam/upload/admin-upload-ebook'
    : '/root/upload/admin-upload/ebook'

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  CODE_TOKEN_EXPIRED: -2,
  debug: true,
  PWD_SALT: 'clm_admin_node',
  PRIVATE_KEY: 'clm_admin_node_private_key',
  JWT_EXPIRED: 60 * 60, // 过期时间 60 * 60 是1个小时
  UPLOAD_PATH,
  UPLOAD_URL,
  MIME_TYPE_EPUB: 'application/epub+zip' //默认epub类型
}
