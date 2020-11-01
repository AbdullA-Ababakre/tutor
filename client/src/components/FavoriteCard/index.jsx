import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text , Button} from '@tarojs/components';
import FavButton from "../FavButton"

import './index.scss'

import vip_yes from "../../images/mine/vip_yes.png"
import vip_no from "../../images/mine/vip_no.png"

export default class Index extends Component {

  constructor(props){
    super(props);
    this.state={

    }
  }
  componentDidMount () {} 
  componentWillUnmount () {} 
  
  render() {
    let favorite = this.props.favorite
    let yesVip = <View className="favorite-requireVip"> <image src={vip_yes} /> <View className="pic-text" > 会员 </View>  </View>
    let noVip = <View className="favorite-requireVip"> <image src={vip_no} /> <View className="pic-text" > 非会员 </View>  </View>
    let vip = favorite.requireVip==="true"?yesVip:noVip
    return (
      <View className="favorite-container" >
        <View className="favorite-container-up" >
          <View className="flexBox" >
             <View className="favorite-title" >{favorite.title}</View>
            <View className="favorite-order-id">订单编号 {favorite.orderId}</View>
          </View> 
          {vip}
          <View className="flexBox flex-space-line" >
            <View className="favorite-location">{favorite.location.slice(0,8)}...</View>
            <View className="favorite-price">{favorite.price}</View>
          </View>
        </View>
        <View className="favorite-container-down" >
          <View className="favorite-work-time">时间：{favorite.workTime}</View>
          <View className="favorite-position"> {favorite.position} </View>
          <View className="favButtom"  >
          <FavButton enable="true" />
          </View>
        </View>
      </View>
    );
  }
}
