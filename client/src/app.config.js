export default {
	pages: [
    'pages/index/index',
    'pages/index/organizationAgain/index',
    'pages/index/parentAgain/index',
		'pages/index/other/index',
		'pages/index/organization/index',
		'pages/index/parent/submitInfo/index',
    'pages/order/index',
    'pages/order/details/index',
		'pages/index/parent/intro/index',
		'pages/study/index',
		'pages/study/articlePage/index',
		'pages/mine/index',
		'pages/mine/activate_vip/eula/index',
		'pages/mine/about_us/index',
    'pages/mine/certificate/index',
    'pages/mine/favorite/index',
    'pages/mine/activate_vip/index'
	],
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: '大学生荔教',
		navigationBarTextStyle: 'black'
	},
	cloud: true,
	tabBar: {
		color: '#888888',
		selectedColor: '#FC4442',
		list: [
			{
				pagePath: 'pages/index/index',
				// pagePath: 'pages/order/details/index',
				iconPath: 'images/tabbar/index1.png',
				selectedIconPath: 'images/tabbar/index2.png',
				text: '首页'
			},
			{
				pagePath: 'pages/order/index',
				iconPath: 'images/tabbar/order1.png',
				selectedIconPath: 'images/tabbar/order2.png',
				text: '订单中心'
			},
			{
				pagePath: 'pages/study/index',
				iconPath: 'images/tabbar/study1.png',
				selectedIconPath: 'images/tabbar/study2.png',
				text: '荔学院'
			},
			{
				pagePath: 'pages/mine/index',
				iconPath: 'images/tabbar/mine1.png',
				selectedIconPath: 'images/tabbar/mine2.png',
				text: '我的'
			}
		]
	}
};
