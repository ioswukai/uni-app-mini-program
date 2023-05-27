import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from './storage.js'
import ConstKey from '../globalConfig/constKey.js'

Vue.use(Vuex);

export default new Vuex.Store({
  // 初始化数据
  state: {
    // 一个对象，存储用户信息，包含token和refreshToken等数据
    // 本地存储操作，封装进storage类中
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(ConstKey.storageKey.user),
  },
  // 修改数据，永远通过mutations修改数据，可响应式
  mutations: {
    // 定义一个mutations函数，
    // 其第一个参数时是固定的，为state，
    // 这是Vuex的规则
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失，
      // 我们需要把数据备份到本地存储
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(ConstKey.storageKey.user, state.user)
    },
  },
  // 
  actions: {
  },
  modules: {
  }
})
