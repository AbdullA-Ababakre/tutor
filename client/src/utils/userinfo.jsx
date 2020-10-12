import Taro from '@tarojs/taro'

export default class Index {
  static setUserInfo(userInfo) {
    Taro.setStorageSync("userinfo",userInfo);
    Taro.setStorageSync("isLoggedIn",true);
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
      return res.result;
    })
  }
}