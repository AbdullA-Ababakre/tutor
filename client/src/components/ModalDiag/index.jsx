import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text , Button, Input, Image} from '@tarojs/components';

import './index.scss'

import goHiredPng from "../../../src/images/order/go_hired.png"

export default class Index extends Component {

  constructor(props){
    super(props);
    this.state={
      modalDlag: true
    }
  }

  preventTouchMove(){

  }

  setPasteMsg(){
    Taro.setClipboardData({
      data: 'zyj88911',
      success (res) {
        Taro.showToast({
          title: '复制微信号成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
    setTimeout(()=>{
      this.setState({
        modalDlag: false
        })
    },1000)
    this.props.postDiagData(false)
  }

  render(){
    return (
      this.state.modalDlag&&(
        <View>
           <View className="modalDlg">
            <Image className="imgShow" mode="widthFix" src={goHiredPng} />
            <View className="transparentBox" onClick={this.setPasteMsg.bind(this)} />
          </View>
          <View className="mask" onTouchMove={this.preventTouchMove.bind(this)} ></View>
        </View>
      )
    )
  }
}