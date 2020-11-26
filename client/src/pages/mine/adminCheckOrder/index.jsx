import React, { Component } from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import { View, Text , Button} from '@tarojs/components';

import "./index.scss"

import FavoriteCard from '../../../components/FavoriteCard'

// 这一个页面展示 未上架的订单
class Index extends Component {

  constructor(props){
    super(props);
    this.state={
      dataArr: [],
      chooseType: '',
      isLoseEfficacy: false,
      isOnline: false
    }
  }

  componentDidShow () {
    if(getCurrentInstance().router.params['chooseType']==="loseEfficacy"){
      this.setState({
        isLoseEfficacy: true,
        isOnline: undefined
      })
      Taro.setNavigationBarTitle({
        title: '失效订单信息'
      })
    }
    this.getUnOnlineData()
  } 

  getUnOnlineData(){
    Taro.showLoading({
      title: "加载中"
    })
    let userOpenId = Taro.getStorageSync("openid")
    Taro.cloud.callFunction({
      name: "getOnlineData",
      data: {
        isLoseEfficacy: this.state.isLoseEfficacy,
        isOnline: this.state.isOnline
      }
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
            requireVip: item.isVip,
            price: item.salarySelectorChecked,
            workTime: item.teachingDay.join(" | "),
            position: item.jobType,
            detailType: item.detailType,
            isLoseEfficacy: item.isLoseEfficacy,
            _id: item._id,
            enable: item.favourList.indexOf(userOpenId)!==-1
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
            requireVip: item.isVip,
            price: item.positionSalary,
            workTime: item.workingTime,
            position: item.jobType,
            detailType: item.detailType,
            isLoseEfficacy: item.isLoseEfficacy,
            _id: item._id,
            enable: item.favourList.indexOf(userOpenId)!==-1
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
            requireVip: item.isVip,
            price: item.salarySelectorChecked,
            workTime: item.teachingDay.join(" | "),
            position: item.jobType,
            detailType: item.detailType,
            isLoseEfficacy: item.isLoseEfficacy,
            _id: item._id,
            enable: item.favourList.indexOf(userOpenId)!==-1
          }
          arr.push(a)
        })
      }
      this.setState({
        dataArr: arr
      })
      Taro.hideLoading()
    })

  }

  render() {
    console.log(this.state.dataArr)
    let dataArr = this.state.dataArr

    // dataArr.length = 0
    let text
    let pageDown = (item, id ="", isLoseEfficacy)=>{ Taro.navigateTo({url: `/pages/order/details/index?jobType=${item}&id=${id}`})}
    if(dataArr.length>0)
        text = dataArr.map(item=> <View onClick={pageDown.bind(this, item.detailType, item._id, item.isLoseEfficacy)} className="unOnline-card" ><FavoriteCard enable={item.enable} key={item.orderId} favorite={item}></FavoriteCard> </View>  )
    else
        text = <View className="center-content" > <View>-----没有更多-----</View></View>
    return (
     <View>
       {text}
     </View>
    );
  }
}
export default Index;