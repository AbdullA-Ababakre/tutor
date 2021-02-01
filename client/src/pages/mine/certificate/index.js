let nameInput="";
let ctx=null;

const imgPrefix="https://6f66-official-9gyl2zmleab20999-1304839186.tcb.qcloud.la/Certificate/";
const allImgs = [
  { x: 0, y: 0, w: 640, h: 120, src: "0.png"},
  { x: 57, y: 129, w: 526, h: 50, src: "1.png"},
  { x: 57, y: 200, w: 526, h: 60, src: "2.png"},
  { x: 57, y: 395, w: 526, h: 300, src: "3.png"},
  { x: 57, y: 695, w: 526, h: 158, src: "4.png"},
]

Page({
  onLoad: function (options) {},
  onReady() {
    wx.createSelectorQuery()
      .select("#canvas_box")
      .fields({
        node: true,
        size: true,
      })
      .exec(this.init.bind(this));

    wx.showLoading({
      title: "加载中"
    })
    wx.cloud.callFunction({
      name: 'getUserDetails'
    })
    .then(res=>{
      this.drawName(res.result.realName)
      wx.hideLoading()
    })
  },

  handleNameInput(e){
    nameInput=e.detail.value;
    this.drawName(nameInput);
  },


  init(res) {
    const canvas = res[0].node;
    ctx = canvas.getContext("2d");
    
    canvas.width = 640;
    canvas.height = 940;

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    this.drawImgGroup(canvas,ctx,allImgs);
    this.drawText(ctx);
    ctx.font = "36px sans-serif";
  },

  drawImgGroup(canvas,ctx,imgs){
    imgs.forEach(img =>{
      for(img of imgs) {
        const image = canvas.createImage();
        image.src = imgPrefix + img.src;
        let i=img;
        image.onload = () => {
          ctx.drawImage(image,i.x,i.y,i.w,i.h);
        };
      }
    })
  },

  drawText(ctx){
    ctx.fillStyle = "#888888";
    ctx.strokeStyle = "#888888";
    ctx.font = "24px sans-serif";

    ctx.fillText("兹证明",57,328);
    ctx.beginPath();
    ctx.moveTo(145,337);
    ctx.lineTo(275,337);
    ctx.stroke();
 },

  drawName(nameInput){
    ctx.fillStyle = "white";
    ctx.fillRect(145,297,400,38);
    ctx.fillStyle = "black";
    ctx.fillText(nameInput,145,328);
  },

  async saveImg() {
    // if(nameInput===""){
    //   wx.showToast({
    //     title:'请先输入您的名字',
    //     duration: 2000,
    //     icon:'none'
    //   })
    //   return;
    // }
    let self = this;
    //这里是重点  新版本的type 2d 获取方法
    const query = wx.createSelectorQuery();
    const canvasObj = await new Promise((resolve, reject) => {
      query.select('#canvas_box')
        .fields({ node: true, size: true })
        .exec(async (res) => {
          resolve(res[0].node);
        })
    });
    console.log(canvasObj);
    wx.canvasToTempFilePath({
      canvas: canvasObj, //现在的写法
      success: (res) => {
        console.log(res);
        self.setData({ canClose: true });
        //保存图片
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '已保存到相册',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")
            } else {
              wx.showToast({
                title:"保存失败",
                duration:2000,
                icon:'none'
              })
            }
          },
          complete(res) {
            wx.hideLoading();
            console.log(res);
          }
        })
      },
      fail(res) {
        console.log(res);
      }
    }, this)
  },
});
