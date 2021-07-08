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

let addressQuery = (city, searchValue) =>{
  // let 
  const addressArray = [
    '深圳', '广州', '佛山', '东莞', '珠海', '上海',
    '福田区', '罗湖区', '南山区', '宝安区', '龙岗区', '盐田区', '坪山区', '龙华区', '光明新区',
    '越秀区', '海珠区', '荔湾区', '天河区', '白云区', '黄埔区', '花都区', '番禺区', '南沙区', '从化区', '增城区',
    '禅城区', '顺德区', '南海区', '三水区', '高明区','莞城街道','东城街道','南城街道','万江街道','石龙镇','石排镇',
    '茶山镇','企石镇','桥头镇','东坑镇','横沥镇','常平镇','虎门镇','长安镇','沙田镇','厚街镇','寮步镇','大岭山镇',
    '大朗镇','黄江镇','樟木头镇','谢岗镇','塘厦镇','清溪镇','凤岗镇','麻涌镇','中堂镇','高埗镇','石碣镇','望牛墩镇',
    '洪梅镇','道滘镇',
    '香洲区', '斗门区', '金湾区', '横琴新区',
    '辖黄浦区','徐汇区','长宁区','静安区','普陀区','虹口区','杨浦区','闵行区','宝山区','嘉定区','金山区','松江区',
    '青浦区','奉贤区','崇明区','浦东新区',
  ]

  let value = city
  if(searchValue){
    // 这里是为了得到 地址
    addressArray.forEach(address => {
      if(searchValue.includes(address)) {
        value = address
      }
    })
  }
  
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
  
  return `.*${value.includes("不")?"":value}`
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
  return `.*${(value.includes("不") || value.includes("全"))?"":value}`
  
}

let parentQuery = (event, isTop) => {
  return db.collection('parentData').where(_.and([
    _.or({
    addressSelectorChecked: db.RegExp({
      regexp: addressQuery(event.city, event.searchValue),
      options: 'i',
    })}, 
    {
      exactAddress:  db.RegExp({
        regexp: addressQuery(event.city, event.searchValue),
        options: 'i',
      })
    }),
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
  .orderBy('orderNumber', 'desc')

}

let organizationQuery = (event, isTop) => {
  return db.collection('organizationData').where(_.and([
    _.or({
    addressSelectorChecked: db.RegExp({
      regexp: addressQuery(event.city, event.searchValue),
      options: 'i',
    })},
    {
      exactAddress:  db.RegExp({
        regexp: addressQuery(event.city, event.searchValue),
        options: 'i',
      })
    }),
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
  .orderBy('orderNumber', 'desc')

}

let otherQuery = (event, isTop) => {
  return db.collection('otherData').where(_.and([
    {
    positionAddress: db.RegExp({
      regexp: addressQuery(event.city, event.searchValue),
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
        regexp: `.*${(event.subject.includes("不") || event.grade.includes("不") || event.subject.includes("其") || event.grade.includes("其"))?"":event.searchValue}`,
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
        regexp: `.*${(event.subject.includes("不") || event.grade.includes("不") || event.subject.includes("其") || event.grade.includes("其"))?"":event.searchValue}`,
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

  console.log('addressQuery(event.city, event.searchValue)', addressQuery(event.city, event.searchValue))
  console.log('tutorQuery(event.subject, event.searchValue)', tutorQuery(event.subject, event.searchValue))
  console.log('gradeQuery(event.grade, event.searchValue)', gradeQuery(event.grade, event.searchValue))
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

  if(data.length > 40*page){
    data = data.slice(0, 40*page)
    searchFinished = false
  }

  return {
    data: data,
    searchFinished: searchFinished
  }
}