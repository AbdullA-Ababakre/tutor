// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  return db.collection('users').where({
    openId: openid
  }).limit(1)
    .update({
      data: {
        realName: event.realName,
        wechatName: event.wechatName
      }
    })
  
}