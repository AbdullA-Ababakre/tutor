import React, { Component } from 'react'
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import "./index.scss";

export default class TutorSwiper extends Component {
  state = {
    context: {}
  }


  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <Swiper
        style="height: 250px; width: 100%;"
        indicatorColor="#FFF8"
        indicatorActiveColor="#3338"
        circular
        indicatorDots={this.props.banner.length>1}
        autoplay
        >
        {this.props.banner.map((item, index) => {
          return (
            <SwiperItem key={index}>
              <Image className="swiper-img" mode="widthFix" onTap={()=>{this.props.onTapItem(index)}} src={item}></Image>
            </SwiperItem>
          );
        })}
      </Swiper>
    );
  }
}
