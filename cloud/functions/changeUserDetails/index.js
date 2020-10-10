// 修改用户详细信息

const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  let userCollection = db.collection('users').where({
    openId: OPENID
  }).limit(1)
  
  userCollection
  .get()
  .then(data => {
    if(data.length == 0) {
      db.collection('users').add({
        data: {
          
        }
      })
    } else {
      userCollection.update({
        data: {
          
        }
      })
    }
  })
}

