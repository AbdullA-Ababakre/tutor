// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const _ = db.command
  let commission = event.vipMonth===12?40:10
  if(event.setVip){
    // 这里是分销操作
    // 还要看看这里的格式对不对
    db.collection("users").where({
      openId: openid
    }).get().then(res=>{
      let shareOpenId = res.data.shareOpenId
      db.collection("users").where({
        openId: shareOpenId
      }).update({
        data: {
          commission: _.inc(commission)
        }
      })
    })

    // 这里是 变成VIP 操作
    return db.collection("users").where({
      openId: openid
    }).limit(1)
    .update({
      isVip: true,
      vipBeginTime: new Date(),
      vipMonth: event.vipMonth
    })
  }

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