// [异步] 修改用户详细信息

const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})
const db = cloud.database()

function hidePhoneDigits(phone) { // 13577778888 -> 135****8888
  if(phone == "") return "";
  return phone.substr(0,phone.length-8) + "****" + phone.substr(phone.length-4,4);
}

exports.main = async (event, context) => {
  let OPENID = event.userInfo.openId;
  console.log("openid*****:",OPENID);
  
  let userCollection = await db.collection('users').where({
    openId: OPENID
  }).limit(1)
  
  let userData = event.userData;

  let newData = { // 这里控制那些用户信息是可以被用户修改
    phone: userData.phone || "",
    phoneShown: hidePhoneDigits(userData.phone),
    realName: userData.realName || "",
    wechatName: userData.wechatName || ""
  }

  return userCollection
  .get()
  .then(result => {
    if(result.data.length == 0) {
      newData.openId = OPENID;
      newData.isVip = false;
      newData.isAdmin = false;
      db.collection('users').add({
        data: newData
      })
    } else {
      userCollection.update({
        data: newData
      })
    }
  })
}

