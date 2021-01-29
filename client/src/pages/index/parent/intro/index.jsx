import React, { Component, useState } from "react";
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
  const [seleceIndex, changeSelectIndex] = useState(1)

  const citysArr = ["深圳", "广州", "佛山", "珠海", "东莞", "其它"];
  const citys = citysArr.map((item, index) => {
    return <View onClick={changeSelectIndex.bind(this, index)} className={`city ${seleceIndex === index ?"city-select":""}`}>{item}</View>;
  });

  return (
    <View className="intro-wrapper">
      <View className="header">
        <Image className="header-image" mode="widthFix" src="cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/index_parent_intr.png"/>
      </View>
      <View className="body">
        <View className="cityList">{citys}</View>
        <View className="priceBox">
          <View className="box">
            <View className="text-wrapper">
              <View>幼儿园：60-80元/h</View>
              <View>小学：  80-110元/h</View>
              <View>初中：  90-140元/h</View>
              <View>高中：  110-170元/h</View>
            </View>
          </View>

          <View className="box">
            <View className="text-wrapper">
              <View>美术：90-140元/h</View>
              <View>音乐：90-150元/h</View>
              <View>体育：85-120元/h</View>
            </View>
          </View>
        </View>
        <View className="online-class">远程辅导(网课) 价格可减少20元/h</View>
        <Button className="order-btn btn-shadow-all" onClick={handleClick}>立即预约免费试课</Button>
        <View className="footer-txt">
          课时费按照城市、学生年级、对老师要求、距离有所调整，试课1小时内免费，不满意可随时更换老师或取消
        </View>
      </View>
    </View>
  );
}
