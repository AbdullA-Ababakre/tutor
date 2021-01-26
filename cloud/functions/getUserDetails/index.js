// 获取用户详细信息

const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})
const db = cloud.database()

//比较两个时间  time1，time2均为日期类型    
//判断两个时间段是否相差 m 个月  
// 在这里判断 vip 是否过期 
function completeDate(time1 , time2 , m)  
{  
    var diffyear = time2.getFullYear() - time1.getFullYear() ;  
    var diffmonth = diffyear * 12 + time2.getMonth() - time1.getMonth() ;  
    if(diffmonth < 0 ){  
        return false ;  
    }  
  
    var diffDay = time2.getDate() - time1.getDate() ;  
  
    if(diffmonth < m || (diffmonth == m && diffDay <= 0)){  
          
        if(diffmonth == m && diffDay == 0){  
            var timeA = time1.getHours()*3600+60*time1.getMinutes()+time1.getSeconds();  
            var timeB = time2.getHours()*3600+60*time2.getMinutes()+time2.getSeconds();  
            if(timeB-timeA > 0){  
                return false;  
            }  
        }  
        return true ;  
    }  
    return false ;  
} 

exports.main = async (event, context) => {
  let OPENID = event.userInfo.openId;
  return db.collection('users').where({
    openId: OPENID
  })
  .limit(1)
  .get()
  .then(result => {
    if(result.data.length == 0) {
      // 创建用户在数据库中的记录
      let newUserData = {isVip: false, phone: "", isAdmin: false, commission: 0}
      console.log("newUser:",newUserData,"openid:",OPENID);
      return cloud.callFunction({
        name: "changeUserDetails",
        data: {userInfo: {openId: OPENID}, userData: newUserData},
      })
      .then(()=>{
        return newUserData;
      })
    } else {
      // 判断是否过期 如果过期的话 就要去 更新状态
      // if(result.data[0].isVip){
      //   let vipBeginTime = result.data[0].vipBeginTime
      //   let now = new Date()
      //   if(!completeDate(vipBeginTime, now, result.data[0].vipMonth)){
      //     db.collection("users").where({
      //       openId: OPENID
      //     }).update({
      //       isVip: false
      //     })
      //   }  
      // }

      return new Promise(resolve=>{resolve(result.data[0])});
    }
  })
  .then(data => {
    return data;
  })
}

