import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text , Button} from '@tarojs/components';

import "./index.scss"

import FavoriteCard from '../../../components/FavoriteCard'


class Index extends Component {

  constructor(props){
    super(props);
    this.state={

    }
  }

  componentDidMount () {} 
  componentWillUnmount () {} 

  render() {
    let favorite = {
    title: "高三数学", 
    location: "深圳市南山区西海明珠路320223", 
    orderId: "1098", 
    requireVip: "false", 
    price: "20-23元/小时",
    workTime:"123", 
    position:"家庭教师"
  }
    let favoriteArr = [
      {
        title: "高三数学", 
        location: "深圳市南山区西海明珠路320223", 
        orderId: "1098", 
        requireVip: "false", 
        price: "20-23元/小时",
        workTime:"123", 
        position:"家庭教师"
      },
      {
        title: "小学英语", 
        location: "深圳市南山区西海明珠路320223", 
        orderId: "1234", 
        requireVip: "true", 
        price: "20-23元/小时",
        workTime:"123", 
        position:"机构/企业教师"
      },
      {
        title: "公众号运营", 
        location: "深圳市南山区西海明珠路320223", 
        orderId: "1022", 
        requireVip: "false", 
        price: "20-23元/小时",
        workTime:"123", 
        position:"家庭教师"
      }
    ]
    favoriteArr.length = 0
    let text
    if(favoriteArr.length>0)
        text = favoriteArr.map(item=> <View className="favorite-card" ><FavoriteCard key={item.orderId} favorite={item}></FavoriteCard> </View>  )
    else
        text = <View className="center-content" > <View>-----没有更多-----</View><View>-快去收藏课程吧-</View> </View>
    // console.log(text)
    return (
     <View>
       {text}
     </View>
    );
  }
}
export default Index;