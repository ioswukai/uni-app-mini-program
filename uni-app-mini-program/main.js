import App from './App'
import { createSSRApp } from 'vue'
// 封装vuex
import store from './utils/store/index.js'
// 常量
import globalConfig from './utils/globalConfig/index.js'

export function createApp() {
  const app = createSSRApp(App)
  
  // 定义全局属性
  app.config.globalProperties.globalConfig = globalConfig
  
  // 使用vuex
  app.use(store)
  
  return {
    app
  }
}
