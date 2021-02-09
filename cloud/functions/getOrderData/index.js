// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command

let getUmDbCout = async (event, isTop = false) =>{
  let parentDataCount =  parentQuery(event,isTop).count()
  let organizationDataCount =  organizationQuery(event,isTop).count()
  let otherDataCount =  otherQuery(event,isTop).count()
  let umTopCount = await Promise.all([parentDataCount, organizationDataCount, otherDataCount])
  parentDataCount = umTopCount[0].total
  organizationDataCount = umTopCount[1].total
  otherDataCount = umTopCount[2].total

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
        regexp: searchQuery(event.city, event.searchValue),
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
  .orderBy('orderNumber', 'desc')

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
        regexp: searchQuery(event.city, event.searchValue),
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
  .orderBy('orderNumber', 'desc')

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
  .orderBy('orderNumber', 'desc')
}

let otherOnlineQuery = (event, isTop)=>{
  return db.collection('otherData').where(_.and([
    {
    positionAddress: db.RegExp({
      regexp: `.*${event.searchValue?event.searchValue:"线上"}`,
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
  .orderBy('orderNumber', 'desc')

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
  // event.city = event.selectOnline?"线上":event.city
  let dataLimit = 8
  let maxGet = 100
  let {parentDataCount, organizationDataCount, otherDataCount } = await getUmDbCout(event)
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

  let coutTime = 0
  //  取多少次 并且获得 promise 数组
  while(coutTime !== count){
    let parentDataCopy = parentQuery(event, false).skip((coutTime)*maxGet).limit(page*dataLimit -(coutTime)*maxGet).get()
    parentPromise.push(parentDataCopy)

    if(event.selectOnline){
      let otherDataCopy = otherOnlineQuery(event, false).skip((coutTime)*maxGet).limit(page*dataLimit -(coutTime)*maxGet).get()
      otherPromise.push(otherDataCopy)
      coutTime ++; continue
    }

    let organizationDataCopy = organizationQuery(event, false).skip((coutTime)*maxGet).limit(page*dataLimit -(coutTime)*maxGet).get()
    organizationPromise.push(organizationDataCopy)
    
    let otherDataCopy = otherQuery(event, false).skip((coutTime)*maxGet).limit(page*dataLimit -(coutTime)*maxGet).get()
    otherPromise.push(otherDataCopy)

    coutTime ++
  }

  promiseArr = promiseArr.concat(parentPromise).concat(organizationPromise).concat(otherPromise)
  let promiseData = (await Promise.all(promiseArr))

  // 判断线上逻辑
  if(event.selectOnline){
    let topParentData =  parentQuery(event, true).get()
    let topOtherOnlineData =  otherOnlineQuery(event, true).get()
    let otherOnlineData =  otherOnlineQuery(event,false).count()
    let promiseOnlineData = await Promise.all([topParentData, topOtherOnlineData, otherOnlineData])
    // let data = promiseData[0].data.concat(topParentData.data)
    let data = promiseOnlineData[0].data.concat(promiseOnlineData[1].data).concat(promiseData[0].data).concat(promiseData[1].data)
    return {
      data: data,
      searchFinished:  promiseData[0].data.length + promiseData[1].data.length == parentDataCount + promiseOnlineData[2].total
    }
  }

  let parentData = promiseData[0].data
  let organizationData = promiseData[1].data
  let otherData = promiseData[2].data

  // console.log( "searchQuery",searchQuery(event.city, event.searchValue), "event", event, 'parentData', parentData, 'organizationData', organizationData, 'otherData', otherData)
  let lenMax = Math.max(parentDataCount, organizationDataCount, otherDataCount)
  for(let i=0;i <lenMax;i+=dataLimit){
    data = data.concat(parentData.slice(i, i+dataLimit)).concat(organizationData.slice(i, i+dataLimit)).concat(otherData.slice(i, i+dataLimit))
  }
  if(data.length == parentDataCount+ organizationDataCount+otherDataCount + topData.length){
    searchFinished = true
  }
  console.log('event', event)
  console.log('length', data.length, parentDataCount, organizationDataCount, otherDataCount)


  return {
    data: data,
    searchFinished: searchFinished
  }
}