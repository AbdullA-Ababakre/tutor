import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button, Image, Input } from '@tarojs/components'
import './index.scss'

import OrderCard from "../../components/OrderCard"

import icon_search from '../../images/order/search_icon.png'

export default class Index extends Component {
  constructor(props) {
    super(props);
    Taro.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: "#FC4442",
    });
  }

  render () {
    return (
      <View className='order-index'>
        <View className='bg-red-block'/>
        <View className='searchbar-container'>
          <Image className='search-icon' src={icon_search} mode="widthFix"/>
          <Input className='search-input' type="text" placeholder="请输入关键字搜索" placeholderStyle='color:#B2B2B2'/>
        </View>
        <View className="orders-container">
          <View className="order-labels-container">
            <View className="order-label">家庭教师</View>
            <View className="order-label order-label-grey">机构/企业教师</View>
            <View className="order-label order-label-grey">其它岗位</View>
          </View>
          <OrderCard title="高三数学" orderId="1098" requireVip="false" location="深圳市南山区西海明珠路302dd" price="80-90元/小时" workTime="周二 | 周四 晚上"/>
        </View>
      </View>
    )
  }
}
