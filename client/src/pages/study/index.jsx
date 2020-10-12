import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import "./index.scss";
import MySwiper from "../../components/MySwiper";
import ArticleCard from "../../components/ArticleCard"

import pageswitch_redbar from "../../images/pageswitch_redbar.png"

export default class Index extends Component {
  constructor(props) {
    super(props);
    Taro.setBackgroundColor({backgroundColor: "#F7F7F7"});
    this.state = {
      pageswitch_selected: 1,
    }
  }
  
  switchPage(page) {
    this.setState({
      pageswitch_selected: page,
    })
  }

  render() {
    const picSrc =
      "https://7475-tutor-ghszz-1303852457.tcb.qcloud.la/study/swiper/parentIntro1.png?sign=faffc4fbb9150decc9f0d47221e98f90&t=1602334857";

    const banner = [picSrc, picSrc, picSrc];

    let pageswitch_selected = this.state.pageswitch_selected;

    return (
      <View className="index">
        <MySwiper className="swiper" banner={banner} />
        {/* 页面切换器 */}
        <View className="page-switch" mode="heightFix">
          <View className="page-switch-option-container">
            <View className={`${pageswitch_selected==1?"page-switch-selected":"page-switch-option"}`} onClick={()=>{this.switchPage(1)}}>
              教学提升
              <Image className={`page-switch-redbar ${pageswitch_selected==1?"":"invisible"}`} mode="widthFix" src={pageswitch_redbar} />
            </View>
            <View className={`${pageswitch_selected==2?"page-switch-selected":"page-switch-option"}`} onClick={()=>{this.switchPage(2)}}>
              成长学院
              <Image className={`page-switch-redbar ${pageswitch_selected==2?"":"invisible"}`} mode="widthFix" src={pageswitch_redbar} />
            </View>
          </View>
        </View>
        {(()=>{
          if(pageswitch_selected == 1) { // 教学提升
            return (
              <View className="article-container">
                【教学提升页面】
              </View>
            )
          }
          else if(pageswitch_selected == 2) { // 成长学院
            return (
              <View className="article-container">
              <ArticleCard title="家教、兼职老师简历指南长标题占位" desc="这篇我们教大家如何的写自己人生的第一份简历超长测试超长测试超长测试超长测试" rating="2" imgSrc={picSrc} />
              <ArticleCard title="微信小程序前端开发" desc="这是第二个页面测试，展示文本没有超长的情况。" rating="4" imgSrc="cloud://tutor-ghszz.7475-tutor-ghszz-1303852457/study/study_test.png" />
            </View>
            )
          }
        })()}
      </View>
    );

  }
}
