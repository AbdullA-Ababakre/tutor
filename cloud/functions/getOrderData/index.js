// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command

let getDbCout = async ()=>{
  let parentDataCount = await db.collection("parentData").count()
  parentDataCount = parentDataCount.total
  let organizationDataCount = await db.collection("organizationData").count()
  organizationDataCount = organizationDataCount.total
  let otherDataCount = await db.collection("otherData").count()
  otherDataCount = otherDataCount.total

  return new Promise(resolve =>{resolve({parentDataCount, organizationDataCount, otherDataCount })})
}

let searchQuery = (city, searchValue) =>{
  if(searchValue){
    if(searchValue.includes(city)){
      return `.*${searchValue}`
    }else{
      return `.*${city.includes("不")?searchValue:city}`
    }
  }else{
    return `.*${city.includes("不")?"":city}`
  }
}

let parentQuery = (event, isTop) => {
  return db.collection('parentData').where(_.and([
    _.or({
    addressSelectorChecked: db.RegExp({
      regexp: searchQuery(event.city, event.searchValue),
      options: 'i',
    })}, 
    {
      exactAddress:  db.RegExp({
        regexp: `.*${event.searchValue?event.searchValue:event.city}`,
        options: 'i',
      })
    }),
    {
      tutorSubject:  db.RegExp({
        regexp: `.*${event.subject.includes("不")?"":event.subject}`,
        options: 'i',
      })
    },
    {
      gradeChecked:  db.RegExp({
        regexp: `.*${event.grade.includes("不")?"":event.grade}`,
        options: 'i',
      })
    },
    {
      requireVip: db.RegExp({
        regexp: `.*${event.selectNonVip?"false":""}`,
        options: 'i'
      })
    },
    {
      classForm:db.RegExp({
        regexp: `.*${event.selectOnline?"线上":""}`,
        options: 'i'
      })
    },
    {
      isLoseEfficacy:false
    },
    {
      isOnline: true,
    },
    {
      top: isTop
    }
  ])
  )
}

let organizationQuery = (event, isTop) => {
  return db.collection('organizationData').where(_.and([
    _.or({
    addressSelectorChecked: db.RegExp({
      regexp: searchQuery(event.city, event.searchValue),
      options: 'i',
    })},
    {
      exactAddress:  db.RegExp({
        regexp: `.*${event.searchValue?event.searchValue:event.city}`,
        options: 'i',
      })
    }),
    {
      tutorSubject:  db.RegExp({
        regexp: `.*${event.subject.includes("不")?"":event.subject}`,
        options: 'i',
      })
    },
    {
      gradeChecked:  db.RegExp({
        regexp: `.*${event.grade.includes("不")?"":event.grade}`,
        options: 'i',
      })
    },
    {
      requireVip: db.RegExp({
        regexp: `.*${event.selectNonVip?"false":""}`,
        options: 'i'
      })
    },
    {
      isLoseEfficacy:false
    },
    {
      isOnline: true,
    },
    {
      top: isTop
    }
  ])
  )
}

let otherQuery = (event, isTop) => {
  return db.collection('otherData').where(_.and([
    {
    positionAddress: db.RegExp({
      regexp: searchQuery(event.city, event.searchValue),
      options: 'i',
    })},
    {
      requireVip: db.RegExp({
        regexp: `.*${event.selectNonVip?"false":""}`,
        options: 'i'
      })
    },
    {
      positionName: db.RegExp({
        regexp: `.*${event.subject.includes("不")?"":event.subject.includes("其")?"":event.subject}`,
        options: 'i'
      })
    },
    {
      positionName: db.RegExp({
        regexp: `.*${event.grade.includes("不")?"":event.grade.includes("其")?"":event.grade}`,
        options: 'i'
      })
    },
    {
      isLoseEfficacy:false
    },
    {
      isOnline: true,
    },
    {
      top: isTop
    }
  ])
  )
}

let getAllTopData = async (event) =>{

   // get the parentData in the limit
  let parentDataCopy =  parentQuery(event, true).get()

   //  get the organizationData in the limit 
  let organizationDataCopy =   organizationQuery(event, true).get()
  
   //  get the otherData in the limit 
  let otherDataCopy =   otherQuery(event, true).get()
  
  let promiseData = (await Promise.all([parentDataCopy, organizationDataCopy, otherDataCopy]))

  let data = []
  data = data.concat( promiseData[0].data.concat(promiseData[1].data).concat(promiseData[2].data) )

  return data
}


// 云函数入口函数
//  这一个云函数主要是获得筛选的数据
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  let dataLimit = 1
  let maxGet = 100
  let {parentDataCount, organizationDataCount, otherDataCount } = await getDbCout()
  let page = event.page
  let parentPromise = []
  let organizationPromise = []
  let otherPromise = []
  let data = []
  let promiseArr = []
  let searchFinished = false


  let count = Math.floor(( page*dataLimit) /100) + 1

  // 取出 top data
  let topData = await getAllTopData(event)
  data = data.concat(topData)

  //  取多少次 并且获得 promise 数组
  while(count!=0){
    count -= 1
    let parentDataCopy = parentQuery(event, false).skip((count)*maxGet).limit(page*dataLimit -(count)*maxGet).get()
    parentPromise.push(parentDataCopy)

    let organizationDataCopy = organizationQuery(event, false).skip((count)*maxGet).limit(page*dataLimit -(count)*maxGet).get()
    organizationPromise.push(organizationDataCopy)
    
    let otherDataCopy = otherQuery(event, false).skip((count)*maxGet).limit(page*dataLimit -(count)*maxGet).get()
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
  }
  if(data.length == parentDataCount+ organizationDataCount+otherDataCount){
    searchFinished = true
  }

  return {
    data: data,
    searchFinished: searchFinished
  }
}