import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";

export default class ArticleSmallCard extends Component {
  render() {
    return (
      <View className={"article-small-container "+(this.props.className||"")} >
        <Image className="article-small-img" src={this.props.imgSrc} />
        <View className="article-small-details">
          <View className="article-small-title">
          <View className="article-green-line"/>
          {this.props.title}
          </View>
          <View className="article-small-author">{this.props.author}</View>
          <View className="article-small-price">
            <View className={"article-small-free-for-vip"+(this.props.freeForVip?" ":" invisible")}>会员免费</View>
            ¥ {this.props.price}
          </View>
        </View>
      </View>
    );
  }
}
