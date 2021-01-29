import Taro, {getCurrentInstance}  from '@tarojs/taro';
import React from 'react';
import {
    Form,
    View,
    Button,
    Input,
} from '@tarojs/components';
import {
    AtTextarea,
} from 'taro-ui';
import './index.scss';


export default class Index extends React.Component {
    state = {
        organizationName: '',
        positionName: '',
        positionInfo: '',
        positionSalary: '',
        positionAddress: '',
        recruitNum: '',
        workingTime: '',
        tel: "",
        _id: ""
    };

    async componentDidMount(){
      if(getCurrentInstance().router.params['_id']){
        this.getEditData()
        this.setState({
          _id: getCurrentInstance().router.params['_id']
        })
      }
    }

    async getEditData(){
      let stateName = ['organizationName', 'positionName', 'positionInfo', 'positionSalary', 'positionAddress', 'recruitNum', 'workingTime', 'tel']
      let data = {}
      Taro.cloud.callFunction({
        name: 'getEditData',
        data: {
          id: getCurrentInstance().router.params['_id'],
          type: 'other'
        }
      }).then(res=>{
        data = res.result.data
        console.log(data);
        stateName.forEach(item=>{
          this.setState({
            [item]: data[item]
          })
        })
      })
    }

    // 企业名称
    handleOrganizationName(e) {
        const organizationName = e.target.value;
        this.setState({
            organizationName: organizationName
        });
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return organizationName;
    }

    // 岗位名称
    handlePositionName(e) {
        const positionName = e.target.value;
        this.setState({
            positionName: positionName
        });
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return positionName;
    }

    // 岗位要求
    onPositionInfo = (e) => {
        this.setState({
            positionInfo: e
        });
    };


    handlePositionSalary(e) {
        const positionSalary = e.target.value;
        this.setState({
            positionSalary: positionSalary
        });
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return positionSalary;
    }

    // 招聘人数
    handlePositionAddress(e) {
        const positionAddress = e.target.value;
        this.setState({
            positionAddress: positionAddress
        });
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return positionAddress;
    }


    // 招聘人数
    handleRecruitNum(e) {
        const recruitNum = e.target.value;
        this.setState({
            recruitNum: recruitNum
        });
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return recruitNum;
    }

    // 工作时间
    handleWorkingTime(e) {
        const workingTime = e.target.value;
        this.setState({
            workingTime: workingTime
        });
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return workingTime;
    }

    // 手机号码
    handleTel(e){
      const tel = e.target.value;
      this.setState({
        tel: tel
      })
      return tel;
    }

    formSubmit = (e) => {

        const {
            organizationName,
            positionName,
            positionInfo,
            positionSalary,
            positionAddress,
            recruitNum,
            workingTime,
            tel,
            _id
        } = this.state;

        if (!organizationName) {
            Taro.showToast({
                title: '请输入企业名称',
                icon: 'none',
                duration: 2000
            })
            return;
        } else if (!positionName) {
            Taro.showToast({
                title: '请输入岗位名称',
                icon: 'none',
                duration: 2000
            })
            return;
        } else if (!positionInfo) {
            Taro.showToast({
                title: '请输入工作内容',
                icon: 'none',
                duration: 2000
            })
            return;
        } else if (!positionSalary) {
            Taro.showToast({
                title: '请输入薪酬',
                icon: 'none',
                duration: 2000
            })
            return;
        } else if (!recruitNum) {
            Taro.showToast({
                title: '请输入招聘人数',
                icon: 'none',
                duration: 2000
            })
            return;
        } else if (!workingTime) {
            Taro.showToast({
                title: '请输入工作时间',
                icon: 'none',
                duration: 2000
            })
            return;
        } else if (!positionAddress) {
            Taro.showToast({
                title: '请输入工作地点',
                icon: 'none',
                duration: 2000
            })
            return;
        }else if (!tel) {
          Taro.showToast({
              title: '请输入手机号码',
              icon: 'none',
              duration: 2000
          })
          return;
      }

        Taro.showLoading({
            title: '提交中',
        })

        Taro.cloud
            .callFunction({
                name: 'postData',
                data: {
                    postFrom: 'otherSubmit',
                    organizationName,
                    positionName,
                    positionInfo,
                    positionSalary,
                    positionAddress,
                    recruitNum,
                    workingTime,
                    tel,
                    _id
                },
            })
            .then(res => {
                Taro.hideLoading();
                if(!_id){
                  Taro.redirectTo({url: '/pages/index/parentAgain/index'})
                }else{
                  Taro.showToast({
                    title: "修改成功！"
                  })
                  Taro.switchTab({url: '/pages/index/index'})
                }
                console.log("res---", res);
            })
    };

