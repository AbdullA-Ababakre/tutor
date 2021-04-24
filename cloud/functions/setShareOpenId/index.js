// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  const user =  db.collection('users').where({
    openId: openid
  })
  const userDetail = await user.get()
  try {
    if(userDetail.data[0]['shareOpenId']){
      //  这里是已经绑定好分享者的openid 了
      return {
        data:{
          errmsg: "Success bind!!"
        }
      }
    }else if(event.shareOpenId!==openid) {
      //  在这里更新 分享者的 openid
      await user.update({
        data: {
          shareOpenId: event.shareOpenId
        }
      })
      return {
        errMsg: "Success update!!",
        data: await user.get()
       }
    }
  } catch (error) {
    return {
      errMsg: 'Can not get the shareOpenId!'
    }
  }

  return {
   errMsg: "Success connect!!",
   data: await user.get()
  }
}