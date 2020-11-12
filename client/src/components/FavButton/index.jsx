import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'
import { View, Image } from '@tarojs/components'

import icon_favorite from "../../images/order/details_favorite.png";

export default class FavButton extends Component {

  // update favor

  render() {
    let tempClassName = this.props.className || "";
    this.props.className = undefined;
    return (
      <View {...this.props} className="favbtn-add-favorite">
        <Image className={'favbtn-icon-favorite ' + (this.props.enable?"":"favbtn-icon-disabled")} src={icon_favorite} />
        <View className={'favbtn-text ' + (this.props.enable?"":"favbtn-text-disabled")}>收藏</View>
      </View>
    )
  }
}