    render() {
        return (
            <View className="info-wrapper">
                <Form onSubmit={this.formSubmit}>
                    {/* 您的企业/机构名字 */}
                    <View className="title">企业名称</View>
                    <Input
                        className="teachingTimeInput"
                        name="organizationName"
                        value={this.state.organizationName}
                        type="text"
                        placeholder="必填"
                        placeholderClass="placeHolderClass"
                        onInput={this.handleOrganizationName.bind(this)}
                    />

                    {/* 岗位名称 */}
                    <View className="title">岗位名称</View>
                    <Input
                        className="teachingTimeInput"
                        name="positionName"
                        value={this.state.positionName}
                        type="text"
                        placeholder="例：公众号运营"
                        placeholderClass="placeHolderClass"
                        onInput={this.handlePositionName.bind(this)}
                    />
                    {/*  岗位内容/要求 */}
                    <View className="title">岗位内容/要求</View>
                    <AtTextarea
                        value={this.state.positionInfo}
                        onChange={this.onPositionInfo.bind(this)}
                        maxLength={200}
                        placeholder="例：有公众号运营经验"
                    />

                    {/* 薪酬 */}
                    <View className="title">薪酬</View>
                    <Input
                        className="teachingTimeInput"
                        name="positionSalary"
                        value={this.state.positionSalary}
                        type="text"
                        placeholder="例:200-300元/天"
                        placeholderClass="placeHolderClass"
                        onInput={this.handlePositionSalary.bind(this)}
                    />


                    {/* 工作地址 */}
                    <View className="title">工作地址</View>
                    <Input
                        className="teachingTimeInput"
                        name="tel"
                        value={this.state.positionAddress}
                        type="text"
                        placeholder="例：xx市xx小区xx栋xx单元xx房号"
                        placeholderClass="placeHolderClass"
                        onInput={this.handlePositionAddress.bind(this)}
                    />
                    {/* 招聘人数 */}
                    <View className="title">招聘人数</View>
                    <Input
                        className="teachingTimeInput"
                        name="recruitNum"
                        value={this.state.recruitNum}
                        type="number"
                        placeholder="例：5"
                        placeholderClass="placeHolderClass"
                        onInput={this.handleRecruitNum.bind(this)}
                    />


                    {/* 工作时间 */}
                    <View className="title">工作时间</View>
                    <Input
                        className="teachingTimeInput"
                        name="workingTime"
                        value={this.state.workingTime}
                        type="text"
                        placeholder="例：周末全天"
                        placeholderClass="placeHolderClass"
                        onInput={this.handleWorkingTime.bind(this)}
                    />

                    {/* 手机号码 */}
                    <View className="title">手机号码</View>
                    <Input
                        className="teachingTimeInput"
                        name="tel"
                        value={this.state.tel}
                        type="text"
                        placeholder="例：18145613210"
                        placeholderClass="placeHolderClass"
                        onInput={this.handleTel.bind(this)}
                    />

                    <Button className="btn btn-shadow-all" formType="submit">{this.state._id?"确认修改":"确认发布"}</Button>
                </Form>
            </View>
        );
    }
}
