import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import "./index.scss";

export default function MySwiper(props) {
  const { banner } = props;
  
  return (
    <Swiper
      className="test-h"
      indicatorColor="#999"
      indicatorActiveColor="#333"
      circular
      indicatorDots
      autoplay
    >
      {banner.map((item, index) => {
        return (
          <SwiperItem key={index}>
            <Image className="swiper-img" mode="widthFix" src={item}></Image>
          </SwiperItem>
        );
      })}
    </Swiper>
  );
}
