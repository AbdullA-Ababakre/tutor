import React, { Component } from "react";
import Taro,{ getCurrentInstance } from "@tarojs/taro";
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
      articles1: [],
      articles2: [],
      banners: []
    }
  }

  componentDidMount(){
    Taro.showLoading({
      title: '加载中'
    })
    Taro.cloud.callFunction({
      name: 'getStudyPromote'
    })
    .then(res=>{
      this.setState({
        articles1: res.result.data
      })
    })

    Taro.cloud.callFunction({
      name: 'getStudySchool'
    })
    .then(res=>{
      Taro.hideLoading()
      this.setState({
        articles2: res.result.data
      })  
    })

    Taro.cloud.callFunction({
      name: 'getStudyBanners'
    })
    .then(res=>{
      console.log("banners", res)
      Taro.hideLoading()
      this.setState({
        banners: res.result.data
      })  
    })

    this.setShareOpenId()
  }

  // 绑定 分享者的 openid
  setShareOpenId(){
    try {
      let shareOpenId = ""
      let params = getCurrentInstance().router.params
      if(Object.keys(params).join("").includes("shareOpenId")){
        shareOpenId = params['shareOpenId']
        Taro.cloud.callFunction({
          name: "setShareOpenId",
          data:{
            shareOpenId: shareOpenId
          }
        })
        .then(res=>{
          console.log(res);
        })
        // console.log(shareOpenId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  getPath(){
    return new Promise(resolve=>{
      Taro.showLoading({
        title:"加载中"
      })
      Taro.cloud.callFunction({
        name: "getSharePath",
        data: {
          path: getCurrentInstance().router.path,
          params: getCurrentInstance().router.params
        }
      })
      .then(res=>{
        Taro.hideLoading()
        resolve(res.result.data)
      })
    })
  }

  // 分享给别人 携带了分享者的 openid 
  async onShareAppMessage() {
    let data = await this.getPath()
    console.log(data);
    return {
      path: data.path
    }
  }

  // 分享到朋友圈 携带了分享者的 openid 
  async onShareTimeline () {
    let data = await this.getPath()
    return {
      query: data.query
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
    // const picSrc =
    // "https://7475-tutor-ghszz-1303852457.tcb.qcloud.la/study/swiper/parentIntro1.png";

    // const banners = [
    //   {
    //   'imgUrl': "cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/school_header.png",
    //   'pageUrl': 'https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg'
    //   },
    // ]

    // const articles1 = [
    //   // {
    //   //   title: "学生课堂纪律差，怎么",
    //   //   author: "小荔同学",
    //   //   imgSrc: picSrc,
    //   //   url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
    //   // },
    //   // {
    //   //   title: "这是第二篇",
    //   //   author: "大荔同学",
    //   //   imgSrc: picSrc,
    //   //   url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
    //   // },
    // ];
    // const articles2 = [
    //   // {
    //   //   title: "家教、兼职老师简历指南长标题占位",
    //   //   desc: "这篇我们教大家如何的写自己人生的第一份简历超长测试超长测试超长测试超长测试",
    //   //   rating: "4",
    //   //   imgSrc: picSrc,
    //   //   url: "https://mp.weixin.qq.com/s/cEGEi7474OsOxbuzn_7fmg",
    //   // },
    // ];

    let {articles1, articles2} = this.state
    let articleList;

    if(this.state.pageswitch_selected == 1) {
      articleList = articles1.map((v,i)=>{
        return (
          <View className="article-small-wrapper animation-fadein" onClick={()=>{this.openArticle(v.url)}}>
            {/* <ArticleSmallCard title={v.title} author={v.author} price={v.price} imgSrc={v.imgSrc} freeForVip={v.freeForVip||""}/> */}
            <ArticleSmallCard title={v.title} author={v.author} imgSrc={v.imgSrc}/>
          </View>
        )
      });
    } else {
      articleList = articles2.map((v,i)=>{
        return (
          <View className="article-wrapper animation-fadein" onClick={()=>{this.openArticle(v.url)}}>
            <ArticleCard title={v.title} desc={v.desc} rating={v.rating} imgSrc={v.imgSrc} />
          </View>
        )
      });
    }

    let pageswitch_selected = this.state.pageswitch_selected;
    return (
      <View className="index">
        <TutorSwiper className="study-swiper animation-fadein" onTapItem={(src)=>{this.openArticle(src)}} banner={this.state.banners} />
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
