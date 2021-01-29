import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View} from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props);
    Taro.setNavigationBarColor({frontColor: '#000000',backgroundColor: '#F7F7F7'});
    Taro.setBackgroundColor({backgroundColor: '#F7F7F7'});
  }

  render () {
    return (
      <View className='index'>
        <image className='about-us-img' mode="widthFix" src="cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/about_us_real.png" />
      </View>
    )
  }
}
