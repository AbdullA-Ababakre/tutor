// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();

  const parent = await db.collection("parentData").where(
    {
      isOnline: false,
      isLoseEfficacy: false
    }
  ).get()
  
  const organization = await db.collection("organizationData").where(
    {
      isOnline: false,
      isLoseEfficacy: false
    }
  ).get()

  const other = await db.collection("otherData").where(
    {
      isOnline: false,
      isLoseEfficacy: false
    }
  ).get()

  console.log(parent, organization, other)
  return {
    data: {
      data:{
        parent: parent.data,
        organization: organization.data,
        other: other.data
      }
    }
  }
}