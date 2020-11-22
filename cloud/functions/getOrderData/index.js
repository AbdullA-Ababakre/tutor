// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();


// 云函数入口函数
//  这一个云函数主要是获得筛选的数据
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
    const _ = db.command
    let parentData = await db.collection('parentData').where(_.and([{
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
          regexp: `.*${event.selectNonVip?"false":"true"}`,
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
      }
    ])
    ).get()
    
    let organizationData =  await db.collection('organizationData').where(_.and([{
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
          regexp: `.*${event.selectNonVip?"false":"true"}`,
          options: 'i'
        })
      },
      {
        isLoseEfficacy:false
      }
    ])
    ).get()

    let otherData =  await db.collection('otherData').where(_.and([{
      positionAddress: db.RegExp({
        regexp: `.*${event.city}`,
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
          regexp: `.*${event.selectNonVip?"false":"true"}`,
          options: 'i'
        })
      },
      {
        isLoseEfficacy:false
      }
    ])
    ).get()

    if(event.selectOnline){
      return {
        data: parentData.data
      }
    }
    console.log("otherData",otherData.data);

    let data = parentData.data.concat(organizationData.data).concat(otherData.data)
    return {
      data: data
    }
}