import React, { Component } from 'react'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
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
      frontColor: "#ffffff",
      backgroundColor: "#FC4442",
    });
    this.state = {
      openid: "",
      isMax: false,
      page: 1,
      data: [],
      selectNonVip: false,
      selectOnline: false,
      city: '',
      course: '',
      grade: '',
      searchValue: ''
    }
  }

  componentDidShow(){
    this.onSelect()   
  }
  componentDidMount(){
    this.setShareOpenId()
    try {
      let openid = Taro.getStorageSync("openid")
      this.setState({
        openid: openid
      })
    } catch (error) {
      this.getUserData()
    } 
  }

  onReachBottom(){
    if(!this.state.isMax){
      this.setState({
        page: this.state.page+1
      })
      this.onSelect()
    }
  }

  // 绑定 分享者的 openid
  setShareOpenId(){
    try {
      let shareOpenId = ""
      let params = getCurrentInstance().router.params
      if(Object.keys(params).join("").includes("shareOpenId")){
        shareOpenId = params['shareOpenId']
        Taro.cloud.callFunction({
          name: "setShareOpenId",
          data:{
            shareOpenId: shareOpenId
          }
        })
        .then(res=>{
          console.log(res);
        })
        // console.log(shareOpenId);
      }
    } catch (error) {
      console.log(error);
    }
  }


  getPath(){
    return new Promise(resolve=>{
      Taro.showLoading({
        title:"加载中"
      })
      Taro.cloud.callFunction({
        name: "getSharePath",
        data: {
          path: getCurrentInstance().router.path,
          params: getCurrentInstance().router.params
        }
      })
      .then(res=>{
        Taro.hideLoading()
        resolve(res.result.data)
      })
    })
  }

  // 分享给别人 携带了分享者的 openid 
  async onShareAppMessage() {
    let data = await this.getPath()
    console.log(data);
    return {
      path: data.path
    }
  }

  // 分享到朋友圈 携带了分享者的 openid 
  async onShareTimeline () {
    let data = await this.getPath()
    return {
      query: data.query
    }  
  }

  getUserData(){
    Taro.cloud.callFunction({
      name: 'getUserDetails'
    })
    .then(res=>{
      // console.log(res)
      try {
        Taro.setStorageSync("openid", res.result.openId)
        Taro.setStorageSync("isVip", res.result.isVip)
        Taro.setStorageSync("isAdmin", res.result.isAdmin)
      } catch (error) {
        console.log(error);
      }      
      this.setState({
        openid: res.result.openId,
      })
    })
  }

  onClick () {
    Taro.navigateTo({url: '/pages/mine/activate_vip/index'})
  }

  changeCity(city){
    this.setState({
      city: city
    })
    this.onSelect()
  }

  changeCourse(course){
    this.setState({
      course: course
    })
    this.onSelect()
  }

  changeGrades(grade){
    this.setState({
      grade: grade
    })
    this.onSelect()
  }
  
  onSelect(){
    Taro.showLoading({
      title: "加载中"
    })
    Taro.cloud.callFunction({
      name: "getOrderData",
      data:{
        city: this.state.city.split("").slice(0,2).join(""),
        subject: this.state.course,
        grade: this.state.grade,
        searchValue: this.state.searchValue,
        selectNonVip: this.state.selectNonVip,
        selectOnline: this.state.selectOnline,
        page: this.state.page
      }
    })
    .then(res=>{
      if(this.state.data.length === res.result.data.length){
        this.setState({
          isMax: true
        })
      }else{
        this.setState({
          isMax: false
        })
      }
      this.setState({
        data: JSON.parse(JSON.stringify(res.result.data))
      })
      console.log(this.state.data);
      Taro.hideLoading()
    })
  }
  
  inputChange(e){
    this.setState({
      searchValue: e.detail.value
    })
    this.onSelect()
  }

  changeSelectOnline(){
    this.setState({
      selectOnline: !this.state.selectOnline
    })
    this.onSelect()
  }

  changeSelectVip(){
    this.setState({
      selectNonVip:!this.state.selectNonVip
    })
    this.onSelect()
  }

  render () {
    let cities = ["不限制城市","深圳市","广州市","珠海市","东莞市", "佛山市", "其他"];
    let courses = ["不限制科目","语文","数学","英语","物理","化学","生物","政治","历史","地理","其他"];
    let grades = ["不限制年级","小学","初中","高中","其他"];
    let pageDown = (item, id ="")=>{ Taro.navigateTo({url: `/pages/order/details/index?jobType=${item}&id=${id}`})}
    let detailBox = (
        this.state.data.map(item=>
          {
            if(item.detailType!=="other"){
              let title = item.gradeChecked + item.tutorSubject.join(" ")
              let address = item.addressSelectorChecked + item.exactAddress
              let showLabel = false
              try {
                showLabel = item.classForm.includes("线上")?true:false
              } catch (error) {
                
              }
              return (
                <OrderCard  onClick={pageDown.bind(this, item.detailType, item._id)} openid={this.state.openid} top={item.top} showLabel={showLabel} favourList={item.favourList} title={title} orderId={item.orderNumber} requireVip={item.requireVip} location={address} price={item.salarySelectorChecked+"/小时"}  workTime={item.teachingDay.join(" | ")} jobType={item.jobType} top={item.top} />
              )
            }
            else{
              let title = item.positionName
              let address = item.positionAddress
              return (
                <OrderCard onClick={pageDown.bind(this, item.detailType, item._id)} openid={this.state.openid} top={item.top} favourList={item.favourList} title={title} orderId={item.orderNumber} requireVip={item.requireVip} location={address} price={item.positionSalary}  workTime={item.workingTime} jobType={item.jobType} top={item.top} />
              )
            }
          }
    ))
    let emptyBox = ( <View style="color: grey; text-align: center; font-size: 25p "  > ------查无记录------ </View> )

    return (
      <View className='order-index'>
        {/* 右下方的那个成为 vip的按钮 */}
        <Image className='order-fab-become-vip' src={fab_vip} onClick={this.onClick.bind(this)}></Image>
        <View className='bg-red-block'/>
        
        {/*  搜索数据框 */}
        <View className='searchbar-container'>
          <Image className='search-icon' src={icon_search} mode="widthFix"/>
          <Input className='search-input' onInput={this.inputChange.bind(this)} type="text" placeholder="请输入地址搜索" placeholderStyle='color:#B2B2B2'/>
        </View>
        
        {/* 筛选和展示主体 */}
        <View className="orders-container">
          <View className="order-flexbox order-drop-downs-container">
            <TutorPicker placeholder="城市" range={cities} onChange={this.changeCity.bind(this)}/>
            <TutorPicker placeholder="科目" range={courses} onChange={this.changeCourse.bind(this)}/>
            <TutorPicker placeholder="年级" range={grades} onChange={this.changeGrades.bind(this)}/>
          </View>
          <View className="order-labels-container">
            <View className={`order-label ${this.state.selectNonVip?null:"order-label-grey"}`} onClick={this.changeSelectVip.bind(this)} > 非会员 </View>
            <View className={`order-label ${this.state.selectOnline?null:"order-label-grey"}`} onClick={this.changeSelectOnline.bind(this)} > 可线上 </View>
          </View>
           {this.state.data.length!=0?detailBox:emptyBox}
        </View>
         
         {/* 滑到最底下的提示 */}
        {this.state.isMax && this.state.data.length!=0 && <View className="order-end-text" > ------已到最低点------ </View>}
      </View>
    );
  }
}
