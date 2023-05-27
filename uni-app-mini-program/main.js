import App from './App'
import Vue from 'vue'
import './uni.promisify.adaptor'
// 封装vuex
import store from './utils/store/index.js'
// 全局常量
import globalConfig from './utils/globalConfig/index.js'

Vue.config.productionTip = false

// 定义全局属性
Vue.prototype.$store = store
Vue.prototype.$globalConfig = globalConfig

App.mpType = 'app'
const app = new Vue({
	store,
  ...App
})
app.$mount()
