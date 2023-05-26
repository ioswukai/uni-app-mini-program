/**
 * 封装本地存储操作模板
 */

/**
 * 存储
 */
export const setItem = (key, value) => {
  // 存储数组，或对象 转换为JSON格式字符串存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  uni.setStorageSync(key, value)
}

/**
 * 获取
 */
export const getItem = key => {
  const data = uni.getStorageSync(key)
  try {
    // 可解析就解析
    return JSON.parse(data)
  } catch (err) {
    // 不可则返回原始数据
    return data
  }
}

/**
 * 删除
 */
export const removeItem = key => {
  uni.removeStorageSync(key)
}
