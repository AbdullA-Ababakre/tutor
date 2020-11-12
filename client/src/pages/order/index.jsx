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
    this.state = {
      data: [],
      index: 1, //设置家庭教师。。。。
      city: '',
      course: '',
      grade: '',
      searchValue: ''
    }
  }

  onClick () {
    Taro.navigateTo({url: '/pages/mine/activate_vip/index'})
  }
  componentWillMount() {
    let index = this.state.index
    switch(index){
      case 1: this.getDataLoading('parent'); break;
      case 2: this.getDataLoading('organization'); break;
      case 3: this.getDataLoading('other'); break;
    }
  }

  componentDidShow(){
    let index = this.state.index
    switch(index){
      case 1: this.getDataLoading('parent'); break;
      case 2: this.getDataLoading('organization'); break;
      case 3: this.getDataLoading('other'); break;
    }
  }

  getData(type,select){
    return new Promise((resolve, reject)=>{
      Taro.cloud.callFunction({
        name: 'getData',
        data: {
          getType: type,
          select: select
        }
      })
      .then(res=>{
        resolve(res)
      })
      .catch(err=>{
        reject(err)
      })
    })
  }

  getDataLoading(type, select){
    Taro.showLoading({
      title: "加载中"
    })
    this.getData(type,select)
        .then(res=>{
          // console.log(res)
          this.setState({
            data: res.result.data
          }, ()=>{
            Taro.hideLoading()
          })
        })
  }

  changeTab(index){
    this.refreshSearchData()
    this.setState({
      index: index
    })
    switch(index){
      case 1: this.getDataLoading('parent'); break;
      case 2: this.getDataLoading('organization'); break;
      case 3: this.getDataLoading('other'); break;
    }
  }

  changeCity(city){
    this.setState({
      city: city
    } )
    this.getSelectData()
  }

  changeCourse(course){
    this.setState({
      course: course
    })
    this.getSelectData()

  }

  changeGrades(grade){
    this.setState({
      grade: grade
    })
    this.getSelectData()
  }
  
  onSelect(selectType){
    return new Promise((resolve, reject)=>{
      Taro.showLoading({
        title: "加载中"
      })
      Taro.cloud.callFunction({
        name: "searchData",
        data:{
          getType: selectType,
          city: this.state.city.split("").slice(0,2).join(""),
          subject: this.state.course,
          grade: this.state.grade,
          searchValue: this.state.searchValue
        }
      })
      .then(res=>{
        // console.log(res.result)
        this.setState({
          data: JSON.parse(JSON.stringify(res.result.data))
        })
        Taro.hideLoading()
        resolve(res)
      })
    })
  }

  refreshSearchData(){
    this.setState({
      city: '',
      course: '',
      grade: '',
      searchValue: ''
    })
  }

  getSelectData(){
    switch(this.state.index){
      case 1: this.onSelect("parent"); break;
      case 2: this.onSelect("organization"); break;
      case 3: this.onSelect("other"); break;
    }
  }
  
  inputChange(e){
    this.setState({
      searchValue: e.detail.value
    })
    this.getSelectData()
    // console.log(this.state.searchValue)
  }

  render () {
    let cities = ["深圳市","广州市","珠海市","其他"];
    let courses = ["语文","数学","英语","物理","化学","生物","政治","历史","地理","其他"];
    let grades = ["小学","初中","高中","其他"];
    let pageDown = (item, id ="")=>{ Taro.navigateTo({url: `/pages/order/details/index?jobType=${item}&id=${id}`})}
    let detailBox = (
        this.state.data.map(item=>
          {
            if(item.detailType!=="other"){
              let title = item.gradeChecked + item.tutorSubject.join(" ")
              let address = item.addressSelectorChecked + item.exactAddress
              return (
                <OrderCard onClick={pageDown.bind(this, item.detailType, item._id)} _openid={item._openid} favourList={item.favourList} title={title} orderId={item.orderNumber} requireVip={item.isVip} location={address} price={item.salarySelectorChecked}  workTime={item.teachingDay.join(" | ")} jobType={item.jobType} />
              )
            }
            else{
              let title = item.positionName
              let address = item.positionAddress
              return (
                <OrderCard onClick={pageDown.bind(this, item.detailType, item._id)} _openid={item._openid} favourList={item.favourList} title={title} orderId={item.orderNumber} requireVip={item.isVip} location={address} price={item.positionSalary}  workTime={item.workingTime} jobType={item.jobType} />
              )
            }
          }
    ))

    return (
      <View className='order-index'>
        <Image className='order-fab-become-vip' src={fab_vip} onClick={this.onClick.bind(this)}></Image>
        <View className='bg-red-block'/>
        <View className='searchbar-container'>
          <Image className='search-icon' src={icon_search} mode="widthFix"/>
          <Input className='search-input' onInput={this.inputChange.bind(this)} type="text" placeholder="请输入地址搜索" placeholderStyle='color:#B2B2B2'/>
        </View>
        <View className="orders-container">
          <View className="order-flexbox order-drop-downs-container">
            <TutorPicker placeholder="城市" range={cities} onChange={this.changeCity.bind(this)}/>
            <TutorPicker placeholder="科目" range={courses} onChange={this.changeCourse.bind(this)}/>
            <TutorPicker placeholder="年级" range={grades} onChange={this.changeGrades.bind(this)}/>
          </View>
          <View className="order-labels-container">
            <View className={`order-label ${this.state.index === 1?null:"order-label-grey"}`} onClick={this.changeTab.bind(this, 1)} >家庭教师</View>
            <View className={`order-label ${this.state.index === 2?null:"order-label-grey"}`} onClick={this.changeTab.bind(this, 2)} >机构/企业教师</View>
            <View className={`order-label ${this.state.index === 3?null:"order-label-grey"}`} onClick={this.changeTab.bind(this, 3)} >其它岗位</View>
          </View>
           {this.state.data.length!=0 && detailBox}
        </View>
      </View>
    );
  }
}
