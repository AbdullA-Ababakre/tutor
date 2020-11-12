import React, { Component } from 'react'
import './index.scss'
import { View, Image } from '@tarojs/components'
import { Picker } from '@tarojs/components'

import icon_drop_down from '../../images/order/icon_drop_down.png'

export default class TutorInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
    }
  }

  onChange (e) {
    this.setState({
      selected: e.detail.value,
    });
    this.props.onChange(this.props.range[e.detail.value]);
  }

  render() {
    return (
      <View className="tutor-drop-down-selector">
        <Picker mode='selector' range={this.props.range} onChange={this.onChange.bind(this)}>
          {this.state.selected==-1?this.props.placeholder:this.props.range[this.state.selected]}<Image className="tutor-drop-down-icon" src={icon_drop_down}/>
        </Picker>
      </View>
    )
  }
}
