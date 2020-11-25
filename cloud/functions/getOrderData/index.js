// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

let getDbCout = async ()=>{
  let parentDataCount = await db.collection("parentData").count()
  parentDataCount = parentDataCount.total
  let organizationDataCount = await db.collection("organizationData").count()
  organizationDataCount = organizationDataCount.total
  let otherDataCount = await db.collection("otherData").count()
  otherDataCount = otherDataCount.total
  return new Promise(resolve =>{resolve({parentDataCount, organizationDataCount, otherDataCount })})
}

let getAllTopData = async (event) =>{
  const _ = db.command

  let parentDataCopy = await db.collection('parentData').where(_.and([{
    addressSelectorChecked: db.RegExp({
      regexp: `.*${event.city.includes("不")?"":event.city}`,
      options: 'i',
    })},
    {
      exactAddress:  db.RegExp({
        regexp: `.*${event.searchValue}`,
        options: 'i',
      })
    },
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
      isVip: db.RegExp({
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
      top: true
    }
  ])
  ).get()

   //  get the organizationData in the limit 
  let organizationDataCopy =  await db.collection('organizationData').where(_.and([{
    addressSelectorChecked: db.RegExp({
      regexp: `.*${event.city.includes("不")?"":event.city}`,
      options: 'i',
    })},
    {
      exactAddress:  db.RegExp({
        regexp: `.*${event.searchValue}`,
        options: 'i',
      })
    },
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
      isVip: db.RegExp({
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
      top: true
    }
  ])
  ).get()
  
   //  get the otherData in the limit 
  let otherDataCopy =  await db.collection('otherData').where(_.and([{
    positionAddress: db.RegExp({
      regexp: `.*${event.city.includes("不")?"":event.city}`,
      options: 'i',
    })},
    {
      positionAddress:  db.RegExp({
        regexp: `.*${event.searchValue}`,
        options: 'i',
      })
    },
    {
      isVip: db.RegExp({
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
      top: true
    }
  ])
  ).get()
  return new Promise(resolve =>resolve(parentDataCopy.data.concat(organizationDataCopy.data).concat(otherDataCopy.data)))
}

// 云函数入口函数
//  这一个云函数主要是获得筛选的数据
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  let dataLimit = 3
  let maxGet = 100
  let {parentDataCount, organizationDataCount, otherDataCount } = await getDbCout()
  const _ = db.command
  let page = event.page
  let parentData = {data: []}
  let organizationData ={data: []}
  let otherData = {data: []}
  let data = []

  //  get the parentData in the limit 
  let count = Math.floor(( page*dataLimit) /100) + 1

  // 取出 top data
  let topData = await getAllTopData(event)
  data = data.concat(topData)
  console.log(topData, data);
  //  取多少次
  while(count!=0){
    count -= 1
    let parentDataCopy = await db.collection('parentData').where(_.and([{
      addressSelectorChecked: db.RegExp({
        regexp: `.*${event.city.includes("不")?"":event.city}`,
        options: 'i',
      })},
      {
        exactAddress:  db.RegExp({
          regexp: `.*${event.searchValue}`,
          options: 'i',
        })
      },
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
        isVip: db.RegExp({
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
        top: false
      }
    ])
    ).skip((count)*maxGet).limit(page*dataLimit -(count)*maxGet).get()
    parentData.data =  parentData.data.concat(parentDataCopy.data)
    console.log('\n\n------ begin:  ------')
    console.log(parentData, parentDataCopy,page*dataLimit -(count)*maxGet )
    console.log('------ end:  ------\n\n')

     //  get the organizationData in the limit 
    let organizationDataCopy =  await db.collection('organizationData').where(_.and([{
      addressSelectorChecked: db.RegExp({
        regexp: `.*${event.city.includes("不")?"":event.city}`,
        options: 'i',
      })},
      {
        exactAddress:  db.RegExp({
          regexp: `.*${event.searchValue}`,
          options: 'i',
        })
      },
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
        isVip: db.RegExp({
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
        top: false
      }
    ])
    ).skip((count)*maxGet).limit(page*dataLimit -(count)*maxGet).get()
    organizationData.data = organizationData.data.concat(organizationDataCopy.data)
    
     //  get the otherData in the limit 
    let otherDataCopy =  await db.collection('otherData').where(_.and([{
      positionAddress: db.RegExp({
        regexp: `.*${event.city.includes("不")?"":event.city}`,
        options: 'i',
      })},
      {
        positionAddress:  db.RegExp({
          regexp: `.*${event.searchValue}`,
          options: 'i',
        })
      },
      {
        isVip: db.RegExp({
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
        top: false
      }
    ])
    ).skip((count)*maxGet).limit(page*dataLimit -(count)*maxGet).get()
    otherData.data = otherData.data.concat(otherDataCopy.data)
    
    console.log(data);
  }

  let lenMax = Math.max(parentDataCount, organizationDataCount, otherDataCount)
  for(let i=0;i <lenMax;i+=dataLimit){
    data = data.concat(parentData.data.slice(i, i+dataLimit)).concat(organizationData.data.slice(i, i+dataLimit)).concat(otherData.data.slice(i, i+dataLimit))
  }

 
  if(event.selectOnline){
    return {
      data: parentData.data
    }
  }
  // console.log(parentData,organizationData,otherData, event,page<Math.ceil(otherDataCount/dataLimit),otherDataCount  );

  return {
    data: data
  }
}