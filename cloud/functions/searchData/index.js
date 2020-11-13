// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();


// 云函数入口函数
//  这一个云函数主要是获得筛选的数据
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  if(event.getType==="parent"){
    const _ = db.command
    return await db.collection('parentData').where(_.and([{
      addressSelectorChecked: db.RegExp({
        regexp: `.*${event.city}`,
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
          regexp: `.*${event.subject}`,
          options: 'i',
        })
      },
      {
        gradeChecked:  db.RegExp({
          regexp: `.*${event.grade}`,
          options: 'i',
        })
      }
    ])
    ).get()
  }
  else if(event.getType==="organization"){
    const _ = db.command
    return await db.collection('organizationData').where(_.and([{
      addressSelectorChecked: db.RegExp({
        regexp: `.*${event.city}`,
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
          regexp: `.*${event.subject}`,
          options: 'i',
        })
      },
      {
        gradeChecked:  db.RegExp({
          regexp: `.*${event.grade}`,
          options: 'i',
        })
      }
    ])
    ).get()
  }
  else if(event.getType==="other"){
    const _ = db.command
    return await db.collection('otherData').where(_.and([{
      positionAddress: db.RegExp({
        regexp: `.*${event.city}`,
        options: 'i',
      })},
      {
        tutorSubject:  db.RegExp({
          regexp: `.*`,
          options: 'i',
        })
      },
      {
        positionAddress:  db.RegExp({
          regexp: `.*${event.searchValue}`,
          options: 'i',
        })
      },
      {
        gradeChecked:  db.RegExp({
          regexp: `.*`,
          options: 'i',
        })
      }
    ])
    ).get()
  }
  return {
   
  }
}