let nameInput="";
let ctx=null;
const img1="https://7475-tutor-ghszz-1303852457.tcb.qcloud.la/images/certificate/1.png?sign=78eaad9bd77e6899f723c698d51a957c&t=1602490228";
const img2="https://7475-tutor-ghszz-1303852457.tcb.qcloud.la/images/certificate/2.png?sign=07134ef00af16e67f787653d950c28bc&t=1602490291";
const img3="https://7475-tutor-ghszz-1303852457.tcb.qcloud.la/images/certificate/3.png?sign=b9e6f413656fa9f650a75d100ebb3bf0&t=1602490306";
const img4="https://7475-tutor-ghszz-1303852457.tcb.qcloud.la/images/certificate/4.png?sign=0e2a02338f7b7ff8a9023cb1e780c376&t=1602490314";

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
  },

  handleNameInput(e){
    nameInput=e.detail.value;
    this.drawName(nameInput);
  },


  init(res) {
    const canvas = res[0].node;
    ctx = canvas.getContext("2d");

    const dpr = wx.getSystemInfoSync().pixelRatio;

    const width = res[0].width;
    const height = res[0].height;


    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
   this.drawImg1(canvas,ctx,width);
   this.drawImg2(canvas,ctx,width);
   this.drawText(ctx);
   this.drawImg3(canvas,ctx,width);
   this.drawImg4(canvas,ctx,width);
   
  },

  drawImg1(canvas,ctx,width){
    const headerImg = canvas.createImage();
    headerImg.src = img1; //
    headerImg.onload = () => {
      // 图片的x坐标=canvas的宽度的一半-图像的一半
      ctx.drawImage(headerImg, 30,20,width-60,30);
    };
  },
  drawImg2(canvas,ctx,width){
    const img = canvas.createImage();
    img.src = img2; 
    img.onload = () => {
      // 图片的x坐标=canvas的宽度的一半-图像的一半
      ctx.drawImage(img, 30,55,width-60,30);
    };
  }, 
  drawText(ctx){
    ctx.fillText("兹证明",30,105);
    ctx.beginPath();
    ctx.moveTo(70,105);
    ctx.lineTo(130,105);
    ctx.stroke();
   
 },
  drawImg3(canvas,ctx,width){
    const img = canvas.createImage();
    img.src = img3; 
    img.onload = () => {
      // 图片的x坐标=canvas的宽度的一半-图像的一半
      ctx.drawImage(img, 30,120,width-60,150);
    };
  }, 
  drawImg4(canvas,ctx,width){
    const img = canvas.createImage();
    img.src = img4; 
    img.onload = () => {
      // 图片的x坐标=canvas的宽度的一半-图像的一半
      ctx.drawImage(img, 30,270,width-60,79);
    };
  },

  drawName(){
    ctx.clearRect(70,95,100,10);
    ctx.fillText(`${nameInput}`,70,104);
  },

  async saveImg() {
    if(nameInput===""){
      wx.showToast({
        title:'请先输入您的名字',
        duration: 2000,
        icon:'none'
      })
      return;
    }
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
