import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import './index.scss'
// import vip_yearly from "../../../images/mine/vip_yearly.png";
// import vip_monthly from "../../../images/mine/vip_monthly.png";
import vip_recommended from "../../../images/mine/recommended.png";
//import TutorButton from "../../../components/TutorButton/index";
// 这里 import TutorButton 的话直接白屏。。奇怪
// 用都没有用，单 import 就白屏，为什么会这样？
// 可能是框架或者小程序的坑，后人帮忙解决一下？

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: 1,
      showPay: false,
      platform: ''
    }
    this.timeId = ''
  }

  componentDidMount(){
    let that = this
    Taro.getSystemInfo({
      success: function (res) {
        that.setState({
          platform: res.platform,
          showPay: res.platform=='ios' ? true: false
        })
      } 
    });
  }

  onSwitchPlan(plan) {
    if(this.state.selectedPlan != plan) this.setState({selectedPlan: plan})
  }

  debouncePay(){
    if(this.state.platform == 'ios'){
      Taro.showModal({
        title: '提示',
        content: '由于小程序限制，ios 用户无法支付成为会员！',
        showCancel: false,
        success: function (res) {
        }
      });
      return;
    }

    this.setState({
      showPay: true
    })
    Taro.showLoading({
      title: '加载中'
    });
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() =>{
      this.pay()
    }, 1000)
  }

  pay() {
    let plan = this.state.selectedPlan;
    let total = plan == 1 ? 350 : 200;
    // Taro.showToast({
    //   title: `TODO支付${total}元`,
    //   icon: 'success',
    //   duration: 2000
    // })

    let that = this
    // // 这里 是支付代码
    Taro.cloud.callFunction({
      name: 'wxPay',
      data: {
        total: total
      }
    })
    .then(res=>{
      Taro.hideLoading()
      console.log('----------------');
      console.log(res);
      const payment = res.result.payment
      let vipMonth = total===350?12:1

      wx.requestPayment({
        ...payment,
        success (res) {
          Taro.setStorageSync('isVip', true)
          Taro.cloud.callFunction({
            name: 'setUserDetail',
            data: {
              setVip: true,
              vipMonth: vipMonth
            }
          })

          Taro.redirectTo({
             url: '/pages/success_pages/vip_success/index'
          });
          console.log('pay success', res)
        },
        fail (err) {
          Taro.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 2000
          });
          console.error('pay fail', err)
          that.setState({
            showPay: false
          })
        }
      })
    })
  }

  render () {
    return (
      <View className='index'>
        <View className="text-greeting">{"老师，您好！\n欢迎您成为\n大学生荔教会员！"}</View>
        <View className="subscription-images-container">
          
          <View className={`vip-subscription-image ${this.state.selectedPlan==2?"grayscale":""}`} onClick={()=>{this.onSwitchPlan(1)}}>
            <Image className="icon-vip-recommended" src={vip_recommended} />{/* “荐”字 */}
            <Image className="vip-subscription-image" src="cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/vip_yearly.png" />
          </View>
          <Image className={`vip-subscription-image ${this.state.selectedPlan==1?"grayscale":""}`} src="cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/vip_monthly.png" onClick={()=>{this.onSwitchPlan(2)}} />

        </View>
        <View className={`${this.state.platform=='ios'?"display-none":""}`}>
          {/* 这里不用TutorButton是故意的，详情import那里 */}
          <Button className={`btn-pay ${this.state.showPay?"btn-bg-grey":"btn-bg-red"}`} onClick={()=>{this.debouncePay()}}>一键支付</Button>
          <View className="text-small">我已阅读并接受
          <Text className="href-eula" onClick={()=>{Taro.navigateTo({url: "/pages/order/vip_rule/index"});}}>《会员协议》</Text></View>
        </View>
      </View>
    )
  }
}

