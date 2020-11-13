// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();

  const parent = await db.collection("parentData").where(
    {
      favourList: db.RegExp({
        regexp: `${OPENID}`,
        options: 'i'
      })
    }
  ).get()
  
  const organization = await db.collection("organizationData").where(
    {
      favourList: db.RegExp({
        regexp: `${OPENID}`,
        options: 'i'
      })
    }
  ).get()

  const other = await db.collection("otherData").where(
    {
      favourList: db.RegExp({
        regexp: `${OPENID}`,
        options: 'i'
      })
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