// 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})
const db = cloud.database()

// 云函数入口函数
/**
 * 这里纯属是因为我懒，所以放后端处理了
 * 获得 share的 path 参数
 * @param {*} event 这里由path 和 params 参数需要组装
 * @param {*} context
 * @return {*} 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  let arr = []
  let obj = event.params
  for(let i in obj)
  {
    if(i==="shareOpenId") continue 
    if(i==="__key_") continue
    arr.push(i, "=", obj[i], "&")
  }
  arr.push("shareOpenId", "=", openid)

  const path = `${event.path}?${arr.join("")}`
  console.log(path)
  return {
    data:{
      path: path,
      query: arr.join(""),
    }
  }
}