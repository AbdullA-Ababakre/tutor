import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'
import { View, Text, Input } from '@tarojs/components'

export default class Index extends Component {
  state = {
    context: {}
  }


  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let tempClassName = this.props.className;
    this.props.className = undefined;
    return (
      <View className={tempClassName}>
        <Input {...this.props} className='tutor-input-actual-input' />
      </View>
    )
  }
}
