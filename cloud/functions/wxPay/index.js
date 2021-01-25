const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

let getTradeNo = () =>{
  var outTradeNo="";  //订单号
  for(var i=0;i<6;i++) //6位随机数，用以加在时间戳后面。
  {
      outTradeNo += Math.floor(Math.random()*10);
  }
  outTradeNo = new Date().getTime() + outTradeNo;  //时间戳，用来生成订单号。
  return outTradeNo
}

// 云函数入口函数
// 支付文档：  https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/open/pay/CloudPay.unifiedOrder.html
//  最后只要在 最后 只要将 商户号填在 subMchId 上那就可以完成啦
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "body" : "大学生荔教-会员",
    "outTradeNo" : getTradeNo(),
    "spbillCreateIp" : "127.0.0.1",
    "subMchId" : "1605878403",
    "totalFee" : event.total,
    "envId": "official-9gyl2zmleab20999",
    "functionName": "wxPayBack"
  })
  return res
}