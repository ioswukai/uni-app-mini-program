/**
 * 为了适配兼容钉钉小程序，做的条件判断
 * !
 * !!!!!不知道为什么 MP-DINGTALK的环境变量没有生成，
 *      导致#ifndef  MP-DINGTALK，和#ifdef MP-DINGTALK里的代码块
 *      都不会被打包编译进unpackage/dist/dev或build的目标文件中
 * 		这里就使用微信平台来判断了
 *  !!!!!
 */

export default {
	/**
	 * 网络请求
	 */
	request: (obj) => {
		// #ifdef MP-WEIXIN
		// 微信
		 uni.request(obj);
		// #endif
		
		// #ifndef MP-WEIXIN
		// 非微信，即钉钉
		dd.httpRequest(obj);
		// #endif
	},
	/**
	 * 网络请求的配置对象
	 */
	httpConfig: (config) => {
		// #ifndef MP-WEIXIN
		// 非微信，即钉钉
		// Content-Type为application/x-www-form-urlencoded即默认的接口请求方式
		// 当Content-Type为application/json时，data参数只支持json字符串，
		// 用户需要手动调用JSON.stringify进行序列化 data: JSON.stringify({ from: '钉钉', production: 'DingTalk',}),
		// 非微信，即钉钉小程序只支持headers，清空header
		config.headers = config.header;
		config.header = {};
		// 数据类型为json
		config.dataType = 'json'
		// #endif
		
		return config;
	},
	/**
	 * toast内容
	 */
	showToast: (obj) => {
		// 显示时长
		obj.duration = 1000,
		
		// #ifdef MP-WEIXIN
		// 微信
		obj.position = 'center',
		uni.showToast(obj);
		// #endif
		
		// #ifndef MP-WEIXIN
		// 非微信，即钉钉
		obj.content = obj.title;
		dd.showToast(obj);
		// #endif
	},
}