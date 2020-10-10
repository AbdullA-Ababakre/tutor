import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import './index.scss'
import vip_yearly from "../../../images/mine/vip_yearly.png";
import vip_monthly from "../../../images/mine/vip_monthly.png";
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
    }
  }

  onSwitchPlan(plan) {
    if(this.state.selectedPlan != plan) this.setState({selectedPlan: plan})
  }

  pay() {
    let plan = this.state.selectedPlan;
    let total = plan == 1 ? 300 : 200;
    Taro.showToast({
      title: `TODO支付${total}元`,
      icon: 'success',
      duration: 2000
    })
  }

  render () {
    return (
      <View className='index'>
        <View className='big-container'>
          <View className="text-greeting">{"老师，您好！\n欢迎来到大学生荔教"}</View>
          <View className="subscription-images-container">
            
            <View className={`vip-subscription-image ${this.state.selectedPlan==2?"grayscale":""}`} onClick={()=>{this.onSwitchPlan(1)}}>
              <Image className="vip-subscription-image" src={vip_yearly} />
              <Image className="icon-vip-recommended" src={vip_recommended} />{/* “荐”字 */}
            </View>
            <Image className={`vip-subscription-image ${this.state.selectedPlan==1?"grayscale":""}`} src={vip_monthly} onClick={()=>{this.onSwitchPlan(2)}} />

          </View>
          <View className="text-small">充值会员立享多重优惠</View>
          {/* 这里不用TutorButton是故意的，详情import那里 */}
          <Button className="btn-pay" onClick={()=>{this.pay()}}>一键支付</Button>
          <View className="text-small">我已阅读并接受
          <Text className="href-eula" onClick={()=>{Taro.navigateTo({url: "eula/index"});}}>《会员协议》</Text></View>
        </View>

      </View>
    )
  }
}
