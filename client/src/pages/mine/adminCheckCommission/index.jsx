import React, {Component} from "react"
import Taro from "@tarojs/taro"
import { View } from "@tarojs/components"
import "./index.scss"

export default class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    Taro.cloud.callFunction({
      name: 'getCommissionData'
    })
    .then(res=>{
      this.setState({
        users: res.result.data.data
      })
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    })
  }

  render(){
    let userView = this.state.users.length>0? this.state.users.map(user=>
      (<View>
        {`手机号码： ${user.phone}  佣金：${user.commission}`}
      </View>)):""
    return (
      <View>
        {userView}
      </View>
    )
  }
}