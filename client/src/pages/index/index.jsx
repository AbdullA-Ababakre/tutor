import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import "./index.scss";
import { AtButton } from 'taro-ui'

export default class Index extends Component {

  handleClick=(index)=> {
    console.log("index",index);
    switch (index) {
      case 1:
        Taro.navigateTo({
          url: `/pages/index/parent/intro/index`,
        });
        break;
      case 2:
        Taro.navigateTo({
          url: `/pages/index/organization/index`,
        })
        break;
      case 3:
        Taro.switchTab({
          url: `/pages/order/index`
        })
      default:
        return;
    }
  }

  render() {
    const btnArr = [
      {
        txt: "在线咨询",
        url: ""
      },
      {
        txt: "我是家长",
        url: ""
      },
      {
        txt: "我是机构/企业",
        url: ""
      },
      {
        txt: "我要接单",
        url: ""
      }
    ];



    const btns = btnArr.map((item, index) => {
      if (index === 0) {
        return (
          <AtButton
            openType="contact"
            bindcontact="handleContact"
            className={`btn btn${index + 1}`}
          >
            {item.txt} 
          </AtButton>
        );
      } else {
        return (
          <AtButton
            className={`btn btn${index + 1}`}
            onClick={(e) => {
              this.handleClick(index,e);
            }}
          >
            {item.txt}
          </AtButton>
        );
      }
    });

    return (
      <View className="container">
        <View className="img-wrapper">
          <Image className="img" src="cloud://tutor-ghszz.7475-tutor-ghszz-1303852457/images/intro.png" mode="widthFix" />
        </View>
        <View class="btn-wrapper">{btns}</View>
      </View>
    );
  }
}
