import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button, Input } from '@tarojs/components'
import './index.scss'
import userinfo from "../../../utils/userinfo"
//import about_us from "../../../images/about_us/about_us.png";

export default class Index extends Component {
  constructor(props) {
    super(props);
    Taro.setNavigationBarColor({
      backgroundColor: '#29D6A0',
      frontColor: '#000000',
    });
    this.state={
      realName: "",
      wechatName: ""
    }
  }

  changeWechatName(e){
    let wechatName = e.detail.value
    this.setState({
      wechatName: wechatName
    })
    return wechatName
  }

  changeRealName(e){
    let realName = e.detail.value
    this.setState({
      realName: realName
    })
    return realName
  }

  directOrder(){
    Taro.cloud.callFunction({
      name: 'setUserDetail',
      data: {
        realName: this.state.realName,
        wechatName: this.state.wechatName
      }
    })

    Taro.switchTab({
      url: "/pages/order/index"
    })
  }

  render () {
    return (
      <View className='index'>
        <Image className='big-img' mode="widthFix" src="cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/pay_success.png" />
        <View className='info-container'>
          <View className='input-w-label'>
            姓名：<Input onInput={this.changeRealName.bind(this)} className='input-w-label-actual-input'/>
          </View>
          <View className='input-w-label'>
            微信号：<Input onInput={this.changeWechatName.bind(this)}  className='input-w-label-actual-input'/>
          </View>
        </View>
        <Button className="btn-go-order" onClick={this.directOrder.bind(this)} >前往应聘</Button>
        <View className="little-text">(信息填写完成后点击“前往应聘”即可联系客服应聘)</View>
      </View>
    )
  }
}
