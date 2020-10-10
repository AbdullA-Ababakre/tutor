import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text,Form,Switch,Input,Button } from "@tarojs/components";
import "./index.scss";

export default class FormSubmit extends Component {
  formSubmit = (e) => {
    console.log(e);
  };

  formReset = (e) => {
    console.log(e);
  };

  render() {
    return (
      <Form onSubmit={this.formSubmit} onReset={this.formReset}>
        <View className="example-body">
          {/* <Switch name="switch" className="form-switch"></Switch> */}
          <Input name="nam" type='text' placeholder='将会获取焦点' focus/>
        </View>
        <Button formType="submit">提交</Button>
      </Form>
    );
  }
}
