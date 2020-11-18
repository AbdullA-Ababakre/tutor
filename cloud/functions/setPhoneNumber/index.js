// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

function hidePhoneDigits(phone) { // 13577778888 -> 135****8888
  if(phone == "") return "";
  return phone.substr(0,phone.length-8) + "****" + phone.substr(phone.length-4,4);
}


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID
  console.log(event)
  return await db.collection("users").where({
    openId: openid
  }).update({
    data:{
      phone: event.phone,
      phoneShown: hidePhoneDigits(event.phone)
    }
  })

 
}