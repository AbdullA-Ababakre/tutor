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
      loading: false,
      openid: "",
      searchFinished: false,
      page: 1,
      data: [],
      selectNonVip: false,
      selectOnline: false,
      city: '',
      course: '',
      grade: '',
      searchValue: ''
    }
    this.timeId = ''
  }

  componentDidShow(){
    this.onSelect()   
  }
  componentDidMount(){
    this.setShareOpenId()
    try {
      let openid = Taro.getStorageSync("openid")
      this.setState({
        loading: true,
        openid: openid
      })
    } catch (error) {
      this.getUserData()
    } 
  }

  onReachBottom(){
    if(!this.state.searchFinished){
      this.setState({
        page: this.state.page+1,
        loading:true
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
        Taro.setStorageSync("ownerNumber", details.phone);
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
      city: city,
      page: 1
    })
    this.debouceOnSelect()
  }

  changeCourse(course){
    this.setState({
      course: course,
      page: 1
    })
    this.debouceOnSelect()
  }

  changeGrades(grade){
    this.setState({
      grade: grade,
      page: 1
    })
    this.debouceOnSelect()
  }

  debouceOnSelect(){ 
    Taro.showLoading({
      title: "加载中"
    })

    clearTimeout(this.timeId)
    this.timeId = setTimeout(()=>{ 
      this.onSelect()
    }, 500)
  }
  
  onSelect(){
    Taro.cloud.callFunction({
      name: "getOrderData",
      data:{
        city: this.state.city.split("").slice(0,2).join(""),
        subject: this.state.course,
        grade: this.state.grade,
        searchValue: this.state.searchValue.trim(),
        selectNonVip: this.state.selectNonVip,
        selectOnline: this.state.selectOnline,
        page: this.state.page
      }
    })
    .then(res=>{
      // console.log(res);
      this.setState({
        data: JSON.parse(JSON.stringify(res.result.data)),
        searchFinished: res.result.searchFinished
      })
      // console.log(this.state.data);
      Taro.hideLoading()
      this.closeLoading()
    })
  }
  
  inputChange(e){
    this.setState({
      searchValue: e.detail.value,
      page: 1
    })
    this.debouceOnSelect()
  }

  changeSelectOnline(){
    this.setState({
      selectOnline: !this.state.selectOnline,
      page: 1
    })
    this.debouceOnSelect()
  }

  changeSelectVip(){
    this.setState({
      selectNonVip:!this.state.selectNonVip,
      page: 1
    })
    this.debouceOnSelect()
  }

  showLoading(){
    this.setState({
      loading: true
    })
  }

  closeLoading(){
    this.setState({
      loading: false
    })
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
              // console.log(item);
              try {
                showLabel = item.classForm.includes("线上")?true:false
              } catch (error) {
                
              }
              return (
                <OrderCard  onClick={pageDown.bind(this, item.detailType, item._id)} openid={this.state.openid} top={item.top} showLabel={showLabel} favourList={item.favourList} title={title} orderId={item.orderNumber} requireVip={item.requireVip} location={address} price={item.salarySelectorChecked+"/小时"}  workTime={`${item.teachingDay.join(" | ")} ${item.teachingTime}`} jobType={item.jobType} top={item.top} />
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
          <Input className='search-input' onInput={this.inputChange.bind(this)} type="text" placeholder="请输入关键词搜索" placeholderStyle='color:#B2B2B2'/>
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
           {this.state.data.length!=0?detailBox:this.state.loading?'':emptyBox}
        </View>

        
        {this.state.loading && <View class="loader">Loading...</View> }
         {/* 滑到最底下的提示 */}
        {this.state.searchFinished && this.state.data.length!=0 && !this.state.loading && <View className="order-end-text" > ------已到最低点------ </View>}
      </View>
    );
  }
}
