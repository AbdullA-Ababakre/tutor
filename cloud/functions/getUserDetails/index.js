// 获取用户详细信息

const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})
const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  return await db.collection('users').where({
    openId: OPENID
  })
  .limit(1)
  .get()
}

