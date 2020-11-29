import Taro, {getCurrentInstance}  from '@tarojs/taro';
import React from 'react';
import {
  Form,
  View,
  Button,
  Input,
  Image,
  Picker, 
} from '@tarojs/components';
import {
  AtList,
  AtListItem,
  AtTag,
  AtTextarea,
} from 'taro-ui';
import './index.scss';
import imgOne from './1.png';
import imgTwo from './2.png';


export default class Index extends React.Component {
  state = {
    grade: ['幼儿园', '小学', '初中', '高中'],
    gradeChecked: '小学',
    tutorType: '',
    tutorTypeArr: ['学科考试', '小语种', '艺术/体育'],
    tutorSubject: [],
    tutorSubjectArr: ['语文', '数学', '英语', '物理', '化学', '生物', '地理', '历史', '全科'],
    positionInfo: '',
    teacherRequireText: '',

    salarySelector: [['50元', '60元', '70元', '80元', '90元'], ['50元', '60元', '70元', '80元', '90元']],
    salarySelectorChecked: '60元-90元',
    tel: '',
    organizationName: '',
    recruitNum: '',
    teachingDay: [],
    teachingDayArr: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    tutorDuration: '',
    tutorDurationArr: ['1小时', '1.5小时', '2小时', '2小时以上'],
    teachingTime: '',
    teachingTimeTag: '',
    teachingTimeTagArr: ['可协调', '不可协调'],
    addressSelector: [
      ['深圳', '广州', '佛山', '东莞', '珠海', '上海'],
      ['南山区', '福田区', '罗湖区', '宝安区', '龙岗区', '盐田区', '坪山区', '龙华区', '光明新区']
    ],
    addressSelectorChecked: '深圳南山区',
    exactAddress: '',
    _id: "",
  };

  componentDidMount(){
    this.setState({
      _id: getCurrentInstance().router.params['_id'] || ""
    },()=>{if(!this.state._id){}else{this.getEditData()}})
  }

  async getEditData(){
    const db = wx.cloud.database()
    let data = await db.collection("organizationData").doc(this.state._id).get()
    let stateName = ['gradeChecked', 'tutorType', 'tutorSubject', 'positionInfo', 'teacherRequireText',
                      'salarySelectorChecked', 'tel', 'organizationName', 'recruitNum', 'teachingDay', 
                      'tutorDuration', 'teachingTime', 'teachingTimeTag', 'addressSelector', 'addressSelectorChecked',
                      'exactAddress']
    stateName.forEach(item=>{
      this.setState({
        [item]: data.data[item]
      })
    })
  }

  onGradeChange = (e) => {
    this.setState({
      gradeChecked: this.state.grade[e.detail.value]
    });
  };


  onTutorType = (e) => {
    this.setState({
      tutorType: e.name
    });
  };

  onTutorSubject = (index, e) => {
    let { tutorSubject, tutorSubjectArr } = this.state;
    let name = tutorSubjectArr[index];
    //  已经一次点击完毕
    if (tutorSubject.includes(name)) {
      let index = tutorSubject.indexOf(name);
      tutorSubject.splice(index, 1);
    } else {
      tutorSubject.push(name);
    }

    this.setState({
      tutorSubject: tutorSubject
    });
  };



  onPositionInfo = (e) => {
    this.setState({
      positionInfo: e
    });
  };



  onTeacherRequireText = (e) => {
    this.setState({
      teacherRequireText: e
    });
  };

