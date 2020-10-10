import Taro from '@tarojs/taro'

export default class Index {
  static setUserInfo() {
    Taro.setStorageSync("userinfo",res.detail.userInfo);
    Taro.setStorageSync("isLoggedIn",true);
    this.setState({userInfo: res.detail.userInfo, isLoggedIn: true});
  }
  
  static getUserInfo() {
    return Taro.getStorageSync("userinfo");
  }

  static isLoggedIn() {
    return Taro.getStorageSync("isLoggedIn");
  }

  static getUserDetails() {
    return Taro.cloud
    .callFunction({
      name: "getUserDetails",
      data: {}
    })
    .then(res => {
      return res.result.data[0];
    })
  }
}