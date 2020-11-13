// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  if(event.getType==="parent"){
    try{
      return await db.collection('parentData').doc(event._id).update({
        data:{
          favourList: event.favourList
        }
      })
    }catch(e){
      console.error(e)
    }
  }
  if(event.getType==="organization"){
    try{
      return await db.collection('organizationData').doc(event._id).update({
        data:{
          favourList: event.favourList
        }
      })
    }catch(e){
      console.error(e)
    }
  }
  if(event.getType==="other"){
    console.log(event.favourList)
    try{
      return await db.collection('otherData').doc(event._id).update({
        data:{
          favourList: event.favourList
        }
      })
    }catch(e){
      console.error(e)
    }
  }
}