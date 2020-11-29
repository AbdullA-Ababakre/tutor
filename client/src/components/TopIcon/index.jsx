import React, {Component} from "react"
import Taro from "@tarojs/taro"
import { View, Image, Text } from "@tarojs/components";
import topIcon from "../../images/order/topIcon.png"
import topNonIcon from "../../images/order/topNonIcon.png"
import "./index.scss"

export default class Index extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View className="top-container" >
        <Image className="top-container-icon" src={this.props.top?topIcon:topNonIcon} />
        <View className={`top-container-name-false ${this.props.top?"top-container-name-true":""}`} >
          置顶
        </View>
      </View>
    )
  }
}