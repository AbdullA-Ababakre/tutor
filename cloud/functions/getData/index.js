// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();


// 云函数入口函数
//  获得
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  const { OPENID } = cloud.getWXContext();
  console.log('event', event);
  const MAX_LIMIT = 100
  if(event.getType==="parent"){
    try{
      // console.log(event.id)
      if(event.id){
        console.log("success")
        let data = await db.collection('parentData').doc(event.id).get()
        console.log(data)
        return {
          data: data,
          errMsg: "success"
        }
      }
      else{
        console.log("fail")
      }
      // 先取出集合记录总数
      const countResult = await db.collection('parentData').count()
      const total = countResult.total
      if(total==0)
        return {
          data: [],
          errMsg: "NO Detail in DB."
        }
      // 计算需分几次取
      const batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('parentData').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(promise)
      }
      // 等待所有
      return (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
          data: acc.data.concat(cur.data),
          errMsg: acc.errMsg,
        }
      })
    } catch(e){
      console.error(e)
    }
  }
  else if(event.getType==="organization"){
    try{
      if(event.id){
        let data = await db.collection('organizationData').doc(event.id).get()
        return {
          data: data,
          errMsg: "success"
        }
      }
      // 先取出集合记录总数
      const countResult = await db.collection('organizationData').count()
      const total = countResult.total
      if(total==0)
        return {
          data: [],
          errMsg: "NO Detail in DB."
        }
      // 计算需分几次取
      const batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('organizationData').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(promise)
      }
      // 等待所有
      return (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
          data: acc.data.concat(cur.data),
          errMsg: acc.errMsg,
        }
      })
    } catch(e){
      console.error(e)
    }
  }
  else if(event.getType==="other"){
    try{
      if(event.id){
        let data = await db.collection('otherData').doc(event.id).get()
        return {
          data: data,
          errMsg: "success"
        }
      }
      // 先取出集合记录总数
      const countResult = await db.collection('otherData').count()
      const total = countResult.total
      if(total==0)
        return {
          data: [],
          errMsg: "NO Detail in DB."
        }
      // 计算需分几次取
      const batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('otherData').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(promise)
      }
      // 等待所有
      return (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
          data: acc.data.concat(cur.data),
          errMsg: acc.errMsg,
        }
      })
    } catch(e){
      console.error(e)
    }
  }

}