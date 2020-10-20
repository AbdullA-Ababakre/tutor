import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";

import icon_share from "../../images/share.png"
import FavButton from "../FavButton";

export default class ArticleCard extends Component {
  render() {
    let job = this.props;
    return (
      <View className="order-container">
        <View className="order-icon-viponly">非会员</View>
        <View className="order-details">
        <View className="order-flexbox">
          <View className="order-title">{job.title}</View>
          <View className="order-yellow-line"/>
          <View className="order-id">单号{job.orderId}</View>
        </View>
        <View className="order-flexbox order-top-margin order-flexbox-space-between">
          <View className="order-desc">{job.location}</View>
          <View className="order-price">{job.price}</View>
        </View>
        <View className="order-horizontal-line"/>
        <View className="order-work-time">时间：{job.workTime}</View>
        <View className="order-label order-top-margin">家庭教师</View>
        <FavButton style="float: right;"/>
        </View>
      </View>
    );
  }
}
