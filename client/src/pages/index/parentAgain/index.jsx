import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import "./index.scss";
import { AtButton } from 'taro-ui'

import imgOne from './1.png'

export default class Index extends Component {

    handleClick = (index) => {
        Taro.redirectTo({
            url: `/pages/index/parent/submitInfo/index`,
        });
    }

    render() {
        return (
            <View className="container">
                <View className="img-wrapper">
                    <Image className="img" src={imgOne} mode="widthFix" />
                </View>
                <Button onClick={this.handleClick.bind(this)} class="btn">继续预约</Button>
            </View>
        );
    }
}
