import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button, Input } from '@tarojs/components'
import './index.scss'

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
        <Image className='big-img' mode="widthFix" src="https://7475-tutor-ghszz-1303852457.tcb.qcloud.la/images/appointment-success.png" />
        <Button className="btn-make-more-appointments" onClick={Taro.navigateBack({delta: 1})}>继续预约</Button>
      </View>
    )
  }
}
