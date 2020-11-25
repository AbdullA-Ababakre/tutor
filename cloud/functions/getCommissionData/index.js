// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const user = await db.collection("users").where({
    commission: _.gt(0)
  }).get()
  console.log('====================================');
  console.log(user);
  console.log('====================================');
  return {
   data: {
     ...user
   }
  }
}