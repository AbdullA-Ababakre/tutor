import React, { Component } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import { Canvas, View, Image, Text, Button } from "@tarojs/components";
import Wxml2Canvas from "../../utils/wxml2canvas/src/index";
import ShareBcPng from "../../images/order/share_bc.png";
import ClockPng from "../../images/order/clock.png"

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempFilePath: '',
    };
  }

  componentDidMount() {
    this.drawImage();
  }

  async drawImage() {
    Taro.showLoading({
      title: '加载中'
    })

    const context = Taro.createCanvasContext("poster", this);
    let deviceInfo = Taro.getSystemInfoSync();
    let zoom = deviceInfo.windowWidth / 375;
    let width = deviceInfo.windowWidth;
    let height = deviceInfo.windowHeight;
    let shareImageStyle = {
      width: `${width * zoom}px`,
      height: `${height * zoom}px`,
    };
    const self = this 
    let workTask = this.props.details.jobTask
    let workPrice = this.props.details.jobPrice
    let workTime = this.props.details.jobType === "other"?this.props.details.workDuration:this.props.details.workTime 
    let codeUrl = await this.getCode(this.props.path)
    console.log(codeUrl, this.props.path)
    this.drawImage = new Wxml2Canvas({
      width,
      height,
      element: "poster",
      background: "#fc4442",
      context,
      progress(percent) {},
      finish(url) {
        self.setState({
          tempFilePath: url
        })
        Taro.hideLoading()
      },
      error(err) {
        console.log(err);
      },
    });
    let data = {
      list: [
        {
          type: 'image',
          x: 0,
          y: 0,
          url:  ShareBcPng,
          style: {
            width: 656*0.48+3,
            height: 954*0.48+3,
          },
        },
        {
          type: 'rect',
          x: 20,
          y: 150,
          style: {
            width: 656*0.44,
            height: 954*0.30,
            fill: "#ffffff"
          }
        },
        {
          type: 'text',
          x: 40,
          y: 180,
          text: workTask,
          style: {
            width: 656*0.44,
            height: 56,
            color: "#000000",
            fontSize: 20,
            lineWeight: "bold",
          }
        },
        {
          type: 'line',
          x: 40,
          y: 215,
          x2: 280,
          y2: 215,
          style: {
            width: 2,
            stroke: "#d8d8d8"
          }
        },
        {
          type: 'text',
          x: 40,
          y: 230,
          text: workPrice,
          style:{
            width: 656*0.44,
            color: "#fc4442",
            fontSize: 19,
            lineWeight: "900",
          }
        },
        {
          type: 'image',
          x: 40,
          y: 262,
          url:  ClockPng,
          style: {
            width: 23,
            height: 23,
          },
        },
        {
          type: 'text',
          x: 70,
          y: 265,
          text:workTime,
          style: {
            width: 656*0.3,
            color: "#000000",
            fontSize: 13,
            lineWeight: "700",
          }
        },
        {
          type: 'image',
          x: 30,
          y: 320,
          url: codeUrl,
          style: {
            width: 100,
            height: 100,
          },
        },
        {
          type: 'text',
          x: 140,
          y: 360,
          text: "大学生荔教小程序",
          style: {
            width: 656*0.44,
            color: "#000000",
            fontSize: 13,
            lineWeight: "bold",
          }
        },
        {
          type: 'line',
          x: 140,
          y: 380,
          x2: 290,
          y2: 380,
          style: {
            width: 3,
            stroke: "#d8d8d8"
          }
        },
        {
          type: 'text',
          x: 140,
          y: 390,
          text: "长按识别小程序/查看职位信息",
          style: {
            width: 656*0.44,
            color: "#a7a7a7",
            fontSize: 10,
            lineWeight: "700",
          }
        },
     
      ],
    };
    this.drawImage.draw(data);
  }

   getCode(path){
    return new  Promise(async (resolve, reject)=>{
      await Taro.cloud.callFunction({
        name: 'getWxCode',
        data:{
          path: path
        }
      })
      .then(res=>{
        resolve(res.result)
      })
    })
  }

  // 保存图片
  saveImage() {
    const { tempFilePath } = this.state;
    const that = this;
    Taro.showLoading({
      title: "正在保存图片...",
    });
    return new Promise((resolve, reject)=>{
      Taro.getSetting({
        success() {
          Taro.authorize({
            scope: "scope.writePhotosAlbum", // 保存图片固定写法
            success() {
              // 图片保存到本地
              Taro.saveImageToPhotosAlbum({
                filePath: tempFilePath, // 放入canvas生成的临时链接
                success() {
                  Taro.hideLoading();
                  Taro.showToast({
                    title: "保存成功",
                    icon: "success",
                    duration: 1000,
                  });
                },
              });
            },
            fail() {
              Taro.hideLoading();
              Taro.showToast({
                title: "您点击了拒绝微信保存图片，再次保存图片需要您进行截屏",
                icon: "none",
                duration: 3000,
              });
            },
            complete(){
              resolve("Get it!")
            }
          });
        },
        fail() {
          Taro.hideLoading();
        },
        complete(){
          console.log(this)
        }
      });
    })
  }

  saveShare(){
    this.saveImage()
        .then(()=>{
          setTimeout(()=>{this.props.closeShare()}, 1000)        
        })
  }

  render() {
    return (
      <View className="canvas-container">
        <Canvas
          canvasId="poster"
          className="share__canvas"
          onTouchStart={() => {}}
          onTouchCancel={() => {}}
          onTouchMove={() => {}}
          onTouchEnd={() => {}}
          onLongTap={() => {}}
        ></Canvas>
        <Button onClick={this.saveShare.bind(this)} className="share_btn" type="warn" >
          保存图片分享
        </Button>
        <View
          className="mask"
        />
      </View>
    );
  }
}
