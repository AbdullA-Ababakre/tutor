export default {
  pages: [
    'pages/index/parent/intro/index',
    'pages/index/index',
    'pages/index/parent/submitInfo/index',
    'pages/order/index',
    'pages/study/index',
    'pages/mine/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '大学生荔教',
    navigationBarTextStyle: 'black'
  },
  cloud: true,
  tabBar: {
    list: [{
        pagePath: "pages/index/index",
        iconPath: "images/index1.png",
        selectedIconPath: "images/index2.png",
        text: "首页"
      },
      {
        pagePath: "pages/order/index",
        iconPath: "images/order2.png",
        selectedIconPath: "images/order2.png",
        text: "订单中心"
      },
      {
        pagePath: "pages/study/index",
        iconPath: "images/study1.png",
        selectedIconPath: "images/study1.png",
        text: "荔学院"
      },
      {
        pagePath: "pages/mine/index",
        iconPath: "images/mine1.png",
        selectedIconPath: "images/mine1.png",
        text: "我的"
      }
    ]
  }
}
