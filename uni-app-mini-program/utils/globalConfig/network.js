/**
 * 全局配置的 网络请求相关信息
 */

// 基本信息
const baseInfo = {
	// 域名
	domain: 'https://demo.chuan-yang.cn',
	// 迅睿接口id
	xrAppid: '1',
	// 迅睿appsecret
	xrAppsecret: 'PHPCMF43AA4298C53E5',
}

export default {
  // 基本网址
  host: `${baseInfo.domain}/index.php?v=1&appid=${baseInfo.xrAppid}&appsecret=${baseInfo.xrAppsecret}`,
  // 栏目的接口的id号
  categoryApiID: '2',
  // banner接口的id号
  bannerApiID: '1',
  pagesize: '10',
}
