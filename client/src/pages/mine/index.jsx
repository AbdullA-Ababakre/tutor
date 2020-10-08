import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

import icon_phone from "../../images/mine/icon_phone.png"
import icon_not_vip from "../../images/mine/icon_not_vip.png"
import banner_become_vip from "../../images/mine/banner_become_vip.png"
import btn_favorites from "../../images/mine/btn_favorites.png"
import btn_post from "../../images/mine/btn_post.png"
import btn_about from "../../images/mine/btn_about.png"
import btn_support from "../../images/mine/btn_support.png"
import btn_feedback from "../../images/mine/btn_feedback.png"
import btn_certificate from "../../images/mine/btn_certificate.png"

export default class Index extends Component {
  constructor(props) {
    super(props)
    Taro.setNavigationBarColor({frontColor: '#ffffff',backgroundColor: '#FC4442'});
  }

  render () {
    let logged_in = false;
    return (
      <View className='index'>
        <View className='userinfo'>
          {/* 头像 */}
          <Image className="userinfo-avatar" mode="cover"/>
          {/* 用户信息 */}
          <View className='userinfo-texts'>
            {/* 用户名 */}
            <Text id='userinfo-nickname'>小荔同学</Text>
            {/* 用户名下面的VIP图标和手机号 */}
            <View style='display: flex;flex-direction: row;align-items: center;'>
              <Image id='userinfo-icon-vip' src={icon_not_vip}/>
              <Image id='userinfo-icon-phone' src={icon_phone}/>
              <Text id='userinfo-phone'>暂无手机号</Text>
            </View>

          </View>
        </View>

        <View className='become-vip-container'>
          <image id="banner-become-vip" src={banner_become_vip}/>
          <text id="text-subscribe-gzh">关注“大学生荔教”公众号</text>
        </View>

        <View className='buttons-container'>
          <View className='buttons-row'>
            <BigButton img={btn_favorites}>我的收藏</BigButton>
            <BigButton img={btn_post}>发布兼职/家教</BigButton>
            <BigButton img={btn_about} onClick={()=>{Taro.navigateTo({url: "about_us/index"});}}>关于我们</BigButton>
          </View>
          <View className='buttons-row'>
            <MagicBigButton open-type="contact" img={btn_support}>联系客服</MagicBigButton>
            <MagicBigButton open-type="feedback" img={btn_feedback}>意见反馈</MagicBigButton> 
            <BigButton img={btn_certificate}>实习证明</BigButton>
          </View>
        </View>
      </View>
    )
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
    )
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
        <button className="bigbutton-magic-native-button" open-type={this.props["open-type"]}></button>
        <image className="bigbutton-img" src={this.props.img} />
        <text className="bigbutton-text">{this.props.children}</text>
      </View>
    )
  }
}