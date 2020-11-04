import React, { Component } from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import FavButton from "../../../components/FavButton"
import OrderDetailRightPanel from "../../../components/OrderDetailRightPanel"

import icon_location from "../../../images/order/details_location.png";
import icon_time from "../../../images/order/details_time.png";



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

    /*
    这里说明一下变量的对应
    @jobType: 对应家庭教师，机构教师，其他岗位
    @isVip: true/false  是否Vip
    */

    this.state = {
      familyCourse: {
        jobType: "familyCourse",
        jobTask: "高三数学作业辅导课程",
        jobPrice: "80-90元/小时",
        location: "深圳市南山区西海明珠路302",
        workTime: "周二 | 周四 19:00-21:00",
        isVip: "true",
        workDuration: "一次上课2个小时",
        requirements: "性别女 | 可以管教调皮的孩子",
        requirementLabels: ["学霸/绩点高","接受零经验","价格可议"],
        studentDescription: "学生调皮，不爱学习，希望提高学生学习兴趣，培养孩子积极性",
        jobGoal: "打基础 |  作业辅导 | 提高兴趣"
      },
      companyCourse: {
        jobType: "companyCourse",
        jobTask: "小学语文数学",
        jobPrice: "80-90元/小时",
        location: "深圳市南山区西海明珠路302",
        workTime: "周二 | 周四 19:00-21:00",
        isVip: "false",
        workDuration: "一次上课2个小时",
        requirements: "可以管教调皮的孩子",

        jobDescription: "教学生上课",
        hiringNeed: "5",
      },
      other: {
        jobType: "other",
        jobTask: "公众号运营",
        jobPrice: "300元/天",
        isVip: "false",
        location: "深圳市南山区西海明珠路302",

        cooperation: "青猎创投（深圳）有限公司",
        workDuration: "周末时间",
        requirements: "有公众号运营经验",
        hiringNeed: '5'
      }
    };
  }
   
  
  componentDidMount(){
    //  路由传值到这里来了
    // console.log(getCurrentInstance().router.params)

  }

  render () {
    const job = this.state[getCurrentInstance().router.params.jobType] || this.state["other"];
    // console.log()
    if(job.jobType==="familyCourse") {Taro.setNavigationBarTitle({title: "家庭教师"}) }
    if(job.jobType==="companyCourse") {Taro.setNavigationBarTitle({title: "机构/企业教师"}) }
    if(job.jobType==="other") {Taro.setNavigationBarTitle({title: "其他岗位"})}
    if(job.isVip==="true")  Taro.setNavigationBarColor({frontColor: "#000000",backgroundColor: "#ffc63b"}) 
    
    let turnVipPage = () =>{ Taro.navigateTo({url: '/pages/mine/activate_vip/index'})}
    let vipCard =(
      <View onClick={turnVipPage} className='details-infocard'>
      <View className='vip-exclusive-title'>会员专属</View>
      <View className='vip-exclusives-container'>
        <View className='vip-exclusive'>月会员200元</View>
        <View className='vip-exclusive'>年会员350元</View>
        <View className='vip-exclusive'>有效期内不限接单</View>
      </View>
      </View>
    )
    let locationView = ( // 第一个卡片里的地址
      <View className='details-text-w-icon-container'>
        <Image className='details-icon-text-w-icon' src={icon_location} />{job.location}
      </View>
    )
    let timeView = ( // 第一个卡片里的时间
      <View className='details-text-w-icon-container'>
        <Image className='details-icon-text-w-icon' src={icon_time} />{job.workTime}
        <View className='details-label-grey'>可协调</View>
        <FavButton style='float: right;'/>
      </View>
    )
    // 老师要求 或 岗位内容/要求 下面的灰色标签
    let requirementLabelsView = job.requirementLabels>0? job.requirementLabels.map((v,i)=>{
      return (<View className='details-label-grey'>{v}</View>);
    }):""

    return (
      <View className='details-index'>
        <OrderDetailRightPanel  className="right_panel" />

        {
          job.isVip==="false"?<View className='bg-red-block'/>:<View className='bg-yellow-block'/>
        }
        <View className='details-container'>
          <View className='details-infocard'>
          <Text className='details-title'>{job.jobTask}</Text>
          <Text className='details-title-price'>{job.jobPrice}</Text>
            {(()=>{
              if(job.jobType === "familyCourse" || job.jobType==="companyCourse") return (
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
          {/* vip 卡片 */}
          {
            job.isVip==="false"?vipCard:""
          }


          {/*  课程卡片 */}
          {
            (()=>{
              if(job.jobType == "familyCourse") return (
                <View className='details-infocard details-vertical-flexbox'>
                  <View className='details-big-title-course'>课程详情</View>
                  <CourseInfoItem title="上课时长">{job.workDuration}</CourseInfoItem>
                  <CourseInfoItem title="老师要求">
                    {job.requirements}
                    <View className='details-label-container-grey'>
                      {requirementLabelsView}
                    </View>
                  </CourseInfoItem>
                  <CourseInfoItem title="学生情况">{job.studentDescription}</CourseInfoItem>
                  <CourseInfoItem title="辅导目的">{job.jobGoal}</CourseInfoItem>
                </View>
              );
              else if(job.jobType == "companyCourse") return (
                <View className='details-infocard details-vertical-flexbox'>
                  <View className='details-big-title-course'>课程详情</View>
                  <CourseInfoItem title="上课时长">{job.workDuration}</CourseInfoItem>
                  <CourseInfoItem title="老师要求">
                    {job.requirements}
                  </CourseInfoItem>
                  <CourseInfoItem title="岗位要求">{job.jobDescription}</CourseInfoItem>
                  <CourseInfoItem title="招聘人数">{job.hiringNeed}</CourseInfoItem>
                </View>
              );
              else if(job.jobType == "other") return (
                <View className='details-infocard details-vertical-flexbox'>
                  <View className='details-big-title-course'>工作详情</View>
                  <CourseInfoItem title="工作时间">{job.workDuration}</CourseInfoItem>
                  <CourseInfoItem title="岗位内容/要求">
                    {job.requirements}
                  </CourseInfoItem>
                  <CourseInfoItem title="招聘人数">{job.hiringNeed}</CourseInfoItem>
                </View>
              );
            })()
          }
        </View>
      </View>
    )
  }
}
