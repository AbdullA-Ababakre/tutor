import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import icon_location from "../../../images/order/details_location.png";
import icon_time from "../../../images/order/details_time.png";
import icon_favorite from "../../../images/order/details_favorite.png";

class CourseInfoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className='details-jobinfo-container'>
        <View className='details-jobinfo-title'>
          <View className='details-jobinfo-green-dot'/>{this.props.title}
        </View>
        <View className='details-jobinfo-details'>
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default class Index extends Component {
  constructor(props) {
    super(props);
    Taro.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: "#FC4442",
    })
    this.state = {
      jobType: "course",
      cooperation: "青猎创投（深圳）有限公司",
      location: "深圳市南山区西海明珠路302",
      workTime: "周二 | 周四 19:00-21:00",
      workDuration: "一次上课2个小时",
      requirements: "性别女 | 可以管教调皮的孩子",
      requirementLabels: ["学霸/绩点高","接受零经验","价格可议"],
      studentDescription: "学生调皮，不爱学习，希望提高学生学习兴趣，培养孩子积极性",
      jobGoal: "打基础 |  作业辅导 | 提高兴趣",
      hiringNeed: "5",
    };
  }
  
  render () {
    let locationView = ( // 第一个卡片里的地址
      <View className='details-text-w-icon-container'>
        <Image className='details-icon-text-w-icon' src={icon_location} />{this.state.location}
      </View>
    )
    let timeView = ( // 第一个卡片里的时间
      <View className='details-text-w-icon-container'>
        <Image className='details-icon-text-w-icon' src={icon_time} />{this.state.workTime}
        <View className='details-label-grey'>可协调</View>
        <View className='details-add-favorite'>
          <Image className='details-icon-favorite' src={icon_favorite} />收藏
        </View>
      </View>
    )
    // 老师要求 或 岗位内容/要求 下面的灰色标签
    let requirementLabelsView = this.state.requirementLabels.map((v,i)=>{
      return (<View className='details-label-grey'>{v}</View>);
    })

    const job = this.state;
    return (
      <View className='details-index'>
        <View className='bg-red-block'/>
        <View className='details-container'>
          <View className='details-infocard'>
            <Text className='details-title'>高三数学作业辅导课程</Text>
            <Text className='details-title-price'>80-90元/小时</Text>
            {(()=>{
              if(job.jobType == "course") return (
                <View>
                  <View style='details-label-container'>
                    <View className='details-label'><View class="details-label-text">线上</View></View>
                    <View className='details-label'><View class="details-label-text">学科考试</View></View>
                  </View>
                  {locationView}
                  {timeView}
                </View>
              );
              else if(job.jobType == "other") return(
                <View>
                  <View className="details-cooperation-name">
                    {job.cooperation}
                  </View>
                  {locationView}
                </View>
              );
            })()}
          </View>
          <View className='details-infocard'>
            <View className='vip-exclusive-title'>会员专属</View>
            <View className='vip-exclusives-container'>
              <View className='vip-exclusive'>月会员200元</View>
              <View className='vip-exclusive'>年会员350元</View>
              <View className='vip-exclusive'>有效期内不限接单</View>
            </View>
          </View>
          {
            (()=>{
              if(this.state.jobType == "course") return (
                <View className='details-infocard details-vertical-flexbox'>
                  <View className='details-big-title-course'>课程详情</View>
                  <CourseInfoItem title="上课时长">{this.state.workDuration}</CourseInfoItem>
                  <CourseInfoItem title="老师要求">
                    {this.state.requirements}
                    <View className='details-label-container-grey'>
                      {requirementLabelsView}
                    </View>
                  </CourseInfoItem>
                  <CourseInfoItem title="学生情况">{this.state.studentDescription}</CourseInfoItem>
                  <CourseInfoItem title="辅导目的">{this.state.jobGoal}</CourseInfoItem>
                </View>
              );
              else if(this.state.jobType == "other") return (
                <View className='details-infocard details-vertical-flexbox'>
                  <View className='details-big-title-course'>工作详情</View>
                  <CourseInfoItem title="工作时间">{this.state.workDuration}</CourseInfoItem>
                  <CourseInfoItem title="岗位内容/要求">
                    {this.state.requirements}
                    <View className='details-label-container-grey'>
                      {requirementLabelsView}
                    </View>
                  </CourseInfoItem>
                  <CourseInfoItem title="招聘人数">{this.state.hiringNeed}</CourseInfoItem>
                </View>
              );
            })()
          }
        </View>
      </View>
    )
  }
}
