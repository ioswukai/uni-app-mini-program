<!--
  文件描述：空的模板页面
  创建人：wk
-->

<template>
	<view class="container">
		<u-message-input @change="change" @finish="finish"></u-message-input>
	</view>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 例如：import uploadFile from '@/components/uploadFile/uploadFile'

import { isRequestSuccess } from '../../utils/api/news.js'


export default {
  name: 'emptyIndex',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 从父组件传递的数据
  props: {
	  // propsName: {
		 //  type: String,
		 //  default: '',
		 //  required: false
	  // }
  },
  // 这里存放实例自身数据
  data() {
	  return {
		  
	  };
  },
  // 方法集合
  methods: {
	  change(e) {
			console.log('内容改变，当前值为：' + e);
		},
	  finish(e) {
			console.log('输入结束，当前值为：' + e);
		},
  },
  // 监听页面加载，其参数为上个页面传递的数据
  onLoad: function (options) {
	  //打印出上个页面传递的参数。
	  //  console.log(option.name); 
	  console.log(this.$u.config.v);
  },
  // 监听页面显示。页面每次出现在屏幕上都触发，
  // 包括从下级页面点返回露出当前页面
  onShow: function () {
	  
  },
  // 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady: function () {
  	  
  },
  // 监听页面隐藏
  onHide: function () {
	  
  },
  // 监听页面卸载
  onUnload: function () {
	  
  },
  // 监听页面返回，返回 event = {from:backbutton、 navigateBack} ，
  // backbutton 表示来源是左上角返回按钮或 android 返回键；
  // navigateBack表示来源是 uni.navigateBack 
  onBackPress: function (e) { 
	  // if (e.from === 'navigateBack') {  
		 //  return false;  
	  // } 
	  // // 返回
	  // uni.navigateBack({  
		 //  delta: 2  
	  // }); 
	  return true;  
  },
  // 点击 tab 时触发，参数为onTabItemTap的对象
  onTabItemTap: function (e) {
	  // e的返回格式为json对象： 
	  // {"index":0,"text":"首页","pagePath":"pages/index/index"}
	  // console.log(e);
  },
  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: this.$globalConfig.constKey.shareInfo.shareTitle,
      path: this.$globalConfig.constKey.shareInfo.homePath,
      success: function (res) {// 转发成功 回调
      },
      fail: function (res) {// 转发失败 回调
      }
    };
  },
  // 监听用户点击右上角转发到朋友圈
  onShareTimeline: function () {
    return {};
  }, 
  // 监听用户点击右上角收藏
  onAddToFavorites: function () {
    return {};
  }, 
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>