import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
//import about_us from "../../../images/about_us/about_us.png";

export default class Index extends Component {
  constructor(props) {
    super(props);
    Taro.setNavigationBarColor({frontColor: '#000000',backgroundColor: '#F7F7F7'});
    Taro.setBackgroundColor({backgroundColor: '#F7F7F7'});
  }

  render () {
    return (
      <View className='index'>
        <image className='about-us-img' mode="widthFix" src="cloud://tutor-ghszz.7475-tutor-ghszz-1303852457/images/about_us.png" />
      </View>
    )
  }
}
