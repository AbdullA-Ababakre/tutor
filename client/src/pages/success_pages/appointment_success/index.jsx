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
        <Image className='big-img' mode="widthFix" src="cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/order_success.png" />
        <Button className="btn-make-more-appointments" onClick={Taro.navigateBack({delta: 1})}>继续预约</Button>
      </View>
    )
  }
}
