import Taro from "@tarojs/taro";

export default class Index {

    /**
     * 这一个函数 获得 支付的payment 是
     * wx.requestPayment 所需的信息
     * @static
     * @param {*} tradeName: String 交易名称
     * @param {*} totalFee: Number  交易总金额
     * @memberof Index
     */
    static beginWxPay(tradeName, totalFee){
      return Taro.cloud.callFunction({
        name: 'wxPay',
        data: {
          tradeName: tradeName,
          totalFee: totalFee
        }
      })
      .then(res=>{
        console.log(res)
      })
    }

    /**
     *退款函数
     * @static
     * @param {*} refundFee：Number
     */
    static beginWxRefund(refundFee){
      return Taro.cloud.callFunction({
        name: "wxRefund",
        data:{
          refundFee: refundFee
        }
      })
    }
}