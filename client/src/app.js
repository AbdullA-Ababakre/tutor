import React, { Component } from "react";
import Taro from "@tarojs/taro";
import "./app.scss";
import 'taro-ui/dist/style/index.scss' 

class App extends Component {
  componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init();
    }
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
