import React, { Component } from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import { View, Text , Button, Image, Input} from '@tarojs/components';

import "./index.scss"

import FavoriteCard from '../../../components/FavoriteCard'
import icon_search from '../../../images/order/search_icon.png'


// 这一个页面展示 未上架的订单
class Index extends Component {

  constructor(props){
    super(props);
    this.state={
      dataArr: [],
      chooseType: '',
      isLoseEfficacy: false,
      isOnline: false,
      searchValue: '',
      page: 1,
      searchFinished: false
    }
    this.timeId = ''
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

  onReachBottom(){
    this.setState({
      page: this.state.page + 1
    },() => {console.log(this.state.page); this.getUnOnlineData()})
  }
  

  getUnOnlineData(){
    console.log(this.state.page);
    if(this.state.searchFinished)
      return ;
    Taro.showLoading({
      title: "加载中"
    })
    let userOpenId = Taro.getStorageSync("openid")
    Taro.cloud.callFunction({
      name: "getOnlineData",
      data: {
        isLoseEfficacy: this.state.isLoseEfficacy,
        isOnline: this.state.isOnline,
        searchValue: this.state.searchValue,
        page: this.state.page
      }
    })
    .then(res=>{
      let arr = []
      console.log(res)
      let data =  res.result.data.data 
      data.forEach((item)=>{
        switch(item.detailType){
          case 'companyCourse': 
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
            break;
          case 'other':
             a = {
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
            break;
          case 'familyCourse':
             a = {
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
            break;
        }
      })
      this.setState({
        dataArr: arr,
        searchFinished:  res.result.data.searchFinished
      })
      setTimeout(()=>{
        Taro.hideLoading()
      },300)
    })
    console.log("----------------");
    console.log(this.state.searchFinished,  this.state.dataArr.length> 0);

  }

  inputChange(e){
    this.setState({
      searchValue: e.detail.value,
      page: 1,
      searchFinished: false
    }, this.debouceOnSelect())
  }

  debouceOnSelect(){
    clearTimeout(this.timeId)
    this.timeId = setTimeout(()=>{
      this.getUnOnlineData()
    }, 500)
  }



  render() {
    console.log(this.state.dataArr)
    let dataArr = this.state.dataArr

    // dataArr.length = 0
    let text
    let pageDown = (item, id ="", isLoseEfficacy)=>{ Taro.navigateTo({url: `/pages/order/details/index?jobType=${item}&id=${id}`})}
    if(dataArr.length>0)
        text = dataArr.map(item=> 
        <View onClick={pageDown.bind(this, item.detailType, item._id, item.isLoseEfficacy)} className="unOnline-card" >
          <FavoriteCard enable={item.enable} key={item.orderId} favorite={item}></FavoriteCard> 
        </View>  )
    else
        text = <View className="center-content" > <View>-----没有更多-----</View></View>
    return (
     <View>
        {/*  搜索数据框 */}
        <View className='searchbar-container'>
          <Image className='search-icon' src={icon_search} mode="widthFix"/>
          <Input className='search-input' onInput={this.inputChange.bind(this)} type="text" placeholder="请输入地址搜索" placeholderStyle='color:#B2B2B2'/>
        </View>
        
        <View className="order-content" >
           {/*  卡片 */}
        {text}
        {this.state.searchFinished && this.state.dataArr.length> 0 && <View className="center-text" > -----没有更多-----</View> }
 
        </View>
      </View>
    );
  }
}
export default Index;