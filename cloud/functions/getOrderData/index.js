// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command
const $ = db.command.aggregate

let getUmDbCout = async (event, isTop = false) =>{
  let parentDataCount =  parentQuery(event,isTop).count("orderNumber").end()
  let organizationDataCount =  organizationQuery(event,isTop).count("orderNumber").end()
  let otherDataCount =  otherQuery(event,isTop).count("orderNumber").end()
  let umTopCount = await Promise.all([parentDataCount, organizationDataCount, otherDataCount])
  parentDataCount = (umTopCount[0].list[0] && umTopCount[0].list[0].orderNumber ) || 0
  organizationDataCount = (umTopCount[1].list[0] && umTopCount[1].list[0].orderNumber ) || 0
  otherDataCount = (umTopCount[2].list[0] && umTopCount[2].list[0].orderNumber ) || 0

  console.log('undbcout', umTopCount)
  return new Promise(resolve =>{resolve({parentDataCount, organizationDataCount, otherDataCount })})
}

let addressQuery = (city, searchValue, exact = false) =>{
  // let 
  const addressArray = [
    '深圳', '广州', '佛山', '东莞', '珠海', '上海',
    '福田', '罗湖', '南山', '宝安', '龙岗', '盐田', '坪山', '龙华', '光明',
    '越秀', '海珠', '荔湾', '天河', '白云', '黄埔', '花都', '番禺', '南沙', '从化', '增城',
    '禅城', '顺德', '南海', '三水', '高明','莞城','东城','南城','万江','石龙','石排',
    '茶山','企石','桥头','东坑','横沥','常平','虎门','长安','沙田','厚街','寮步','大岭山',
    '大朗','黄江','樟木头','谢岗','塘厦','清溪','凤岗','麻涌','中堂','高埗','石碣','望牛墩',
    '洪梅','道滘',
    '香洲', '斗门', '金湾', '横琴新',
    '黄浦','徐汇','长宁','静安','普陀','虹口','杨浦','闵行','宝山','嘉定','金山','松江',
    '青浦','奉贤','崇明','浦东新',
  ]

  let value = city
  let flag = 0
  if(searchValue){
    // 这里是为了得到 地址
    addressArray.forEach(address => {
      if(searchValue.includes(address)) {
        flag = 1
        value = address
      }
    })
  }
  if(flag && exact) 
    value = searchValue
  return `.*${value.includes("不")?"":value}`
}

let gradeQuery = (grade, searchValue) => {
  let value = grade
  if(searchValue){
    // 这里是为了得到 年级
    let gradeArray = ['幼儿园', '小学', '初', '高']

    gradeArray.forEach(grade => {
      if(searchValue.includes(grade)) {
        value = grade
      }
    })
  }
  
  return `.*${value}`
}

let tutorQuery = (tutor, searchValue) => {
  let value = tutor
  if(searchValue){
    // 这里是为了得到 科目
    let tutorArray = ['语', '数', '英', '物', '化', '生', '地理', '历史', '全科', '政治']

    tutorArray.forEach(tutor => {
      if(searchValue.includes(tutor)) {
        value = tutor
      }
    })
  }
  return `.*${value}`
  
}

