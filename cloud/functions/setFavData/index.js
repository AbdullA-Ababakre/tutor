// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const _ = db.command
  if(event.getType==="parent"){
    try{
      let favList = await  db.collection('parentData').doc(event._id).get()
      // 当数组里面没有的时候 且 enable为真的时候才需要去更新状态
      if(favList.data.favourList.indexOf(OPENID)===-1 &&event.enable)
        return await db.collection('parentData').doc(event._id).update({
          data:{
            favourList: _.push([OPENID])
          }
        })
      else if(favList.data.favourList.indexOf(OPENID)!==-1 && !event.enable){
        return await db.collection('parentData').doc(event._id).update({
          data:{
            favourList: _.pull(OPENID)
          }
        })
      }
    }catch(e){
      console.error(e)
    }
  }
  if(event.getType==="organization"){

    let favList = await  db.collection('organizationData').doc(event._id).get()
    // 当数组里面没有的时候 且 enable为真的时候才需要去更新状态
    if(favList.data.favourList.indexOf(OPENID)===-1 &&event.enable)
      return await db.collection('organizationData').doc(event._id).update({
        data:{
          favourList: _.push([OPENID])
        }
      })
    else if(favList.data.favourList.indexOf(OPENID)!==-1 && !event.enable){
      return await db.collection('organizationData').doc(event._id).update({
        data:{
          favourList: _.pull(OPENID)
        }
      })
    }
  }
  if(event.getType==="other"){

    let favList = await  db.collection('otherData').doc(event._id).get()

    // 当数组里面没有的时候 且 enable为真的时候才需要去更新状态
    if(favList.data.favourList.indexOf(OPENID)===-1 && event.enable)
      return await db.collection('otherData').doc(event._id).update({
        data:{
          favourList: _.push([OPENID])
        }
      })
    else if(favList.data.favourList.indexOf(OPENID)!==-1 && !event.enable){
      return await db.collection('otherData').doc(event._id).update({
        data:{
          favourList: _.pull(OPENID)
        }
      })
    }
  }

  return {
    data:{
      msg: "Success connect!!",
      msgCode: 0
    }
  }
}