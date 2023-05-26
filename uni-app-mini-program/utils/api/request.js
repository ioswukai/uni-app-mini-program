/**
 * 封装请求模块
 */

// 导入数据容器，获取用户信息
import store from '../store/index.js'
// 获取网址信息
import network from '../globalConfig/network.js'
import adapterDINGTALK from '../../utils/adapterDINGTALK/index.js'

/*
* @param url 网址
* @param method 请求方法，默认是'GET'
* @param params Query中的请求参数，默认是空对象{}
* @param data Body中的请求参数，默认是空对象{}
* @param needAuth 请求是否需要携带token，默认是false不需要
* @param needShowToast 请求报错后是否需要toast错误信息，默认是true需要toast错误信息
 */
export default ( 
    {
	  url = network.host,
      method = 'GET',
      params = {},
      data = {},
	  needAuth = false,
	  needShowToast = true,
    } = {}) => {
	
	// 函数作用域内变量
	const user = store.state.user;
	const config = beforeRequest();
	
	// 请求拦截器，请求之前做的操作
	function beforeRequest() {
		// 获取请求配置对象，具体值参考uni-app文档
		let config = {}
		config.method = method;
		config.data = data;
		config.params = params;
		
		// 配置header
		const header = {};
		config.header = (method == 'POST') ? {...header, 'Content-Type': 'application/x-www-form-urlencoded'} : header;
		
		// 配置url
		config.url = url;
		if (user && user.auth && user.uid) {
		  // 用户已登录
		   config.url += `&api_auth_code=${user.auth}&api_auth_uid=${user.uid}`
		}
		
		config = adapterDINGTALK.httpConfig(config)
		return config;
	}
	
	// 响应拦截器
	function beforeResponse(res) {
		if (res.data) {
			// 只返回data数据就行，data包括code, msg, data
			res = res.data
		}
		
		// 打印报文
		logInfo(res)
		
		// 登录接口，存储登录信息
		if(config.url.includes('&c=login')){ 
			store.commit('setUser', res.data)
		}
		
		const err = res.msg;
		if (res.code == 401) {
			// token过期报错，提示用户登录
			errorHandle(err);
			
			// 弹出登录页面
			redirectLogin()
		} else if (res.code <= 0) {
			// 操作错误
			errorHandle(err);
		}
		
		// 返回数据，
		return res
	}
	
	// 异常处理器
	function errorHandle(err) {
		// 打印错误报文
		logInfo(err, true)
		
		if (needShowToast) {
			adapterDINGTALK.showToast({
				title: err,
				position: 'center',
				duration: 1000
			});
		}
	}
		
	// 重新登录
	function redirectLogin() {
		const pages = getCurrentPages();
		const currentPage = pages[pages.length - 1];
		uni.redirectTo({
			// 页面的路径，路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，
			// 不同参数用&分隔；如 'path?key=value&key2=value2'
			url: `pages/login/index?redirect=${currentPage.route}`
		})
	}
	
	// 打印信息
	function logInfo(res, isError = false) {
		try {
		  
		  // 可解析就解析，不可则返回原始数据
		  res = JSON.stringify(res, null, 2)
		} finally {
			
			// 打印信息
			const params = (JSON.stringify(config.params) !== '{}') ? config.params : config.data;
			let header = config.header
			if (JSON.stringify(config.header) === '{}' 
				&& config.headers) {
				 // 当header为空，且headers存在的时候
				 header = config.headers;
			}
			console.log('\n==================================',
			isError ? 'ERROR' : 'START',
			'===================================',
			'\n>>>>header:\n',
			JSON.stringify(header, null, 2),
			'\n>>>>网络请求地址:\n',
			config.url,
			'\n>>>>请求方式及请求参数:\n',
			`${config.method} : ${JSON.stringify(params, null, 2)}`,
			'\n>>>>返回结果\n',
			res,
			'\n===================================END===================================\n\n\n\n\n\n\n\n');
		}
	}
	
	// 创建一个请求的Promise对象，在里面发起请求
	return new Promise((resolve, reject) => {
		// 需要登录 且用户未登录
		if (needAuth 
			&& (!user || !user.auth || !user.uid)) {
				// 提示用户登录
				const err = '请先登录';
				errorHandle(err);
				reject(err); 
			  
				// 弹出登录页面
				redirectLogin()
				// 后面的操作不用执行
				return;
		}
		
		// 1. new Promise初始化promise实例的状态为pending
		adapterDINGTALK.request({
			...config, //对象解构
			success: (res) => {	      
				res = beforeResponse(res)
				resolve(res); // resolve修改promise的状态为成功状态resolved
			},
			fail: (err) => {
				errorHandle(err);
				reject(err); // reject修改promise的状态为失败状态 rejected
			}
		})
	})  
}  