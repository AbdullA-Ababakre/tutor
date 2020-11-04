import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text , Button, Image} from '@tarojs/components';

import more_order from '../../images/order/more_order.png'
import vip_rule from "../../images/order/vip_rule.png"
import share_friends from "../../images/order/share_friends.png"
import vip_introduction from "../../images/order/vip_introduction.png"

import './index.scss'

export default class Index extends Component {

  constructor(props){
    super(props)
  }

  state={}

  render() {
    let changePage=(index)=>{
      switch(index){
        case 1: Taro.switchTab({url: '/pages/order/index'});break;
        case 2: Taro.navigateTo({url: '/pages/order/vip_rule/index'});break;    // 跳转会员协议
        case 3:
         let  url = 'https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg'   
        Taro.navigateTo({
          url: "/pages/study/articlePage/index?url="+encodeURI(url),
        }); break;
        // 会员介绍
        case 4:
          Taro.showToast({
            title: "TODO 分享好友页面",
            icon: 'success',
            duration: 2000
          }); break; // 分享好友
      }
    }
    return (
      <View className="panel" >
        <Image  onClick={changePage.bind(this,1)} src={more_order} alt="more_order"/>
        <Image  onClick={changePage.bind(this,2)} src={vip_rule} alt="vip_rule"/>
        <Image  onClick={changePage.bind(this,4)} src={share_friends} alt="share_friends"/>
        <Image  onClick={changePage.bind(this,3)} src={vip_introduction} alt="vip_introduction"/>
      </View>
    );
  }
}
