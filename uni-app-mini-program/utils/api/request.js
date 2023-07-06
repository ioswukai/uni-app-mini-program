/**
 * 封装请求模块
 */

// 导入数据容器，获取用户信息
import store from '../store/index.js'
// 获取网址信息
import network from '../globalConfig/network.js'
import adapterDINGTALK from '../../utils/adapterDINGTALK/index.js'

/**
 * 判断业务操作code是否成功
 */
export function judgeIsCodeSuccess(res) {
	if (res.code <= 0) {
		// code大于0是成功，为0是失败
		return false;
	}
	
	// code成功
	return true;
}

/*
* @param url 网址
* @param method 请求方法，默认是'GET'
* @param data 请求参数，默认是空对象{}
* @param needAuth 请求是否需要携带token，默认是false不需要
* @param hideAllToast 请求报错后是否需要toast错误信息，默认是false需要toast错误信息
 */
export default ( 
    {
	  url = '',
      method = 'GET',
      data = {},
	  needAuth = false,
	  hideAllToast = false,
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
		
		// 配置header
		const header = {};
		config.header = (method == 'POST') ? {...header, 'Content-Type': 'application/x-www-form-urlencoded'} : header;
		
		// 配置url
		config.url = network.host + url;;
		if (user && user.auth && user.uid) {
		  // 用户已登录
		   config.url += `&api_auth_code=${user.auth}&api_auth_uid=${user.uid}`
		}
		
		config = adapterDINGTALK.httpConfig(config)
		// 配置data
		config.data.s = 'httpapi';	
		return config;
	}
	
	// 响应拦截器
	function beforeResponse(res) {
		// 打印报文
		logInfo(res)
		
		if (res.data) {
			// 只返回data数据就行，data包括code, msg, data
			res = res.data
		}
				
		// 登录接口，存储登录信息
		if(config.url.includes('&c=login')){ 
			store.commit('setUser', res.data)
		} 
		
		// 返回数据，
		return res
	}
	
	// 异常处理器
	function errorHandle(err) {
		if (isRequestSuccess == false) {
			// 网络请求失败
			err = "网络出了个小差，请稍后再试"
			// 打印错误报文
			logInfo(err, true)
		}
		if (hideAllToast == false) {
			adapterDINGTALK.showToast({
				title: err,
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
		  if (JSON.stringify(res)) {
		  	// 漂亮模式输出
		  	res = JSON.stringify(res, null, 2);
		  }
		} finally {
			
			// 打印信息
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
			'\n\n>>>>网络请求地址:\n',
			config.url,
			'\n\n>>>>请求方式及请求参数:\n',
			`${config.method} : ${JSON.stringify(config.data, null, 2)}`,
			'\n\n>>>>返回结果\n',
			res,
			'\n===================================END===================================\n\n\n\n');
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
		
		// 1. new Promise初始化promise实例的状态为pending，显示loading
		if (hideAllToast == false) {
			uni.showLoading({
				title: '加载中',
			})
		}
		adapterDINGTALK.request({
			...config, //对象解构
			success: (res) => {	  
				// 网络请求成功，隐藏loading
				uni.hideLoading()
				res = beforeResponse(res)
				if ((res instanceof Object) == false) {
					// res非对象，比如返回了html的字符串
					const obj = {};
					obj.msg = "网络出了个小差，请稍后再试";
					res = obj;
					res.isRequestSuccess = true;
					res.isResultCodeSuccess = false;
					// 网络请求成功了，但是返回的不是JSON对象
					errorHandle(res.msg);
					reject(res); // reject修改promise的状态为失败状态 rejected
					// 下面的代码不用执行
					return
				}
				
				res.isRequestSuccess = true;
				// 判断业务操作code是否成功
				const err = res.msg;
				 if (judgeIsCodeSuccess(res) == false) {
					// code返回非成功
					errorHandle(err);
					res.isResultCodeSuccess = false;
				
					reject(res); // reject修改promise的状态为失败状态 rejected
				} 
				// else if (res.code == 401) {
				// token是根据密码来的，只有密码不变，token就不会过期
				// 所以只用在退出登录，或更改密码时，清空下本地信息就可以了
				// token过期报错，提示用户登录
				// 	errorHandle(err);
				// reject(err); // reject修改promise的状态为失败状态 rejected
				// 	// 弹出登录页面
				// 	redirectLogin()
				// }
				else {
					// code返回成功
					res.isResultCodeSuccess = true;

					resolve(res); // resolve修改promise的状态为成功状态resolved
				}
			},
			fail: (err) => {
				// 网络请求失败，隐藏loading
				uni.hideLoading()
				let res = err;
				if ((err instanceof Object) == false) {
					// err非对象
					const obj = {};
					obj.msg = res;
					res = obj;
				}
				res.isRequestSuccess = false;
				res.isResultCodeSuccess = false;
				
				errorHandle(res, res.isRequestSuccess);
				reject(res); // reject修改promise的状态为失败状态 rejected
			}
		})
	})  
}  