let parentQuery = (event, isTop) => {
  return db.collection('parentData')
  .aggregate()
  .project({
    // 过滤的条件有 地址 年级 家教类型 老师要求类型 
    searchData:  $.concat(['$addressSelectorChecked', '$exactAddress',
     '$gradeChecked', '$classForm', '$teacherRequire', 
     '$teacherRequireText', '$studentInfo', '$teachingTime']),
    _openid: 1,
    gradeChecked:1,
    genderChecked:1,
    classForm:1,
    tutorType:1,
    tutorSubject:1,
    tutorGoal:1,
    studentInfo:1,
    teacherGenderChecked:1,
    teacherRequire:1,
    teacherRequireText:1,
    salarySelectorChecked:1,
    teacherRequirementTag:1,
    tel:1,
    teachingDay:1,
    tutorDuration:1,
    teachingTime: 1,
    teachingTimeTag:1,
    addressSelectorChecked:1,
    exactAddress:1,
    requireVip: 1,
    detailType : 1,
    jobType: 1,
    orderNumber: 1,
    favourList: 1,
    isLoseEfficacy:1,
    isOnline:1,
    top:1,
    _id: 1,
  })
  .match(_.and([
    {
      searchData: db.RegExp({
        regexp: `.*${event.searchValue}`,
        options: 'i',
      })
    },
    {
      tutorSubject: _.or(
        db.RegExp({
        regexp: tutorQuery(event.subject, event.searchValue),
        options: 'i',
        }),
      )
    },
    {
      gradeChecked:  db.RegExp({
        regexp: gradeQuery(event.grade, event.searchValue),
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
  .sort({"orderNumber": -1})
  // .orderBy('orderNumber', 'desc')

}

let organizationQuery = (event, isTop) => {
  return db.collection('organizationData')  
  .aggregate()
  .project({
    // 过滤的条件有 地址 年级 家教类型 老师要求类型 
    searchData:  $.concat([
      '$addressSelectorChecked', '$exactAddress', '$gradeChecked', 
      '$organizationName', '$positionInfo', '$teacherRequireText'
    ]),
    _openid: 1,
    gradeChecked: 1,
    tutorType: 1,
    tutorSubject: 1,
    positionInfo: 1,
    teacherRequireText: 1,
    salarySelectorChecked: 1,
    tel: 1,
    organizationName: 1,
    recruitNum: 1,
    teachingDay: 1,
    tutorDuration: 1,
    teachingTime: 1,
    teachingTimeTag: 1,
    addressSelector: 1,
    addressSelectorChecked: 1,
    exactAddress: 1,
    requireVip:1,
    detailType: 1,
    jobType:1,
    orderNumber:  1,
    favourList: 1,
    isLoseEfficacy: 1,
    isOnline: 1,
    top: 1
  })
  .match(_.and([
    {
      searchData: db.RegExp({
        regexp: `.*${event.searchValue}`,
        options: 'i'
      })
    },
    {
      tutorSubject: _.or(
        db.RegExp({
        regexp: tutorQuery(event.subject, event.searchValue),
        options: 'i',
        }),
      )
    },
    {
      gradeChecked:  db.RegExp({
        regexp: gradeQuery(event.grade, event.searchValue),
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
  .sort({'orderNumber': -1})
}

let otherQuery = (event, isTop) => {
  return db.collection('otherData')
  .aggregate()
  .project({
    searchData: $.concat([
      '$positionAddress', '$positionName'
    ]),
    _openid:1 ,
    organizationName:1,
    positionName:1,
    positionInfo:1,
    positionSalary:1,
    positionAddress:1,
    recruitNum:1,
    workingTime:1,
    tel: 1,
    requireVip: 1,
    detailType:1,
    jobType: 1,
    orderNumber: 1, 
    favourList:1,
    isLoseEfficacy:1, 
    isOnline: 1,
    top: 1,
  })
  .match(_.and([
    {
      searchData: db.RegExp({
      regexp: `.*${event.searchValue ? event.searchValue : event.grade + event.subject}`,
      options: 'i',
    })},
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
  .sort({'orderNumber': -1})
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
        regexp: `.*${event.subject?event.subject:event.grade?event.grade:event.searchValue}`,
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
  let parentDataCopy =  parentQuery(event, true).end()

   //  get the organizationData in the limit 
  let organizationDataCopy =   organizationQuery(event, true).end()
  
   //  get the otherData in the limit 
  let otherDataCopy =   otherQuery(event, true).end()
  
  let promiseData = (await Promise.all([parentDataCopy, organizationDataCopy, otherDataCopy]))

  console.log('data', promiseData)
  let data = []
  data = data.concat( promiseData[0].list.concat(promiseData[1].list).concat(promiseData[2].list) )
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

  event.grade = ( event.grade.includes('不') || event.grade.includes('其') ) ? '' : event.grade
  event.subject = ( event.subject.includes('不') || event.subject.includes('其') ) ? '':event.subject


  let count = Math.floor(( page*dataLimit) /100) + 1

  console.log('addressQuery(event.city, event.searchValue)', addressQuery(event.city, event.searchValue))
  console.log('tutorQuery(event.subject, event.searchValue)', tutorQuery(event.subject, event.searchValue))
  console.log('gradeQuery(event.grade, event.searchValue)', gradeQuery(event.grade, event.searchValue))
  // 取出 top data
  let topData = await getAllTopData(event)
  data = data.concat(topData)

  let coutTime = 0
  //  取多少次 并且获得 promise 数组
  while(coutTime !== count){
    let parentDataCopy = parentQuery(event, false).skip((coutTime)*maxGet).limit(page*dataLimit -(coutTime)*maxGet).end()
    parentPromise.push(parentDataCopy)

    if(event.selectOnline){
      let otherDataCopy = otherOnlineQuery(event, false).skip((coutTime)*maxGet).limit(page*dataLimit -(coutTime)*maxGet).get()
      otherPromise.push(otherDataCopy)
      coutTime ++; continue
    }

    let organizationDataCopy = organizationQuery(event, false).skip((coutTime)*maxGet).limit(page*dataLimit -(coutTime)*maxGet).end()
    organizationPromise.push(organizationDataCopy)
    
    let otherDataCopy = otherQuery(event, false).skip((coutTime)*maxGet).limit(page*dataLimit -(coutTime)*maxGet).end()
    otherPromise.push(otherDataCopy)

    coutTime ++
  }

  promiseArr = promiseArr.concat(parentPromise).concat(organizationPromise).concat(otherPromise)
  let promiseData = (await Promise.all(promiseArr))

  // 判断线上逻辑
  if(event.selectOnline){
    let topParentData =  parentQuery(event, true).end()
    let topOtherOnlineData =  otherOnlineQuery(event, true).get()
    let otherOnlineData =  otherOnlineQuery(event,false).count()
    let promiseOnlineData = await Promise.all([topParentData, topOtherOnlineData, otherOnlineData])
    // let data = promiseData[0].data.concat(topParentData.data)
    let data = promiseOnlineData[0].list.concat(promiseOnlineData[1].data).concat(promiseData[0].data).concat(promiseData[1].data)
    return {
      data: data,
      searchFinished:  promiseData[0].list.length + promiseData[1].data.length == parentDataCount + promiseOnlineData[2].total
    }
  }


  let parentData = promiseData[0].list
  let organizationData = promiseData[1].list
  let otherData = promiseData[2].list

  // console.log( "searchQuery",searchQuery(event.city, event.searchValue), "event", event, 'parentData', parentData, 'organizationData', organizationData, 'otherData', otherData)
  let lenMax = Math.max(parentDataCount, organizationDataCount, otherDataCount)
  for(let i=0;i <lenMax;i+=dataLimit){
    data = data.concat(parentData.slice(i, i+dataLimit)).concat(organizationData.slice(i, i+dataLimit)).concat(otherData.slice(i, i+dataLimit))
  }
  if(data.length == parentDataCount+ organizationDataCount+otherDataCount + topData.length){
    searchFinished = true
  }
  console.log('event', event)
  // console.log('topData', topData)
  console.log('length', data.length, parentDataCount, organizationDataCount, otherDataCount)

  if(data.length > 40*page){
    data = data.slice(0, 40*page)
    searchFinished = false
  } 

  return {
    data: data,
    searchFinished: searchFinished
  }
}