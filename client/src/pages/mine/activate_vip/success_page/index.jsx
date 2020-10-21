import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button, Input } from '@tarojs/components'
import './index.scss'
//import about_us from "../../../images/about_us/about_us.png";

export default class Index extends Component {
  constructor(props) {
    super(props);
    Taro.setNavigationBarColor({
      backgroundColor: '#29D6A0',
      frontColor: '#000000',
    });
  }

  render () {
    return (
      <View className='index'>
        <Image className='big-img' mode="widthFix" src="cloud://tutor-ghszz.7475-tutor-ghszz-1303852457/images/vip_activation-sucess.png" />
        <View className='info-container'>
          <View className='input-w-label'>
            姓名：<Input className='input-w-label-actual-input'/>
          </View>
          <View className='input-w-label'>
            微信号：<Input className='input-w-label-actual-input'/>
          </View>
        </View>
        <Button className="btn-go-order">前往应聘</Button>
        <View className="little-text">(信息填写完成后点击“前往应聘”即可联系客服应聘)</View>
      </View>
    )
  }
}
