import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View,  Image, Button } from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {

    handleClick1 = (index) => {
        Taro.redirectTo({
            url: `/pages/index/organization/index`,
        });
    }

    handleClick2 = (index) => {
        Taro.redirectTo({
            url: `/pages/index/other/index`,
        });
    }



    render() {
        return (
            <View className="container">
                <View className="img-wrapper">
                    <Image className="img" src="cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/post_success.png" mode="widthFix" />
                </View>
                <View>
                    <Button onClick={this.handleClick1.bind(this)} class="btn btn1">继续发布教育岗</Button>
                    <Button onClick={this.handleClick2.bind(this)} class="btn btn2">继续发布其他岗位</Button>
                </View>
            </View>
        );
    }
}
