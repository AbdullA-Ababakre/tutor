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
        <View className={job.requireVip!=="false"?"order-icon-noviponly":"order-icon-viponly"}>{job.requireVip=="false"? "非会员":"会员"}</View>
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
        { job.showLabel?
          <View className="order-top-margin order-flexbox order-flexbox-space-between">
            <View className="order-label"> 可线上 </View>
            <FavButton className="order-fav"  enable={enable} />
          </View>: 
          <FavButton style="float: right"  enable={enable} />
        }

        {/* <Text style="font-weight:500; font-size:10px;float: right" >
           {job.top?"置顶":"不置顶"}
        </Text> */}
        </View>
      </View>
    );
  }
}
