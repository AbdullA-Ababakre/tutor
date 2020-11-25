import React, {Component} from "react"
import Taro from "@tarojs/taro"
import { View, Button } from "@tarojs/components"
import "./index.scss"

export default class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    this.getUserData()
  }

  getUserData(){
    Taro.showLoading({
      title: "加载中"
    })
    Taro.cloud.callFunction({
      name: 'getCommissionData'
    })
    .then(res=>{
      this.setState({
        users: res.result.data.data
      })
      Taro.hideLoading()
    })
  }

  resetCommission(_id){
    let that = this
    Taro.showModal({
      title: '提示',
      content: '确定佣金归0吗？',
      success (res) {
        if (res.confirm) {
          Taro.cloud.callFunction({
            name: 'resetCommission',
            data: {
              _id: _id
            }
          })
          .then(res=>{
            that.getUserData()
            console.log(res)
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  render(){
    let userView = this.state.users.length>0? this.state.users.map(user=>
      (<View className="container-box" >
        <View className="box-phone" >
          {`手机号码： ${user.phone}`}
        </View>
        <View className="box-commission" >
          { `佣金：${user.commission}`}
        </View>
        <Button className="box-btn" size="mini" type="warn" onClick={this.resetCommission.bind(this, user._id)} >
            佣金归零
        </Button>
      </View>)):""
    return (
      <View  >
        <View  className="container">
          {userView}
        </View>
        {
          this.state.users.length ==0 && <View style="text-align:center; margin-top: 10px" > ---- 暂无数据 ----</View>
        }
      </View>
    )
  }
}