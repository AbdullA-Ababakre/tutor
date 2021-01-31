// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command

let setData = async (dbName, isLoseEfficacy, top, isOnline,_id,requireVip, ownerNumber = "") =>{
  console.log(dbName, isLoseEfficacy, top, isOnline, _id);
  return await db.collection(dbName).doc(_id).update({
    data: {
      isLoseEfficacy: isLoseEfficacy,
      top: top,
      isOnline: isOnline,
      requireVip: requireVip,
      ownerNumber: ownerNumber
    }
  })
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  switch(event.jobType){
    case "familyCourse":
      await setData("parentData", event.isLoseEfficacy, event.top, event.isOnline,event._id, event.requireVip, event.ownerNumber)
    break;
    case "companyCourse":
     await setData("organizationData", event.isLoseEfficacy, event.top, event.isOnline,event._id, event.requireVip, event.ownerNumber)  
    break;
    case "other":
     await setData("otherData", event.isLoseEfficacy, event.top, event.isOnline,event._id, event.requireVip, event.ownerNumber)
    break;
  }
  return new Promise((resolve) => resolve({msg: "Success"}))
}