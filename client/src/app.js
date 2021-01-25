import React, { Component } from "react";
import Taro, { onAppShow } from "@tarojs/taro";
import "./app.scss";
import UserInfo from "./utils/userinfo"

class App extends Component {
//  old appid: wxff3b4fd55fd203df
//  new appid: wxf6015b6b1f740dbc

  componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init();
    }

    Taro.getSetting({
      success(res){
        if(res.authSetting["scope.userInfo"]){
          Taro.getUserInfo({
            success(res){
              UserInfo.setUserInfo(res.userInfo)
            }
          })
        }
      }
    })
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
