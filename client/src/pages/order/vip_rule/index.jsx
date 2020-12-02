import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

class RuleDetailCard extends Component{
  constructor(props){
    super(props)
    this.state ={
      title: props.title,
      content: props.content || [],
      space: props.space || false
    }
    console.log(this.state.content.length);
  }

  render(){
    let content = () =>{ 
      if(this.state.space)
        return (
        <Text className="card-content" >
          &nbsp; &nbsp; &nbsp; &nbsp; {this.state.content[0]}
        </Text>)
      else
        return(
          <Text className="card-content" >
            {this.state.content[0]}
         </Text>)
    }
    return (
      <View className="card-container" >
        <Text className="card-title" >
          {this.state.title}
        </Text>
        {content()}
      </View>
    )
  }
}

export default class Index extends Component {
  constructor(props) {
    super(props);
    Taro.setNavigationBarColor({frontColor: '#000000',backgroundColor: '#F7F7F7'});
    Taro.setBackgroundColor({backgroundColor: '#F7F7F7'});
    this.state = {
      ruleArr: [
        {
          title: "一.关于我们",
          content: [
            "    大学生荔教2019年成立于深圳，垂直布局家教、教育岗位高薪兼职、实习招聘及广告四大业务。打包优质大学生人才输送给各大企业，致力于让一千万大学生寻找高薪兼职变的更简单。现已在广州、深圳、东莞、佛山、珠海、北京等城市运营，入选广东省大学生创新创业引领计划青创100企业，获全国电子商务三创广东赛三等奖。"
          ],
          space: true
        },
        {
          title: "二.试课",
          content: [
            `教员需要最多免费试课1小时，客户可根据自己意愿决定是否支付1小时以内的报酬或车补；超过1小时的部分，可请客户按正常费用结算报酬。`
          ],
          space: true
        },
        {
          title: "三.会员权益",
          content: [
           `1. 年会员卡免费接单一年,若第一年未使用可延长半年；月会员卡免费接单一个月与享有以下3点权益，若第一个月未能成功接单可延长15天。
            2. 300-500驾校代金券（代金券允许转让、可与其他优惠叠加），每个地区合作的驾校品牌不同，具体驾校品牌以大学生荔教在社群里宣传的为准。
            3. 其他不定期专属优惠（以实际引进的为准）。
            4. 上岗工作满3个月可获大学生荔教母公司青猎创投（深圳）有限公司开具的实习证明。
            注:详情阅读会员制推文`
          ],
          space: false
        },
        {
          title: "四. 接单流程",
          content: [
            `1. 大学生荔教小程序或联系客服缴费成为客服。
             2. 用成为会员时绑定的微信号与所对接办卡的客服免费接单。`
          ],
          space: false
        },
        {
          title: "五.会员须知",
          content: [
            `1. 严禁将招聘方联系方式转给他人或以任何形式代他人接单（平台将严格审核,如若发现必将严肃处理）。
             2. 对接完荔教客服原则上不允许教员主动放弃该单,若教员应聘完该单觉得不满意想放弃平台允许主动放弃一次。
             3. 如面试放鸽子取消会员资格。
             4. 会有极少数招聘方临时调整招聘内容或招满、暂时无法安排的情况（此情况很少有），此会员卡为年卡/月卡，无论任何情况会员一概不接受任何形式退回，望教员悉知。若教员对平台客服有任何不礼貌行为、不遵守协议、有损荔教平台形象或声誉、对荔教平台造成不良影响的会员，荔教有权取消会员资格并永不录用。
             5. 再次声明:能不能面试成功/接单成功靠自己能力，荔教不承诺一定能接单成功，荔教方仅提供招聘方/家长联系方式，简历制作教程、相关模板已上线(大学生荔教公众号后台回复“简历”即可获取)，面试/试课、备课技巧会陆续上线，望同学们认真准备。会员卡为虚拟产品，一经售出一概不接受任何形式退回。`
          ],
          space: false
        },
        {
          title: "六.接单的订嘱",
          content: [
            "      上每节课前和家长沟通上什么主要内容，重点在哪里。为人师表一定要负责、耐心，针对学生基础备课，多与家长沟通，这些都是与工资挂钩的哦。"
          ],
          space: true
        }
      ]
    }
  }

  render () {
    return (
      <View className='vip-rule'>
        <View  className="vip-rule-header-red"/>
        <View className="vip-rule-body" >
          <Text className="big-title" >
          《大学生荔教接单协议》
          </Text>
          <View className="line" />
          <Text className="small-title" >
          同学您好！首先恭喜同学即将成为大学生荔教教员的一员，现在请您认真阅读以下内容：
          </Text>
          {
            this.state.ruleArr.map(item=>{
              return (
                <RuleDetailCard title={item.title} space={item.space} content={item.content} />
              )
            })
          }
          <Text style="margin-top: 20px" className="small-title">
          &nbsp; &nbsp; &nbsp;&nbsp;接单为接受以上规则，以上规则的最终解释权归大学生荔教所有。
          </Text>
        </View>
      </View>
    )
  }
}
