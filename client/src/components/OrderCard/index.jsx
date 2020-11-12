import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";

import icon_share from "../../images/share.png"
import FavButton from "../FavButton";

export default class ArticleCard extends Component {
  render() {
    let job = this.props;
    let enable = job.favourList.indexOf(job._openid)!==-1
    return (
      <View onClick={job.onClick} className="order-card-container">
        <View className="order-icon-viponly">{job.requireVip=="false"? "非会员":"会员"}</View>
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
        <View className="order-top-margin order-flexbox order-flexbox-space-between">
        <View className="order-label">{job.jobType}</View>
          <FavButton  enable={enable} />
        </View>
        </View>
      </View>
    );
  }
}
