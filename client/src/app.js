import React, { Component } from "react";
import Taro from "@tarojs/taro";
import "./app.scss";
import 'taro-ui/dist/style/index.scss' 
import UserInfo from "./utils/userinfo"

class App extends Component {
  componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init();
    }
        //  获得阔以转发的权限
    Taro.showShareMenu({
      withShareTicket: true,
    })
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
