import React, { Component } from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import { View, Text, Image,Button } from '@tarojs/components'
import './index.scss'

import FavButton from "../../../components/FavButton"
import OrderDetailRightPanel from "../../../components/OrderDetailRightPanel"
import ModalDiag from "../../../components/ModalDiag"
import Wxml2Canvas from "../../../components/Wxml2Canvas/index"

import icon_location from "../../../images/order/details_location.png";
import icon_time from "../../../images/order/details_time.png";


class CourseInfoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View onClick={this.props.onClick} className='details-jobinfo-container'>
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
      isAdmin: false,
      openShare: false,
      path: '',
      data: this.props,
      userVip: false,
      showDiag: false,
      _id : "",
      enable: false,
      familyCourse: {
        _openid : '',
        jobType: "",
        jobTask: "",
        jobPrice: "",
        location: "",
        workTime: "",
        isVip: "false",
        workDuration: "",
        requirements: "",
        requirementLabels: [],
        studentDescription: "",
        jobGoal: "",
        tutorType: "",
        teachingTimeTag: "",
        favourList: [],
        tel: "",
        isLoseEfficacy: false,
        isOnline: false,
        top: false
      },
      companyCourse: {
        _openid : '',
        jobType: "",
        jobTask: "",
        jobPrice: "",
        location: "",
        workTime: "",
        isVip: "false",
        workDuration: "",
        requirements: "",
        tel: "",

        jobDescription: "",
        hiringNeed: "",
        tutorType: "",
        teachingTimeTag: "",
        favourList: [],
        isLoseEfficacy: false,
        isOnline: false,
        top: false
      },
      other: {
        _openid : '',
        jobType: "",
        jobTask: "",
        jobPrice: "",
        isVip: "false",
        location: "",
        tel: "",

        cooperation: "",
        workDuration: "",
        requirements: "",
        hiringNeed: '',
        favourList: [],
        isLoseEfficacy: false,
        isOnline: false,
        top: false
      }
    };
  }
   
  
  componentDidMount(){
    //  路由传值到这里来了
    //  传来了两个值 一个是 jobType  一个是 id 其实是_id 为了查记录
    // console.log(getCurrentInstance().router.params)
    this.setState({
      path: `pages/order/details/index?jobType=${getCurrentInstance().router.params.jobType}&id=${getCurrentInstance().router.params.id}`
    })
    this.getUserData()
    switch(getCurrentInstance().router.params.jobType){
      case "familyCourse": this.getParentData();  break;
      case "companyCourse": this.getOrganizationData();break;
      case "other": this.getOtherData(); break;
    }
    this.setShareOpenId()
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
  //  这里测试的时候有点奇怪的问题 等上线的时候我再看一看吧
  // async onShareTimeline () {
  //   let data = await this.getPath()
  //   console.log(data.query)
  //   return {
  //     query: data.query
  //   }  
  // }

  getData(type,id){
    return new Promise((resolve, reject)=>{
      Taro.showLoading({
        title: "加载中"
      })
      Taro.cloud.callFunction({
        name: 'getData',
        data: {
          getType: type,
          id: id
        }
      })
      .then(res=>{
        Taro.hideLoading()
        resolve(res)
      })
      .catch(err=>{
        reject(err)
      })
    })
  }

  getParentData(){
    this.getData("parent",  getCurrentInstance().router.params.id)
        .then(res=>{
          // console.log(res)
          let data = res.result.data.data
          let familyCourse ={
            _openid : data._openid,
            jobType: data.detailType,
            jobTask: `${data.gradeChecked} ${data.tutorSubject.join(" ")} 辅导 `,
            jobPrice: data.salarySelectorChecked+ "/小时",
            location: data.addressSelectorChecked + data.exactAddress,
            workTime: `${data.teachingDay.join(" | ")} ${data.teachingTime} `,
            isVip: data.isVip,
            workDuration: "一次上课" + data.tutorDuration,
            requirements: `性别: ${data.teacherGenderChecked} | ${data.teacherRequireText}`,
            requirementLabels: data.teacherRequirementTag,
            studentDescription: data.studentInfo,
            jobGoal: data.tutorGoal.join(" | "),
            tutorType: data.tutorType,
            teachingTimeTag: data.teachingTimeTag,
            favourList: data.favourList,
            tel: data.tel,
            isLoseEfficacy: data.isLoseEfficacy,
            isOnline: data.isOnline,
            top: data.top
          }
          this.setState({
            familyCourse: familyCourse,
            enable: familyCourse.favourList.indexOf(familyCourse._openid)!==-1,
            _id: data._id
          })
        })
  }

  getOrganizationData(){
    this.getData("organization",  getCurrentInstance().router.params.id)
            .then(res=>{
              let data = res.result.data.data
              console.log(res)
              let companyCourse = {
                _openid : data._openid,
                jobType: "companyCourse",
                jobTask: `${data.gradeChecked} ${data.tutorSubject.join(" ")}`,
                jobPrice: `${data.salarySelectorChecked}/小时`,
                location: `${data.addressSelectorChecked} ${data.exactAddress}`,
                workTime: `${data.teachingDay.join(" | ")} ${data.teachingTime}`,
                isVip: data.isVip,
                workDuration: `一次上课${data.tutorDuration}`,
                requirements: data.teacherRequireText,
                jobDescription: data.positionInfo,
                hiringNeed: data.recruitNum,
                tutorType: data.tutorType,
                teachingTimeTag: data.teachingTimeTag,
                favourList: data.favourList,
                tel: data.tel,
                isLoseEfficacy: data.isLoseEfficacy,
                isOnline: data.isOnline,
                top: data.top
              }
              this.setState({
                companyCourse: companyCourse,
                enable: companyCourse.favourList.indexOf(companyCourse._openid)!==-1,
                _id: data._id
              })
            })

  }

  getOtherData(){
    this.getData("other",  getCurrentInstance().router.params.id)
        .then(res=>{
          let data = res.result.data.data
          let other ={
            _openid : data._openid,
            jobType: "other",
            jobTask: data.positionName,
            jobPrice: data.positionSalary,
            isVip: data.isVip,
            location: data.positionAddress,
            cooperation: data.organizationNmae,
            workDuration: data.workingTime,
            requirements: data.positionInfo,
            hiringNeed: data.recruitNum,
            favourList: data.favourList,
            tel: data.tel,
            isLoseEfficacy: data.isLoseEfficacy,
            isOnline: data.isOnline,
            top: data.top
          }
          this.setState({
            other: other,
            enable: other.favourList.indexOf(other._openid)!==-1,
            _id: data._id
          })
        })
  }

  changeFav(){
    let getType =""
    switch(getCurrentInstance().router.params.jobType){
      case "familyCourse": getType="parent"; break;
      case "companyCourse":getType="organization"; break;
      case "other":getType="other"; break;
    }
    let data = this.state[getCurrentInstance().router.params.jobType]

    if(this.state.enable){
      let index = data.favourList.indexOf(data._openid)
      data.favourList.splice(index, 1)
    }else{
      data.favourList.push(data._openid)
    }
    Taro.cloud.callFunction({
      name: 'setFavData',
      data: {
        getType: getType,
        _id: this.state._id,
        favourList: data.favourList
      }
    })

    this.setState({
      enable: !this.state.enable
    })
  }

  getUserData(){
    Taro.cloud.callFunction({
      name: 'getUserDetails'
    })
    .then(res=>{
      this.setState({
        userVip: res.result.isVip,
        isAdmin: res.result.isAdmin
      })
    })
  }

  getDiagData(diagStatus){
    this.setState({
      showDiag: diagStatus
    })
  }

  goHired(){

    if(this.state.userVip){
      this.setState({
        showDiag: true
      })
    }else{
      if(this.state[getCurrentInstance().router.params.jobType].isVip==="false"){
        this.setState({
          showDiag: true
        })
      }else{
        Taro.redirectTo({
          url: "/pages/mine/activate_vip/index"
        })
      }
    }
  }

  openSharePic(){
    this.setState({
      openShare: true
    })
  }

  closeShare(){
    this.setState({
      openShare: false
    })
  }

  pastePhone(tel){
    Taro.setClipboardData({
      data: tel,
      success (res) {
        Taro.showToast({
          title: '复制手机号成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }

  openAdminBoard(){
    const job = this.state[getCurrentInstance().router.params.jobType];
    let that = this
    wx.showActionSheet({
      itemList: [`${!job.isLoseEfficacy?"订单已被领走":"订单未被领走"}`,`${job.top?"不置顶":"置顶"}`, `${!job.isOnline?"订单上线":"订单下线"}`],
      success (res) {
        console.log(res.tapIndex)
        switch(res.tapIndex){
          case 0: job.isLoseEfficacy = !job.isLoseEfficacy; break;
          case 1: job.top = !job.top; break;
          case 2: job.isOnline = !job.isOnline; break;
        }
        Taro.showLoading({
          title: "加载中"
        })
        Taro.cloud.callFunction({
          name: "adminOrderAction",
          data: {
            jobType: job.jobType,
            _id: that.state._id,
            isLoseEfficacy: job.isLoseEfficacy,
            top: job.top,
            isOnline: job.isOnline
          }
        })
        Taro.hideLoading()
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  }

  render () {
    const job = this.state[getCurrentInstance().router.params.jobType] || this.state["other"];
    // console.log()
    if(job.jobType==="familyCourse") {
      Taro.setNavigationBarTitle({title: "家庭教师"}) 
    }
    if(job.jobType==="companyCourse") {Taro.setNavigationBarTitle({title: "机构/企业教师"}) }
    if(job.jobType==="other") {Taro.setNavigationBarTitle({title: "其他岗位"})}
    if(this.state.userVip)  Taro.setNavigationBarColor({frontColor: "#000000",backgroundColor: "#ffc63b"}) 
    
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
         <View className='details-label-grey'>{job.teachingTimeTag}</View>
        <FavButton enable={this.state.enable} onClick={this.changeFav.bind(this)} style='float: right;'/>
      </View>
    )
    // 老师要求 或 岗位内容/要求 下面的灰色标签
    let requirementLabelsView =  job.jobType=="familyCourse"? job.requirementLabels.length>0? job.requirementLabels.map((v,i)=>{
      return (<View className='details-label-grey'>{v}</View>);
    }):"":""
    console.log(job.requirementLabels>0)

    return (
      <View className="details-box" >

       {this.state.openShare && <Wxml2Canvas details={job} path={this.state.path} closeShare={this.closeShare.bind(this)} />}

        {
          this.state.showDiag? <ModalDiag postDiagData={this.getDiagData.bind(this)} />:""
        }
        <View className='details-index'>
          <OrderDetailRightPanel openSharePic={this.openSharePic.bind(this)}  className="right_panel" />
          { 
            this.state.userVip===false?<View className='bg-red-block'/>:<View className='bg-yellow-block'/>
          }
          <View className='details-container'>
            <View className='details-infocard'>
            <Text className='details-title'>{job.jobTask}</Text>
            <Text className='details-title-price'>{job.jobPrice}</Text>
              {(()=>{
                if(job.jobType === "familyCourse" || job.jobType==="companyCourse") return (
                  <View>
                    <View style='details-label-container'>
                      <View className='details-label'><View class="details-label-text">{job.tutorType}</View></View>
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
                    <FavButton enable={this.state.enable} onClick={this.changeFav.bind(this)} style='position: relative; left: 85%'/>
                  </View>
                );
              })()}
            </View>
            {/* vip 卡片 或打开管理员操作面板 */}
            {
             this.state.isAdmin?<Button type="primary" onClick={this.openAdminBoard.bind(this)} >打开管理员操作面板</Button>:!this.state.userVip?vipCard:""
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
                    { this.state.isAdmin && <CourseInfoItem  onClick={this.pastePhone.bind(this, job.tel)} title="手机号码（点击即可自动复制）">{job.tel}</CourseInfoItem>}
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
                    { this.state.isAdmin && <CourseInfoItem  onClick={this.pastePhone.bind(this, job.tel)} title="手机号码（点击即可自动复制）">{job.tel}</CourseInfoItem>}
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
                    { this.state.isAdmin && <CourseInfoItem onClick={this.pastePhone.bind(this, job.tel)} title="手机号码（点击即可自动复制）">{job.tel}</CourseInfoItem>}
                  </View>
                );
              })()
            }
          </View>
          <Button onClick={this.goHired.bind(this)} className={this.state.userVip?"btn-yellow":"btn-red" }>
            前往应聘
          </Button>
        </View>
      </View>

    )
  }
}
