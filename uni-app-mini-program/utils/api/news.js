/**
 * 新闻咨询栏目相关接口
 */

import request from './request.js'

/**
 * 获取banner轮播图
 */
export const getBanners = params => {
  return request({
    params
  })
}