// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command

let parentQuery = (event) => {
  return db.collection('parentData').where(_.and([
    _.or({
    addressSelectorChecked: db.RegExp({
      regexp: `.*${event.searchValue}`,
      options: 'i',
    })}, 
    {
      exactAddress:  db.RegExp({
        regexp: `.*${event.searchValue}`,
        options: 'i',
      })
    }),
    {
      isLoseEfficacy:event.isLoseEfficacy
    },
    {
      isOnline: event.isOnline,
    }
  ])
  )
}

let organizationQuery = (event) => {
  return db.collection('organizationData').where(_.and([
    _.or({
    addressSelectorChecked: db.RegExp({
      regexp: `.*${event.searchValue}`,
      options: 'i',
    })},
    {
      exactAddress:  db.RegExp({
        regexp: `.*${event.searchValue}`,
        options: 'i',
      })
    }),
    {
      isLoseEfficacy:event.isLoseEfficacy
    },
    {
      isOnline: event.isOnline,
    },
  ])
  )
}

let otherQuery = (event) => {
  return db.collection('otherData').where(_.and([
    {
    positionAddress: db.RegExp({
      regexp: `.*${event.searchValue}`,
      options: 'i',
    })},
    {
      isLoseEfficacy:event.isLoseEfficacy
    },
    {
      isOnline: event.isOnline,
    },
  ])
  )
}

let getDbCout = async (event)=>{
  let parentDataCount = await parentQuery(event).count()
  parentDataCount = parentDataCount.total
  let organizationDataCount = await organizationQuery(event).count()
  organizationDataCount = organizationDataCount.total
  let otherDataCount = await otherQuery(event).count()
  otherDataCount = otherDataCount.total

  return new Promise(resolve =>{resolve({parentDataCount, organizationDataCount, otherDataCount })})
}


// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  event.searchValue = '' || event.searchValue

  console.log(event)

  let dataLimit = 5
  let maxGet = 100
  let {parentDataCount, organizationDataCount, otherDataCount } = await getDbCout(event)
  let page = event.page
  let parentPromise = []
  let organizationPromise = []
  let otherPromise = []
  let data = []
  let promiseArr = []
  let searchFinished = false

  let count = Math.floor(( page*dataLimit) /100) + 1


  //  取多少次 并且获得 promise 数组
  while(count!=0){
    count -= 1
    let parentDataCopy = parentQuery(event).skip((count)*maxGet).limit(page*dataLimit -(count)*maxGet).get()
    parentPromise.push(parentDataCopy)

    let organizationDataCopy = organizationQuery(event).skip((count)*maxGet).limit(page*dataLimit -(count)*maxGet).get()
    organizationPromise.push(organizationDataCopy)
    
    let otherDataCopy = otherQuery(event).skip((count)*maxGet).limit(page*dataLimit -(count)*maxGet).get()
    otherPromise.push(otherDataCopy)
  }

  promiseArr = promiseArr.concat(parentPromise).concat(organizationPromise).concat(otherPromise)
  let promiseData = (await Promise.all(promiseArr))

  // data = data.concat( promiseData[0].data.concat(promiseData[1].data).concat(promiseData[2].data) )


  let parentData = promiseData[0].data
  let organizationData = promiseData[1].data
  let otherData = promiseData[2].data

  let lenMax = Math.max(parentDataCount, organizationDataCount, otherDataCount)
  for(let i=0;i <lenMax;i+=dataLimit){
    data = data.concat(parentData.slice(i, i+dataLimit)).concat(organizationData.slice(i, i+dataLimit)).concat(otherData.slice(i, i+dataLimit))
    // console.log("data", data)
  }

  if(data.length == parentDataCount+ organizationDataCount+otherDataCount){
    searchFinished = true
  }

  return {
    data: {
      // data:{
      //   parent: promiseData[0].data,
      //   organization: promiseData[1].data,
      //   other: promiseData[2].data
      // },
      data: data,
      searchFinished: searchFinished
    }
  }
}