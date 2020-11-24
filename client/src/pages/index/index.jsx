import React, { Component } from "react";
import Taro,{ getCurrentInstance } from "@tarojs/taro";
import { View, Image} from "@tarojs/components";
import "./index.scss";
import {
  AtButton
} from "taro-ui";
export default class Index extends Component {

  componentDidMount(){
    this.setShareOpenId()
  }

  // 绑定 分享者的 openid
  setShareOpenId(){
    try {
      let shareOpenId = ""
      let params = getCurrentInstance().router.params
      if(Object.keys(params).join("").includes("shareOpenId")){
        shareOpenId = params['shareOpenId']
        Taro.cloud.callFunction({
          name: "setShareOpenId",
          data:{
            shareOpenId: shareOpenId
          }
        })
        .then(res=>{
          console.log(res);
        })
        // console.log(shareOpenId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getPath(){
    return new Promise(resolve=>{
      Taro.showLoading({
        title:"加载中"
      })
      Taro.cloud.callFunction({
        name: "getSharePath",
        data: {
          path: getCurrentInstance().router.path,
          params: getCurrentInstance().router.params
        }
      })
      .then(res=>{
        Taro.hideLoading()
        resolve(res.result.data)
      })
    })
  }

  // 分享给别人 携带了分享者的 openid 
  async onShareAppMessage() {
    let data = await this.getPath()
    console.log(data);
    return {
      path: data.path
    }
  }

  // 分享到朋友圈 携带了分享者的 openid 
  async onShareTimeline () {
    let data = await this.getPath()
    return {
      query: data.query
    }  
  }

  handleClick = (index) => {
    console.log("index", index);
    switch (index) {
      case 1:
        Taro.navigateTo({
          url: `/pages/index/parent/submitInfo/index`,
        });
        break;
      case 2:
        Taro.navigateTo({
          url: `/pages/index/organization/index`,
        });
        break;
      case 3:
        Taro.switchTab({
          url: `/pages/order/index`,
        });
      default:
        return;
    }
  };

  handleChange() {}
  render() {
    const btnArr = [
      {
        txt: "在线咨询",
        url: "",
      },
      {
        txt: "我是家长",
        url: "",
      },
      {
        txt: "我是机构/企业",
        url: "",
      },
      {
        txt: "我要接单",
        url: "",
      },
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
              this.handleClick(index, e);
            }}
          >
            {item.txt}
          </AtButton>
        );
      }
    });
    let value = "";
    return (
      <View className="container">
        <View className="img-wrapper">
          <Image
            className="img"
            src="cloud://tutor-ghszz.7475-tutor-ghszz-1303852457/images/intro.png"
            mode="scaleToFill"
          />
        </View>
        <View class="btn-wrapper">{btns}</View>
      </View>
    );
  }
}
