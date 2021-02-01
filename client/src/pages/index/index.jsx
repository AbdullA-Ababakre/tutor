import React, { Component } from "react";
import Taro,{ getCurrentInstance } from "@tarojs/taro";
import { View, Image} from "@tarojs/components";
import "./index.scss";
import {
  AtButton
} from "taro-ui";
import Skeleton from 'taro-skeleton'
import 'taro-skeleton/dist/index.css' // 引入组件样式

export default class Index extends Component {

  state = {
    showImg: false
  }

  componentDidMount(){
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

  handleClick = (index) => {
    switch (index) {
      case 1:
        Taro.navigateTo({
          url: `/pages/index/parent/intro/index`,
        });
        break;
      case 2:
        Taro.navigateTo({
          url: `/pages/index/organization/index`,
        });
        break;
      case 3:
        Taro.switchTab({
          url: `/pages/order/index`,
        });
      default:
        return;
    }
  };

  showImg(){
    this.setState({
      showImg: true
    })
  }

  handleChange() {}
  render() {
    const btnArr = [
      {
        txt: "在线咨询",
        imgUrl: "cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/index_consult.png",
      },
      {
        txt: "我是家长",
        imgUrl: "cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/index_parent.png",
      },
      {
        txt: "我是机构/企业",
        imgUrl: "cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/index_organization.png",
      },
      {
        txt: "我要接单",
        imgUrl: "cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/index_order.png",
      },
    ];

    const btns = btnArr.map((item, index) => {
      if (index === 0) {
        return (
          <AtButton
            openType="contact"
            bindcontact="handleContact"
            className={`btn ${this.state.showImg?"opacity-1":"opacity-0"}`}
          >
            <Image className="btn-image"  src={item.imgUrl}></Image>
          </AtButton>
        );
      } else {
        return (
          <AtButton
            className={`btn ${this.state.showImg?"opacity-1":"opacity-0"}`}
            onClick={(e) => {
              this.handleClick(index, e);
            }}
          >
            <Image className="btn-image" src={item.imgUrl}></Image>
          </AtButton>
        );
      }
    });
    return (
      <View className="container">
        {
          !this.state.showImg && (
            <View>
               <Skeleton rowProps={[{width:'100%', height: '320px'}]}   row={1} />
                <View class="btn-wrapper">
                  <Skeleton className="custom-skeleton-class" rowProps={[{width:'130px', height: '100px'}]}   row={1} />
                  <Skeleton  className="custom-skeleton-class"  rowProps={[{width:'130px', height: '100px'}]}   row={1} />
                  <Skeleton  className="custom-skeleton-class"  rowProps={[{width:'130px', height: '100px'}]}   row={1} />
                  <Skeleton  className="custom-skeleton-class"  rowProps={[{width:'130px', height: '100px'}]}   row={1} />
                </View>
            </View>
          )
        }
        <View className="img-wrapper">
          <Image
            className={`img ${this.state.showImg?"opacity-1":"opacity-0"}`}
            src="cloud://official-9gyl2zmleab20999.6f66-official-9gyl2zmleab20999-1304839186/Image/index_header_real.png"
            mode="scaleToFill"
            onLoad={this.showImg.bind(this)}
          />
        </View>
        <View class="btn-wrapper">{btns}</View>
      </View>
    );
  }
}
