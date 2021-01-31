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
    @requireVip: true/false  是否Vip
    */

    this.state = {
      showDetail: false,
      isAdmin: false,
      openShare: false,
      path: '',
      data: this.props,
      userVip: false,
      showDiag: false,
      _id : "",
      openid: "",
      clickNum: 0,
      enable: false,
      familyCourse: {
        _openid : '',
        jobType: "",
        jobTask: "",
        jobPrice: "",
        location: "",
        workTime: "",
        requireVip: "false",
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
        top: false,
        ownerNumber: ''
      },
      companyCourse: {
        _openid : '',
        jobType: "",
        jobTask: "",
        jobPrice: "",
        location: "",
        workTime: "",
        requireVip: "false",
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
        top: false,
        ownerNumber: ''
      },
      other: {
        _openid : '',
        jobType: "",
        jobTask: "",
        jobPrice: "",
        requireVip: "false",
        location: "",
        tel: "",

        cooperation: "",
        workDuration: "",
        requirements: "",
        hiringNeed: '',
        favourList: [],
        isLoseEfficacy: false,
        isOnline: false,
        top: false,
        ownerNumber: ''
      }
    };
  }
  
  async componentWillMount(){
    //  路由传值到这里来了
    //  传来了两个值 一个是 jobType  一个是 id 其实是_id 为了查记录
    // console.log(getCurrentInstance().router.params)

    try {

      this.setState({
        userVip: Taro.getStorageSync("isVip"),
        openid: Taro.getStorageSync("openid"),
      })

      //  这里迷惑性很强 拿不到 数据？？？
      let isAdmin = Taro.getStorageSync("isAdmin")
      if(isAdmin===""){
        this.getUserData()
      }else{
        this.setState({
          isAdmin: isAdmin
        })
      }
    } catch (error) {
      this.getUserData()
    }
    switch(getCurrentInstance().router.params.jobType){
      case "familyCourse": this.getParentData();  break;
      case "companyCourse": this.getOrganizationData();break;
      case "other": this.getOtherData(); break;
    }
    let data = await this.getPath()
   
    setTimeout(()=>{
      this.setState({
        path: data.path,
        showDetail: true
      })
    }, 200)
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
  
  //  获得分享路径
  getPath(){
    try {
      return new Promise(resolve=>{
        Taro.showLoading({
          title:"加载中"
        })
        console.log(getCurrentInstance());
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
    } catch (error) {
     console.log(error) 
    }
    
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

  //  封装一个 获得数据的函数
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
        Taro.setStorageSync("enable", res.result.data.data.favourList.indexOf(this.state.openid)!==-1)
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
          console.log("parent", res)
          let data = res.result.data.data
          let familyCourse ={
            _openid : data._openid,
            jobType: data.detailType,
            jobTask: `${data.gradeChecked} ${data.tutorSubject.join(" ")} 辅导 `,
            jobPrice: data.salarySelectorChecked+ "/小时",
            location: data.addressSelectorChecked + data.exactAddress,
            workTime: `${data.teachingDay.join(" | ")} ${data.teachingTime} `,
            requireVip: data.requireVip,
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
            top: data.top,
            ownerNumber: data.ownerNumber || ''
          }
          this.setState({
            familyCourse: familyCourse,
            enable: familyCourse.favourList.indexOf(this.state.openid)!==-1,
            _id: data._id
          })
        })
  }

  getOrganizationData(){
    this.getData("organization",  getCurrentInstance().router.params.id)
            .then(res=>{
              let data = res.result.data.data
              console.log("organization", res)
              let companyCourse = {
                _openid : data._openid,
                jobType: "companyCourse",
                jobTask: `${data.gradeChecked} ${data.tutorSubject.join(" ")}`,
                jobPrice: `${data.salarySelectorChecked}/小时`,
                location: `${data.addressSelectorChecked} ${data.exactAddress}`,
                workTime: `${data.teachingDay.join(" | ")} ${data.teachingTime}`,
                requireVip: data.requireVip,
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
                top: data.top,
                ownerNumber: data.ownerNumber || ''
              }
              this.setState({
                companyCourse: companyCourse,
                enable: companyCourse.favourList.indexOf(this.state.openid)!==-1,
                _id: data._id
              })
            })

  }

  getOtherData(){
    this.getData("other",  getCurrentInstance().router.params.id)
        .then(res=>{
          console.log("other",res);
          let data = res.result.data.data
          let other ={
            _openid : data._openid,
            jobType: "other",
            jobTask: data.positionName,
            jobPrice: data.positionSalary,
            requireVip: data.requireVip,
            location: data.positionAddress,
            cooperation: data.organizationNmae,
            workDuration: data.workingTime,
            requirements: data.positionInfo,
            hiringNeed: data.recruitNum,
            favourList: data.favourList,
            tel: data.tel,
            isLoseEfficacy: data.isLoseEfficacy,
            isOnline: data.isOnline,
            top: data.top,
            ownerNumber: data.ownerNumber || ''
          }
          this.setState({
            other: other,
            enable: other.favourList.indexOf(this.state.openid)!==-1,
            _id: data._id
          })
        })
  }

  // 改变收藏
  changeFav(){
    Taro.setStorageSync("enable", !this.state.enable)
    this.setState({
      enable: !this.state.enable,
      clickNum: this.state.clickNum+1
    },()=>{console.log(this.state.enable)})
    // 本来想最后再更新状态的，但异步难顶，外面的数据没有来的急更新
    let getType =""
    switch(getCurrentInstance().router.params.jobType){
      case "familyCourse": getType="parent"; break;
      case "companyCourse":getType="organization"; break;
      case "other":getType="other"; break;
    }
   Taro.cloud.callFunction({
      name: 'setFavData',
      data: {
        getType: getType,
        _id: this.state._id,
        enable: this.state.enable
      }
    }).then(res=>{
      console.log(res);
    })
  }

  getEnable(){
    return Taro.getStorageSync("enable")
  }

  // 获得 用户的数据（为了vip字段）
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

  //  去应聘
  goHired(){
    if(this.state.userVip){
      this.setState({
        showDiag: true
      })
    }else{
      if(this.state[getCurrentInstance().router.params.jobType].requireVip==="false"){
        this.setState({
          showDiag: true
        })
      }else{
        Taro.showToast({
          title: '这为会员单，请先成为会员！',
          duration: 2000,
          icon: "none"
        });
        setTimeout(()=>{
          Taro.redirectTo({
            url: "/pages/mine/activate_vip/index"
          })
        }, 1000)
       
      }
    }
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

  // 打开管理员控制面板
  openAdminBoard(){
    const job = this.state[getCurrentInstance().router.params.jobType];
    const itemList = [`${!job.isLoseEfficacy?"订单已被领走(删除订单)":"订单未被领走"}`,`${job.top?"不置顶":"置顶"}`, `${!job.isOnline?"订单上线":"订单下线"}`, `${job.requireVip==="true"?"变为非会员订单":"变为会员订单"}`, `该单变为我负责的`]
    let that = this
    let ownerNumber = Taro.getStorageSync("ownerNumber")
    wx.showActionSheet({
      itemList: itemList,
      success (res) {
        let index = res.tapIndex
        console.log(res.tapIndex)
        switch(res.tapIndex){
          case 0: job.isLoseEfficacy = !job.isLoseEfficacy; break;
          case 1: job.top = !job.top; break;
          case 2: job.isOnline = !job.isOnline; break;
          case 3: job.requireVip = job.requireVip==="true"?"false":"true"; break;
          case 4: job.ownerNumber = ownerNumber; break;
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
            isOnline: job.isOnline,
            requireVip: job.requireVip,
            ownerNumber: job.ownerNumber,
          }
        })
        .then(res=>{
          Taro.hideLoading()
          if(index==0)
            Taro.showToast({
              title: `${itemList[index]}`,
              icon: "none"
            })
          else
            Taro.showToast({
              title: `${itemList[index]}`,
            })
        })
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  }

  //  编辑订单信息
  editDetail(){
    let jobType = getCurrentInstance().router.params.jobType
    switch(jobType){
      case "familyCourse": Taro.redirectTo({url: `/pages/index/parent/submitInfo/index?_id=${this.state._id}`}); break;
      case "companyCourse": Taro.redirectTo({url: `/pages/index/organization/index?_id=${this.state._id}`}); break;
      case "other": Taro.redirectTo({url: `/pages/index/other/index?_id=${this.state._id}`}); break;
    }
  }

  render () {
    //  这里太恶心了啦 有空再整理这里把
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
        <FavButton enable={this.getEnable()} onClick={this.changeFav.bind(this)} style='float: right;'/>
      </View>
    )
    // 老师要求 或 岗位内容/要求 下面的灰色标签
    let requirementLabelsView =  job.jobType=="familyCourse"? job.requirementLabels.length>0? job.requirementLabels.map((v,i)=>{
      return (<View className='details-label-grey'>{v}</View>);
    }):"":""

    let adminBox = (
      <View className="admin-box" >
        <Button className="admin-box-button" onClick={this.openAdminBoard.bind(this)} >打开管理员操作面板</Button>
        <Button  className="admin-box-button" onClick={this.editDetail.bind(this)} >编辑该订单信息</Button>
      </View>
    )

    return (
      <View className="details-box" >
        {/* 分享图 */}
        {this.state.openShare && <Wxml2Canvas details={job} path={this.state.path} closeShare={this.closeShare.bind(this)} />}

        {/* 应聘联系图 */}
        {this.state.showDiag? <ModalDiag ownerNumber={job.ownerNumber} postDiagData={this.getDiagData.bind(this)} />:""}
        
        {/* 看到的details 页面在此 */}
        <View className={`details-index ${this.state.showDetail?"opacity-1":"opacity-0"}`}>
          {/* 右边的浮按钮 */}
          <OrderDetailRightPanel openSharePic={this.openSharePic.bind(this)}  className="right_panel" />
          
          {/* VIP换色 */}
          {this.state.userVip===false?<View className='bg-red-block'/>:<View className='bg-yellow-block'/>}
          
          <View className='details-container'>
            <View className='details-infocard'>
            <Text className='details-title'>{job.jobTask}</Text>
            <Text className='details-title-price'>{job.jobPrice}</Text>

            {/* 这里是头部的地址部分描述 */}
              {(()=>{
                if(job.jobType === "familyCourse" || job.jobType==="companyCourse") return (
                  <View>
                    <View className='details-label-container'>
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
            {this.state.isAdmin?adminBox:!this.state.userVip?vipCard:""}

            {/*  课程卡片 */}
            {(()=>{
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
              })()}
          </View>

          <Button onClick={this.goHired.bind(this)} className={`${this.state.userVip?"btn-yellow":"btn-red"} btn-go-hired` }>
            前往应聘
          </Button>
        </View>
      </View>

    )
  }
}
