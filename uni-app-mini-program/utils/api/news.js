/**
 * 新闻咨询栏目相关接口
 */

import request from './request.js'

/**
 * 判断网络请求成功的校验
 */
export { isRequestSuccess } from './request.js';

/**
 * 获取banner轮播图
 */
export const getBanners = data => {
  return request({
    data
  })
}

/**
 * 获取列表数据
 */
export const getListData = data => {
  return request({
    data
  })
}
