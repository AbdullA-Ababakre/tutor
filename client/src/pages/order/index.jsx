import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'

import './index.scss'

import OrderCard from "../../components/OrderCard"
import TutorPicker from "../../components/TutorPicker"

import icon_search from '../../images/order/search_icon.png'
import fab_vip from '../../images/order/floatbtn_vip.png'

export default class Index extends Component {
  constructor(props) {
    super(props);
    Taro.setBackgroundColor({backgroundColor: "#f7f7f7"});
    Taro.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: "#FC4442",
    });
  }

  onClick () {

  }

  render () {
    let cities = ["深圳市","广州市","珠海市","其他"];
    let courses = ["语文","数学","英语","物理","化学","生物","政治","历史","地理","其他"];
    let grades = ["小学低年级","小学高年级","初一","初二","初三","高一","高二","高三","其他"];
    return (
      <View className='order-index'>
        <Image className='order-fab-become-vip' src={fab_vip} onClick={this.onClick.bind(this)}></Image>
        <View className='bg-red-block'/>
        <View className='searchbar-container'>
          <Image className='search-icon' src={icon_search} mode="widthFix"/>
          <Input className='search-input' type="text" placeholder="请输入关键字搜索" placeholderStyle='color:#B2B2B2'/>
        </View>
        <View className="orders-container">
          <View className="order-flexbox order-drop-downs-container">
            <TutorPicker placeholder="城市" range={cities} onChange={()=>{}}/>
            <TutorPicker placeholder="科目" range={courses} onChange={()=>{}}/>
            <TutorPicker placeholder="年级" range={grades} onChange={()=>{}}/>
          </View>
          <View className="order-labels-container">
            <View className="order-label">家庭教师</View>
            <View className="order-label order-label-grey">机构/企业教师</View>
            <View className="order-label order-label-grey">其它岗位</View>
          </View>
          <OrderCard title="高三数学" orderId="1098" requireVip="false" location="深圳市南山区西海明珠路302dd" price="80-90元/小时" workTime="周二 | 周四 晚上"/>
          <OrderCard title="高三数学" orderId="1098" requireVip="false" location="深圳市南山区西海明珠路302dd" price="80-90元/小时" workTime="周二 | 周四 晚上"/>
          <OrderCard title="高三数学" orderId="1098" requireVip="false" location="深圳市南山区西海明珠路302dd" price="80-90元/小时" workTime="周二 | 周四 晚上"/>
          <OrderCard title="高三数学" orderId="1098" requireVip="false" location="深圳市南山区西海明珠路302dd" price="80-90元/小时" workTime="周二 | 周四 晚上"/>
          <OrderCard title="高三数学" orderId="1098" requireVip="false" location="深圳市南山区西海明珠路302dd" price="80-90元/小时" workTime="周二 | 周四 晚上"/>
        </View>
      </View>
    )
  }
}
