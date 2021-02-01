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
  console.log(openid)
  let userQuery =  db.collection("users").where({ openId: openid})
  if(event.setVip){
    try {
      await db.collection('paymentData').add({
        data: {
          payTime: new Date(),
          payOpenId: openid,
          payMoney: event.vipMonth===12?350:200
        }
      })
    } catch (error) {
      console.log(error)
    }


    // 这里是分销操作
    // 还要看看这里的格式对不对
    let userDetail = await userQuery.get()
    if(userDetail.data[0].shareOpenId){
      await db.collection('users').where({ openId: userDetail.data[0].shareOpenId})
        .update({
        data: {
          commission: _.inc(commission)
        }
      })
    }

    if(userDetail.data[0].isVip){
      return await userQuery.update({
        data: {
          isVip: true,
          vipMonth: _.inc(event.vipMonth)
        }
      })
    }else{
      return await userQuery.update({
        data: {
          isVip: true,
          vipBeginTime: new Date(),
          vipMonth: event.vipMonth
        }
      })
    }
  }

  return await userQuery
            .update({
                data: {
                  realName: event.realName,
                  wechatName: event.wechatName
                }
              })
  
}