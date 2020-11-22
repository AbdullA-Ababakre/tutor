const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.refund({
    "subMchId" : "12313",
    "refundFee": 1,
    "totalFee": 2
  })
  console.log(res);
  return res;
}