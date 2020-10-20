import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";
import { AtRate, AtIcon } from "taro-ui"

import icon_share from "../../images/share.png"

export default class ArticleCard extends Component {
  render() {
    return (
      <View className="article-container">
        <Image className="article-img" src={this.props.imgSrc} />
        <View className="article-details">
        <View className="article-title">{this.props.title}</View>
        <View className="article-desc">{this.props.desc}</View>
        <AtRate className="article-rate" margin={6} size={12} max={5} value={this.props.rating}></AtRate>
        <View className="btn-share" onClick={(e)=>{
          // TODO: 分享功能
        }}>
          <Image className="btn-share-img" src={icon_share} />
          分享
        </View>
        </View>
      </View>
    );
  }
}
