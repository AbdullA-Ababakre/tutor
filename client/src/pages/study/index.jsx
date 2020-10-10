import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import "./index.scss";
import MySwiper from "../../components/MySwiper";

export default class Index extends Component {
  render() {
    const picSrc =
      "https://7475-tutor-ghszz-1303852457.tcb.qcloud.la/study/swiper/parentIntro1.png?sign=faffc4fbb9150decc9f0d47221e98f90&t=1602334857";

    const banner = [picSrc, picSrc, picSrc];

    return (
      <View className="wrapper">
        <MySwiper banner={banner} />
      </View>
    );
  }
}
