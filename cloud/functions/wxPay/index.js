const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();


// 云函数入口函数
// 支付文档：  https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/open/pay/CloudPay.unifiedOrder.html
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "body" : "大学生荔教-会员",
    "outTradeNo" : "1217752501201407033233368018",
    "spbillCreateIp" : "127.0.0.1",
    "subMchId" : "1900009231",
    "totalFee" : 1,
    "envId": "tutor-ghszz",
    "functionName": "wxPayBack"
  })
  return res
}