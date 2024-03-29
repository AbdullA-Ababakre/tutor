const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    console.log('====================================');
    console.log(event.path.split("/").slice(1).join("/"));
    console.log('====================================');
    const wxacodeResult = await cloud.openapi.wxacode.get({
        path: event.path,
        width: 430
      })
    
    const name = 'QrCode/' + new Date().getTime() + '.jpg'
    console.log('====================================');
    console.log(wxacodeResult);
    console.log('====================================');
      // 上传到云存储
    const uploadResult = await cloud.uploadFile({
      cloudPath: name,
      fileContent: wxacodeResult.buffer,
    });
    let imgUrl = "https://6f66-official-9gyl2zmleab20999-1304839186.tcb.qcloud.la/" + name
    return imgUrl
  } catch (err) {
    return err
  }
}