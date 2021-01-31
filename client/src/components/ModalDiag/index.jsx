import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text , Button, Input, Image} from '@tarojs/components';

import './index.scss'

export default class Index extends Component {

  constructor(props){
    super(props);
    this.state={
      modalDlag: true,
      ownerNumber: props.ownerNumber ||  "wxid-LJ666"
    }
  }

  preventTouchMove(){

  }

  setPasteMsg(){
    let data = this.state.ownerNumber
    Taro.setClipboardData({
      data: data,
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
        <View style="width: 100%" >
          <View className="modalDlg">
            <Image className="imgShow" mode="widthFix" src="cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/组 2151@2x.png" />
            <View className="transparentBox" onClick={this.setPasteMsg.bind(this)} />
            <View className="ownerNumberPaste" > 请添加微信号：{this.state.ownerNumber} </View>
          </View>
          <View className="mask" onTouchMove={this.preventTouchMove.bind(this)} ></View>
        </View>
      )
    )
  }
}