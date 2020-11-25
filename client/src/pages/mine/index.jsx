import React, { Component } from "react";
import Taro,{ getCurrentInstance } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import {
  AtModal,
  AtModalHeader,
  AtModalAction,
  AtInput,
} from "taro-ui";
import "./index.scss";

import icon_phone from "../../images/mine/icon_phone.png";
import icon_not_vip from "../../images/mine/icon_not_vip.png";
import banner_become_vip from "../../images/mine/banner_become_vip.png";
import btn_favorites from "../../images/mine/btn_favorites.png";
import btn_post from "../../images/mine/btn_post.png";
import btn_about from "../../images/mine/btn_about.png";
import btn_support from "../../images/mine/btn_support.png";
import btn_feedback from "../../images/mine/btn_feedback.png";
import btn_certificate from "../../images/mine/btn_certificate.png";
import img_subscribe_account from "../../images/mine/img_subscribe_account.png";

import UserInfo from "../../utils/userinfo";

export default class Index extends Component {
  constructor(props) {
    super(props);
    Taro.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#FC4442",
    });

    // Login
    let userInfo = UserInfo.getUserInfo(); // 自己的 utils，用来处理用户信息相关
    this.state = {
      phoneModal: false,
      phoneInput: "",
      userInfo: userInfo ? userInfo : { avatarUrl: "", nickName: "" },
      isLoggedIn: UserInfo.isLoggedIn(),
      isVip: false,
      phoneShown: "正在加载个人信息",
      phone: "",
      isAdmin: false
    };

    this.getUserDetailsProcess();
  }

  componentDidMount(){
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
  async onShareTimeline () {
    let data = await this.getPath()
    return {
      query: data.query
    }  
  }


  onUserInfo(res) {
    if (!res.detail.userInfo) return;
    UserInfo.setUserInfo(res.detail.userInfo); // 自己的 utils，用来处理用户信息相关
    this.setState({ userInfo: res.detail.userInfo, isLoggedIn: true });
    console.log(res);
    this.getUserDetailsProcess();
    Taro.login({
      success: (res)=>{
        console.log("登录成功！！");
      }
    })
  }

  getUserDetailsProcess() {
    if (!this.state.isLoggedIn) return;
    UserInfo.getUserDetails().then((details) => {
      console.log("userDetails:", details);
      if (!details) return;
      this.setState({
        isVip: details.isVip,
        phone: details.phone || "",
        phoneShown: details.phoneShown || "空",
        isAdmin: details.isAdmin || false
      });
    });
  }

  setPhoneNumber() {
    this.setState({
      phoneModal: true
    })
  }
  
  phoneChange(e){
    this.setState({
      phoneInput: e
    })
    return e
  }

  confirmPhone(){
    this.setState({
      phoneModal: false,
      phone: this.state.phoneInput,
      phoneInput: ''
    })
    Taro.cloud.callFunction({
      name: 'setPhoneNumber',
      data:{
        phone: this.state.phone
      }
    })
  }

  cancelPhone(){
    this.setState({
      phoneModal: false,
      phoneInput: ''
    })
  }

  getPhoneNumber(e){
    //  需要认证之后使用这一个 获得 手机号码
    //  里面有一个 cloudid 字段 传给云函数 让它保存
    console.log('====================================');
    console.log(e);
    console.log('====================================');
  }

  render() {
    let getPhone = (
      <AtModal isOpened={this.state.phoneModal}>
        <AtModalHeader>请输入手机号码</AtModalHeader>
        <AtInput
          title="手机号码"
          type="phone"
          placeholder="手机号码"
          value={this.state.phoneInput}
          onChange={this.phoneChange.bind(this)}
        />
        <AtModalAction>
          <Button onClick={this.cancelPhone.bind(this)} >取消</Button> <Button onClick={this.confirmPhone.bind(this)} >确定</Button>
        </AtModalAction>
      </AtModal>
    );
    let pageJump = (page) => {
      return () => {
      if(!this.state.isVip && page ==="certificate" ){
        Taro.showToast({
          title: "请注册会员后使用该功能！",
          icon: "none",
          duration: 2000
        })
        return;
      }
        Taro.navigateTo({ url: page + "/index" });
      };
    };
    let tabJump = () => {
      return () => {
        Taro.switchTab({ url: "/pages/index/index" });
      };
    };
    let hidePhoneDigits = (phone) => { // 13577778888 -> 135****8888
      if(phone == "") return "";
      return phone.substr(0,3) + "****" + phone.substr(phone.length-4,4);
    }
    return (
      <View className="index">
        <View
          className="userinfo"
          style={`display: ${this.state.isLoggedIn ? "flex" : "none"};`}
        >
          {/* 头像 */}
          <Image
            className="userinfo-avatar"
            mode="cover"
            src={this.state.userInfo.avatarUrl}
          />
          {/* 用户信息 */}
          <View className="userinfo-texts">
            {/* 用户名 */}
            <Text className="userinfo-nickname">
              {this.state.userInfo.nickName}
            </Text>
            {/* 用户名下面的VIP图标和手机号 */}
            <View style="display: flex;flex-direction: row;align-items: center;">
            { this.state.isVip && <Image
                className={`userinfo-icon-vip`}
                src={this.state.isVip ? icon_not_vip : icon_not_vip}
              />}
              <Image className="userinfo-icon-phone" src={icon_phone} />
              { hidePhoneDigits(this.state.phone) }
              {/* <Text className="userinfo-phone">{this.state.phoneShown}</Text> */}
              {
                this.state.phone===""? 
                <Button
                size="mini"
                type="default"
                // openType="getPhoneNumber"
                // onGetPhoneNumber={this.getPhoneNumber.bind(this)}
                onClick={this.setPhoneNumber.bind(this)}
              >
                获取手机号
              </Button>: 
              <Button
                size="mini"
                type="default"
                // openType="getPhoneNumber"
                // onGetPhoneNumber={this.getPhoneNumber.bind(this)}
                onClick={this.setPhoneNumber.bind(this)}
              >
                修改手机号
              </Button>
              }
              {getPhone}
            </View>
          </View>
        </View>
        <View
          className="userinfo"
          style={`display: ${!this.state.isLoggedIn ? "block" : "none"};`}
        >
          <Button
            className="btn-get-user-info"
            open-type="getUserInfo"
            onGetUserInfo={(res) => {
              this.onUserInfo(res);
            }}
          >
            点击授权用户信息
          </Button>
        </View>

        <View className="become-vip-container">
          <image
            className="banner-become-vip"
            src={banner_become_vip}
            onClick={pageJump("activate_vip")}
          />
          <image
            className="img-subscribe-gzh"
            src={img_subscribe_account}
            mode="widthFix"
            onClick={pageJump("official_acounts")}
          />
        </View>

        <View className="buttons-container">
          <View className="buttons-row">
            <BigButton img={btn_favorites} onClick={pageJump("favorite")}>
              我的收藏
            </BigButton>
            <BigButton img={btn_post} onClick={tabJump()}>
              发布兼职/家教
            </BigButton>
            <BigButton img={btn_about} onClick={pageJump("about_us")}>
              关于我们
            </BigButton>
          </View>
          <View className="buttons-row">
            <MagicBigButton open-type="contact" img={btn_support}>
              联系客服
            </MagicBigButton>
            <MagicBigButton open-type="feedback" img={btn_feedback}>
              意见反馈
            </MagicBigButton>
            {/* 暂时修改成 certificate */}
            <BigButton img={btn_certificate} onClick={pageJump("certificate")}>
              实习证明
            </BigButton>
          </View>
        </View>
        
      { this.state.isAdmin &&  <Button onClick={pageJump("adminCheckCommission")} >查看用户佣金信息 </Button>}
      { this.state.isAdmin &&  <Button onClick={pageJump("adminCheckOrder")} >查看未上架订单信息 </Button>}
       
        <official-account></official-account>
      </View>
    );
  }
}

class BigButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View class="bigbutton" onClick={this.props.onClick}>
        <image class="bigbutton-img" src={this.props.img} />
        <text class="bigbutton-text">{this.props.children}</text>
      </View>
    );
  }
}

class MagicBigButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className="bigbutton" onClick={this.props.onClick}>
        {/* here's a hack to trigger wechat functionality */}
        <button
          className="bigbutton-magic-native-button"
          open-type={this.props["open-type"]}
        ></button>
        <image className="bigbutton-img" src={this.props.img} />
        <text className="bigbutton-text">{this.props.children}</text>
      </View>
    );
  }
}
