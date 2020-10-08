import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'
import { Button } from '@tarojs/components'

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
    if(!this.props.bgcolor) this.props.bgcolor = "#FC4442";
    if(!this.props.textcolor) this.props.textcolor = "#FFFFFF";
    return (
        <Button className='tutor-button'
          style={`background-color: ${this.props.bgcolor};color: ${this.props.textcolor};font-size: 38rpx !important;`}
          {...this.props}
        />
    )
  }
}
