import React, { Component } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import { getCurrentInstance } from "@tarojs/taro";

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: "",
    }
  }

  componentWillMount() {
    this.setState({
      url: getCurrentInstance().router.params.url,
    })
    Taro.showShareMenu({
      withShareTicket: true,
    })
  }

  render() {
    return (
      <web-view src={this.state.url}/>
    );

  }
}
