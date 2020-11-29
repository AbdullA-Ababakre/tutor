import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text , Button} from '@tarojs/components';

import "./index.scss"

import FavoriteCard from '../../../components/FavoriteCard'


class Index extends Component {

  constructor(props){
    super(props);
    this.state={
      favoriteArr: []
    }
  }

  componentDidShow () {
    this.getFavData()
  } 

  getFavData(){
    Taro.showLoading({
      title: "加载中"
    })

    Taro.cloud.callFunction({
      name: "getFavData"
    })
    .then(res=>{
      let arr = []
      console.log(res)
      let data =  res.result.data.data 
      if(data['parent'].length!=0){
        data['parent'].forEach(item=>{
          let a = {
            title: item.gradeChecked + item.tutorSubject.join(" "),
            location: item.addressSelectorChecked + item.exactAddress,
            orderId: item.orderNumber,
            requireVip: item.requireVip,
            price: item.salarySelectorChecked,
            workTime: item.teachingDay.join(" | "),
            position: item.jobType,
            detailType: item.detailType,
            isLoseEfficacy: item.isLoseEfficacy,
            _id: item._id
          }
          arr.push(a)
        })
      }
      if(data['other'].length!=0){
        data['other'].forEach(item=>{
          let a = {
            title: item.positionName,
            location: item.positionAddress,
            orderId: item.orderNumber,
            requireVip: item.requireVip,
            price: item.positionSalary,
            workTime: item.workingTime,
            position: item.jobType,
            detailType: item.detailType,
            isLoseEfficacy: item.isLoseEfficacy,
            _id: item._id
          }
          arr.push(a)
        })
      }
      if(data['organization'].length!=0){
        data['organization'].forEach(item=>{
          let a = {
            title: item.gradeChecked + item.tutorSubject.join(" "),
            location: item.addressSelectorChecked + item.exactAddress,
            orderId: item.orderNumber,
            requireVip: item.requireVip,
            price: item.salarySelectorChecked,
            workTime: item.teachingDay.join(" | "),
            position: item.jobType,
            detailType: item.detailType,
            isLoseEfficacy: item.isLoseEfficacy,
            _id: item._id
          }
          arr.push(a)
        })
      }
      this.setState({
        favoriteArr: arr
      })
      Taro.hideLoading()
    })

  }

  render() {
    console.log(this.state.favoriteArr)
    let favoriteArr = this.state.favoriteArr
    // favoriteArr.length = 0
    let text
    let pageDown = (item, id ="", isLoseEfficacy)=>{ if(isLoseEfficacy){ Taro.showToast({title: "该订单已经失效！",icon:"none"}); return } Taro.navigateTo({url: `/pages/order/details/index?jobType=${item}&id=${id}`})}
    if(favoriteArr.length>0)
        text = favoriteArr.map(item=> <View onClick={pageDown.bind(this, item.detailType, item._id, item.isLoseEfficacy)} className="favorite-card" ><FavoriteCard enable={Boolean(true)} key={item.orderId} favorite={item}></FavoriteCard> </View>  )
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