  // 老师薪资
  onSalaryChange = (e) => {
    console.log('e', e);
    let index0 = e.detail.value[0];
    let index1 = e.detail.value[1];
    let val0 = this.state.salarySelector[0][index0];
    let val1 = this.state.salarySelector[1][index1];
    if (val1 <= val0) {
      Taro.showToast({
        title: '上限不能小于下限',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    this.setState({
      salarySelectorChecked: `${val0}-${val1}`
    });
  };

  // 手机号
  handleTel(e) {
    const tel = e.target.value;
    this.setState({
      tel: tel
    });
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return tel;
  }

  // 你的企业/机构名
  handleOrganizationName(e) {
    const organizationName = e.target.value;
    this.setState({
      organizationName: organizationName
    });
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return organizationName;
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

  // 上课天数
  onTeachingDay = (index, e) => {
    let { teachingDay, teachingDayArr } = this.state;
    let name = teachingDayArr[index];
    //  已经一次点击完毕
    if (teachingDay.includes(name)) {
      let index = teachingDay.indexOf(name);
      teachingDay.splice(index, 1);
    } else {
      teachingDay.push(name);
    }

    this.setState({
      teachingDay: teachingDay
    });
  };

  onTutorDuration = (e) => {
    this.setState({
      tutorDuration: e.name
    });
  };

  handleTeachingTimeChange = (e) => {
    const teachingTime = e.target.value;
    this.setState({
      teachingTime: teachingTime
    });
    return teachingTime;
  };

  onTeachingTimeTag = (e) => {
    this.setState({
      teachingTimeTag: e.name
    });
  };

  onAddressSelectorChange = (e) => {
    let index0 = e.detail.value[0];
    let index1 = e.detail.value[1];
    let val0 = this.state.addressSelector[0][index0];
    let val1 = this.state.addressSelector[1][index1];
    this.setState({
      addressSelectorChecked: `${val0}${val1}`
    });
  };

  columnChange = (e) => {
    const arr1 = [
      ['深圳', '广州', '佛山', '东莞', '珠海', '上海'],
      ['福田区', '罗湖区', '南山区', '宝安区', '龙岗区', '盐田区', '坪山区', '龙华区', '光明新区']
    ];
    const arr2 = [
      ['深圳', '广州', '佛山', '东莞', '珠海', '上海'],
      ['越秀区', '海珠区', '荔湾区', '天河区', '白云区', '黄埔区', '花都区', '番禺区', '南沙区', '从化区', '增城区']
    ];
    const arr3 = [['深圳', '广州', '佛山', '东莞', '珠海', '上海'], ['禅城区', '顺德区', '南海区', '三水区', '高明区']];
    const arr4 = [
      ['深圳', '广州', '佛山', '东莞', '珠海', '上海'],
      [
        '莞城街道',
        '南城街道',
        '东城街道',
        '万江街道',
        '石龙镇',
        '石排镇',
        '茶山镇',
        '企石镇',
        '桥头镇',
        '东坑镇',
        '横沥镇',
        '常平镇',
        '虎门镇',
        '长安镇',
        '沙田镇',
        '厚街镇',
        '寮步镇',
        '大岭山镇',
        '大朗镇',
        '黄江镇',
        '樟木头镇',
        '谢岗镇',
        '塘厦镇',
        '清溪镇',
        '凤岗镇',
        '麻涌镇',
        '中堂镇',
        '高埗镇',
        '石碣镇',
        '望牛墩镇',
        '洪梅镇',
        '道滘镇'
      ]
    ];
    const arr5 = [['深圳', '广州', '佛山', '东莞', '珠海', '上海'], ['香洲区', '斗门区', '金湾区', '横琴新区']];
    const arr6 = [
      ['深圳', '广州', '佛山', '东莞', '珠海', '上海'],
      [
        '辖黄浦区',
        '徐汇区',
        '长宁区',
        '静安区',
        '普陀区',
        '虹口区',
        '杨浦区',
        '闵行区',
        '宝山区',
        '嘉定区',
        '金山区',
        '松江区',
        '青浦区',
        '奉贤区',
        '崇明区',
        '浦东新区'
      ]
    ];

    let col = e.target.column;

    let { column, value: val } = e.detail;
    if (col === 0) {
      if (val === 0) {
        this.setState({
          addressSelector: arr1
        });
      } else if (val === 1) {
        this.setState({
          addressSelector: arr2
        });
      } else if (val === 2) {
        this.setState({
          addressSelector: arr3
        });
      } else if (val === 3) {
        this.setState({
          addressSelector: arr4
        });
      } else if (val === 4) {
        this.setState({
          addressSelector: arr5
        });
      } else if (val === 5) {
        this.setState({
          addressSelector: arr6
        });
      }
    }
  };

  // 具体地点
  handleExactAddress(e) {
    const exactAddress = e.detail.value;
    this.setState({
      exactAddress: exactAddress
    });
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return exactAddress;
  }

  formSubmit = (e) => {
    console.log("eee",this.state);
    const {
      gradeChecked,
      tutorType,
      tutorSubject,
      positionInfo,
      teacherRequireText,
      salarySelectorChecked,
      tel,
      organizationName,
      recruitNum,
      teachingDay,
      tutorDuration,
      teachingTime,
      teachingTimeTag,
      addressSelector,
      addressSelectorChecked,
      exactAddress,
      _id
    } = this.state;

    if (!tel) {
      Taro.showToast({
        title: '请输入联系电话',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (!organizationName) {
      Taro.showToast({
        title: '请输入机构明名称',
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
    } else if (!positionInfo) {
      Taro.showToast({
        title: '请输入岗位内容',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (!teachingTime) {
      Taro.showToast({
        title: '请输入上课时间',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (!exactAddress) {
      Taro.showToast({
        title: '请输入具体上课地点',
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
          postFrom: 'organizationSubmit',
          gradeChecked,
          tutorType,
          tutorSubject,
          positionInfo,
          teacherRequireText,
          salarySelectorChecked,
          tel,
          organizationName,
          recruitNum,
          teachingDay,
          tutorDuration,
          teachingTime,
          teachingTimeTag,
          addressSelector,
          addressSelectorChecked,
          exactAddress,
          _id
        },
      })
      .then(res => {
        Taro.hideLoading();
        if(!_id){
          Taro.redirectTo({url: '/pages/index/organizationAgain/index'})
        }else{
          Taro.showToast({
            title: "修改成功"
          })
          Taro.switchTab({url: "/pages/index/index"})
        }
        console.log("res---", res);
      })


  };
  turnOtherPage(){
    Taro.redirectTo({
      url: "/pages/index/other/index"
    })
  }

  render() {
    const {
      tutorType,
      tutorTypeArr,
      tutorSubject,
      tutorSubjectArr,
      teacherSexValue,
      teacherRequire,
      teacherRequireText,
      positionInfo,
      tel,
      teachingDay,
      teachingDayArr,
      tutorDuration,
      tutorDurationArr,
      teachingTime,
      teachingTimeTag,
      teachingTimeTagArr,
    } = this.state;
    return (
      <View className="info-wrapper">
        <Button className="btn-yellow" onClick={this.turnOtherPage} > 选择发布其他岗位 </Button>
        <Form onSubmit={this.formSubmit}>
          <View className="img-wrapper">
            <Image className="img" src={imgOne} />
          </View>
          {/* 学生年级 */}
          <Picker mode="selector" value={this.state.gradeChecked} range={this.state.grade} onChange={this.onGradeChange}>
            <AtList>
              <AtListItem title="学生年级" extraText={this.state.gradeChecked} />
            </AtList>
          </Picker>
          {/* 辅导类型 */}
          <View className="tutorType">
            <View className="title">辅导类型</View>
            {tutorTypeArr.map((item, index) => {
              return (
                <AtTag
                  name={item}
                  type="primary"
                  className="tag"
                  active={item === tutorType}
                  onClick={this.onTutorType.bind(this)}
                >
                  {item}
                </AtTag>
              );
            })}
          </View>
          {/* 辅导科目 */}
          <View>
            <View className="title">辅导科目(可多选)</View>
            {tutorSubjectArr.map((item, index) => {
              return (
                <AtTag
                  name={item}
                  type="primary"
                  className="tag"
                  active={tutorSubject.includes(item) === true}
                  onClick={this.onTutorSubject.bind(this, index)}
                >
                  {item}
                </AtTag>
              );
            })}
          </View>

          {/*  岗位内容 */}
          <View className="title">岗位内容</View>
          <AtTextarea
            value={positionInfo}
            onChange={this.onPositionInfo.bind(this)}
            maxLength={200}
            placeholder="例：教学生上课"
          />

          {/*  老师要求 */}
          <View className="title">老师要求</View>
          <AtTextarea
            value={teacherRequireText}
            onChange={this.onTeacherRequireText.bind(this)}
            maxLength={200}
            placeholder="例：可以管教调皮的孩子"
          />

          {/* 薪资 */}
          <View className="page-section salary-wrapper">
            <View>您愿意接受的时薪范围</View>
            <Picker mode="multiSelector" range={this.state.salarySelector} value={this.state.salarySelectorChecked} onChange={this.onSalaryChange}>
              <AtList>
                <AtListItem title="时薪范围" extraText={this.state.salarySelectorChecked} />
              </AtList>
            </Picker>
          </View>


          {/* 企业信息填写 */}
          <View className="img-wrapper">
            <Image className="img" src={imgTwo} />
          </View>

          {/* 联系电话 */}
          <View className="title">您的联系电话</View>
          <Input
            className="teachingTimeInput"
            name="tel"
            value={this.state.tel}
            type="number"
            placeholder="请输入手机号"
            placeholderClass="placeHolderClass"
            onInput={this.handleTel.bind(this)}
          />

          {/* 您的企业/机构名字 */}
          <View className="title">您的企业/机构名</View>
          <Input
            className="teachingTimeInput"
            name="tel"
            value={this.state.organizationName}
            type="text"
            placeholder="必填"
            placeholderClass="placeHolderClass"
            onInput={this.handleOrganizationName.bind(this)}
          />

          {/* 招聘人数 */}
          <View className="title">招聘人数</View>
          <Input
            className="teachingTimeInput"
            name="tel"
            value={this.state.recruitNum}
            type="number"
            placeholder="例：5"
            placeholderClass="placeHolderClass"
            onInput={this.handleRecruitNum.bind(this)}
          />

          {/* 上课天数 */}
          <View>
            <View className="title">上课天数(可多选)</View>
            {teachingDayArr.map((item, index) => {
              return (
                <AtTag
                  name={item}
                  type="primary"
                  className="tag"
                  active={teachingDay.includes(item) === true}
                  onClick={this.onTeachingDay.bind(this, index)}
                >
                  {item}
                </AtTag>
              );
            })}
          </View>

          {/* 一次辅导时常 */}
          <View className="tutorDuration">
            <View className="title">一次辅导时长</View>
            {tutorDurationArr.map((item, index) => {
              return (
                <AtTag
                  name={item}
                  type="primary"
                  className="tag"
                  active={item === tutorDuration}
                  onClick={this.onTutorDuration.bind(this)}
                >
                  {item}
                </AtTag>
              );
            })}
          </View>

          {/* 上课时间 */}
          <View className="title">上课时间</View>
          <Input
            className="teachingTimeInput"
            name="teachingTime"
            value={this.state.teachingTime}
            type="text"
            placeholder="例:19:00-21:00"
            placeholderClass="placeHolderClass"
            onInput={this.handleTeachingTimeChange.bind(this)}
          />
          {/* 能否修改时间 */}
          <View className="teachingTime">
            {teachingTimeTagArr.map((item, index) => {
              return (
                <AtTag
                  name={item}
                  type="primary"
                  className="tag"
                  active={item === teachingTimeTag}
                  onClick={this.onTeachingTimeTag.bind(this)}
                >
                  {item}
                </AtTag>
              );
            })}
          </View>

          {/* 地区选择 */}
          <View className="title">上课地点</View>
          <Picker
            mode="multiSelector"
            value={this.state.addressSelectorChecked}
            range={this.state.addressSelector}
            onChange={this.onAddressSelectorChange}
            onColumnChange={this.columnChange}
          >
            <AtList>
              <AtListItem title="地区选择" extraText={this.state.addressSelectorChecked} />
            </AtList>
          </Picker>
          <Input
            className="teachingTimeInput"
            name="exactAddress"
            value={this.state.exactAddress}
            type="text"
            placeholder="例：xx小区 xx栋 xx单元　xx房号"
            placeholderClass="placeHolderClass"
            onInput={this.handleExactAddress.bind(this)}
          />
          <Button className="btn" formType="submit">确认发布</Button>
          <View className="footer">提交成功后老师会通过微信跟您进行报名试课</View>
        </Form>
      </View>
    );
  }
}
