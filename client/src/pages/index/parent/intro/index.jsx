import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text, Button } from "@tarojs/components";
import topicImg from "../../../../images/parentIntro2.png";

import "./index.scss";

const handleClick = () => {
  Taro.navigateTo({
    url: "../submitInfo/index"
  });
};

export default function Intro() {
  const citysArr = ["深圳", "广州", "佛山", "珠海", "东莞", "其它"];
  const citys = citysArr.map(item => {
    return <View className="city">{item}</View>;
  });

  return (
    <View className="intro-wrapper">
      <View className="header">
        <Image className="header-image" mode="widthFix" src="cloud://tutor-ghszz.7475-tutor-ghszz-1303852457/images/parent_intro.png"/>
      </View>
      <View className="body">
        <Image className="topicImg" src={topicImg} mode="heightFix" />
        <View className="intro-text">
          大学生荔教由多所211/985高校师生共同创办，入选2020年广东省青创100企业。提供幼小初高中个性化上门家教辅导，为孩子匹配最适合的家教老师，首创一课一结的模式。
        </View>
        <View className="cityList">{citys}</View>
        <View className="priceBox">
          <View className="box">
            <View className="text-wrapper">
              <View>幼儿园：40-60元/h</View>
              <View>小学：60-90元/h</View>
              <View>初中：70-120元/h</View>
              <View>高中：90-150元/h</View>
            </View>
          </View>

          <View className="box">
            <View className="text-wrapper">
              <View>美术：70-120元/h</View>
              <View>音乐：70-130元/h</View>
              <View>体育：65-100元/h</View>
            </View>
          </View>
        </View>
        <View className="online-class">远程辅导(网课) 价格可减少20元/h</View>
        <Button onClick={handleClick}>立即预约免费试课</Button>
        <View className="footer-txt">
          课时费按照城市、学生年级、对老师要求、距离有所调整，试课1小时内免费，不满意可随时更换老师或取消
        </View>
      </View>
    </View>
  );
}
