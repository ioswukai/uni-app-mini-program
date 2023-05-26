/**
 * 为了适配兼容钉钉小程序，做的条件判断
 */

export default {
	/**
	 * 网络请求
	 */
	request: (obj) => {
		// #ifndef MP-DINGTALK
		// 非钉钉
		 uni.request(obj);
		// #endif
		
		// #ifdef APP-DINGTALK
		// 钉钉
		dd.httpRequest(obj);
		// #endif
	},
	/**
	 * 网络请求的配置对象
	 */
	httpConfig: (config) => {
		// #ifdef MP-DINGTALK
		// 钉钉
		// Content-Type为application/x-www-form-urlencoded即默认的接口请求方式
		// 当Content-Type为application/json时，data参数只支持json字符串，
		// 用户需要手动调用JSON.stringify进行序列化 data: JSON.stringify({ from: '钉钉', production: 'DingTalk',}),
		// 钉钉小程序只支持headers，清空header
		config.headers = config.header;
		config.header = {};
		// 数据不支持params，只支持data，清空params
		config.data = {
			...params,
		 	...data
		}
		config.params = {};
		// 数据类型为json
		config.dataType = 'json'
		// #endif
		
		return config;
	},
	/**
	 * toast内容
	 */
	showToast: (obj) => {
		// #ifndef MP-DINGTALK
		// 非钉钉
		uni.showToast(obj);
		// #endif
		
		// #ifdef APP-DINGTALK
		// 钉钉
		// 没有position参数，content就是title参数
		obj.position = null;
		obj.content = obj.title;
		obj.title = null;
		dd.showToast(obj);
		// #endif
	},
}