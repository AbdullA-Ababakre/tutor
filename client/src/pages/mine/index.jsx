import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

  render () {
    return (
      <View className='index'>
        <AtButton type='primary'>4</AtButton>
      </View>
    )
  }
}
