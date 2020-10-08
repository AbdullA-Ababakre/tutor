import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'
import { View, Textarea } from '@tarojs/components'

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
        <View className='tutor-textarea-border'>
          <Textarea {...this.props} className='tutor-textarea-actual-textarea'/>
        </View>
      </View>
    )
  }
}
