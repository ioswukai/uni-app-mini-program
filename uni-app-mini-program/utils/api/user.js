/**
 * 用户相关请求模块
 */

import request from './request.js'

/**
 * 判断网络请求成功的校验
 */
export { isRequestSuccess } from './request.js';

/**
 * 登录接口
 */
export const login = data => {
  return request({
    method: 'POST',
    data
  })
}
