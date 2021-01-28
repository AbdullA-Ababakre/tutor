// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  console.log(event.id)
  switch (event.type) {
    case 'parent': 
      return db.collection('parentData').doc(event.id).get()
    case 'other': 
      return db.collection('otherData').doc(event.id).get()
    case 'organization':
      return db.collection('organizationData').doc(event.id).get()
  }
}