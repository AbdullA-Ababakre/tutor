// 获取用户详细信息

const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})
const db = cloud.database()

exports.main = async (event, context) => {
  let OPENID = event.userInfo.openId;
  return db.collection('users').where({
    openId: OPENID
  })
  .limit(1)
  .get()
  .then(result => {
    if(result.data.length == 0) {
      // 创建用户在数据库中的记录
      let newUserData = {isVip: false, phone: ""}
      console.log("newUser:",newUserData,"openid:",OPENID);
      return cloud.callFunction({
        name: "changeUserDetails",
        data: {userInfo: {openId: OPENID}, userData: newUserData},
      })
      .then(()=>{
        return newUserData;
      })
    } else {
      return new Promise(resolve=>{resolve(result.data[0])});
    }
  })
  .then(data => {
    return data;
  })
}

