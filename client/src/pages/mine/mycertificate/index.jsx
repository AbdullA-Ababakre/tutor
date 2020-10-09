import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    this.canvasRef = React.createRef();
    console.log(this.canvasRef);
    
    let ctx = Taro.createCanvasContext('certificate',this.canvasRef.current);
    ctx.fillStyle="green";
    ctx.fillRect(20,20,150,100);
    ctx.draw()
    
    setTimeout(()=>{
      Taro.canvasToTempFilePath({
        x:0,
        y:0,
        width: 640,
        height: 940,
        canvasId: 'certificate',
        success: (result) => {
          console.log(result);
          
        },
        fail: (err) => {
          console.log(err)
        }
      },this)
    },500)
    return (
      <View className='index'>
        <Canvas type="2d" class="canvas-certificate" canvasId="certificate" ref={this.canvasRef}></Canvas>
      </View>
    )
  }
}
