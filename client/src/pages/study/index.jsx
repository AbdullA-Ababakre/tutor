import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.scss";
import TutorSwiper from "../../components/TutorSwiper";
import ArticleCard from "../../components/ArticleCard"
import ArticleSmallCard from "../../components/ArticleSmallCard"

import pageswitch_redbar from "../../images/pageswitch_redbar.png"

export default class Index extends Component {
  constructor(props) {
    super(props);
    Taro.setBackgroundColor({backgroundColor: "#f7f7f7"});
    this.state = {
      pageswitch_selected: 1,
    }
  }
  
  switchPage(page) {
    this.setState({
      pageswitch_selected: page,
    })
  }

  openArticle(url) {
    Taro.navigateTo({
      url: "./articlePage/index?url="+encodeURI(url),
    });
  }

  render() {
    const picSrc =
    "https://7475-tutor-ghszz-1303852457.tcb.qcloud.la/study/swiper/parentIntro1.png";
    const banner1 =
      "https://7475-tutor-ghszz-1303852457.tcb.qcloud.la/study/swiper/1.png";

    const banners = [
      banner1,
    ];
    const bannerUrls = [
      "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
    ];
    const articles1 = [
      {
        title: "学生课堂纪律差，怎么",
        author: "小荔同学",
        price: "49.99",
        imgSrc: picSrc,
        freeForVip: false,
        url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
      },
      {
        title: "这是第二篇",
        author: "大荔同学",
        price: "109.99",
        imgSrc: picSrc,
        freeForVip: true,
        url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
      },
      {
        title: "这是第三篇",
        author: "中荔同学",
        price: "19.99",
        imgSrc: picSrc,
        freeForVip: true,
        url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
      },
      {
        title: "这是第三篇",
        author: "中荔同学",
        price: "19.99",
        imgSrc: picSrc,
        freeForVip: true,
        url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
      },
      {
        title: "这是第三篇",
        author: "中荔同学",
        price: "19.99",
        imgSrc: picSrc,
        freeForVip: true,
        url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
      },
      {
        title: "这是第三篇",
        author: "中荔同学",
        price: "19.99",
        imgSrc: picSrc,
        freeForVip: true,
        url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
      },
      {
        title: "这是第三篇",
        author: "中荔同学",
        price: "19.99",
        imgSrc: picSrc,
        freeForVip: true,
        url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
      },
      {
        title: "这是第三篇",
        author: "中荔同学",
        price: "19.99",
        imgSrc: picSrc,
        freeForVip: true,
        url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
      },
      {
        title: "这是第三篇",
        author: "中荔同学",
        price: "19.99",
        imgSrc: picSrc,
        freeForVip: true,
        url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
      },
    ];
    const articles2 = [
      {
        title: "家教、兼职老师简历指南长标题占位",
        desc: "这篇我们教大家如何的写自己人生的第一份简历超长测试超长测试超长测试超长测试",
        rating: "4",
        imgSrc: picSrc,
        url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
      },
    ];
    let articleList;

    if(this.state.pageswitch_selected == 1) {
      articleList = articles1.map((v,i)=>{
        return (
          <View className="article-small-wrapper" onClick={()=>{this.openArticle(v.url)}}>
            <ArticleSmallCard title={v.title} author={v.author} price={v.price} imgSrc={v.imgSrc} freeForVip={v.freeForVip||""}/>
          </View>
        )
      });
    } else {
      articleList = articles2.map((v,i)=>{
        return (
          <View className="article-wrapper" onClick={()=>{this.openArticle(v.url)}}>
            <ArticleCard title={v.title} desc={v.desc} rating={v.rating} imgSrc={v.imgSrc} />
          </View>
        )
      });
    }

    let pageswitch_selected = this.state.pageswitch_selected;
    return (
      <View className="index">
        <TutorSwiper className="study-swiper" onTapItem={(i)=>{this.openArticle(bannerUrls[i])}} banner={banners} />
        {/* 页面切换器 */}
        <View className="page-switch">
          <View className="page-switch-option-container">
            <View
              className=
              {`page-switch-option-left ${pageswitch_selected==1?"page-switch-option-selected":""}`}
              onClick={()=>{this.switchPage(1)}}
            >
              教学提升
              <Image
                className={`page-switch-redbar ${pageswitch_selected==1?"":"invisible"}`}
                mode="widthFix"
                src={pageswitch_redbar}
              />
            </View>
            <View
              className=
              {`page-switch-option-right ${pageswitch_selected==2?"page-switch-option-selected":""}`}
              onClick={()=>{this.switchPage(2)}}
            >
              成长学院
              <Image
                className={`page-switch-redbar ${pageswitch_selected==2?"":"invisible"}`}
                mode="widthFix"
                src={pageswitch_redbar}
              />
            </View>
          </View>
        </View>
        <View className={pageswitch_selected==1?"articles-small-container":"articles-container"}>
          {articleList}
        </View>
      </View>
    );

  }
}
