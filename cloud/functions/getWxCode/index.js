const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const wxacodeResult = await cloud.openapi.wxacode.get({
        path: event.path,
        width: 430
      })
    
      const name = 'qr/' + new Date().getTime() + '.jpg'
      // 上传到云存储
    const uploadResult = await cloud.uploadFile({
      cloudPath: name,
      fileContent: wxacodeResult.buffer,
    });
    let imgUrl = "https://7475-tutor-ghszz-1303852457.tcb.qcloud.la/" + name
    return imgUrl
  } catch (err) {
    return err
  }
}