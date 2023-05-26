<!--
  文件描述：空的模板页面
  创建人：wk
-->

<template>
	<view>
		<text >我是空的模板页面</text>
	</view>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 例如：import uploadFile from '@/components/uploadFile/uploadFile'

import { getListData, isRequestSuccess } from '../../utils/api/news.js'


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
		  page: 1, 
		  list: [], // 数组数据
		  finished: false, // 控制数据 加载结束（没有更多了 ）状态的显隐
		  loading: true, // 控制 加载中 loading状态的显隐
		  error: false, // 控制列表 加载失败 的提示状态的显隐
		  isRefreshLoading: false, // 控制 下拉刷新的loading 状态的显隐
		  refreshSuccessText: '刷新成功', // 下拉刷新成功提示文本，先写个默认值，防止什么都没写
    };
  },
  // 监听用户下拉动作，一般用于下拉刷新
  onPullDownRefresh: function () {
    this.loadListData();
  },
  // 页面滚动到底部的事件（不是scroll-view滚到底），
  // 常用于下拉下一页数据。具体见下方注意事项
  onReachBottom: function () {
    this.refreshListData()
  },
  // 方法集合
  methods: {
	  // 当下拉刷新的时候，会触发该函数
	  // 触发时，isRefreshLoading会自动设置为true
	  async refreshListData () {
		// 重置page
		this.page = 1;
	    // 还是调用loadListData方法，传递isRefreshAction=true
	    await this.loadListData(true)
	  },
	  
	  // 初始化或滚动到底部的时候，会触发 loadListData事件
	  // 初次请求数据没有铺满整屏幕，则会触发多次
	  // 触发loadListData时，组件会自动把loading设置为true
	  // isRefreshAction，true为刷新操作，否则加载更多
	  async loadListData (isRefreshAction) {
	    try {
	      // 1. 请求获取网络数据
	      const results = await getListData({
					page: this.page,
					pagesize: this.globalConfig.network.pagesize,
				});
		  
	      if (this.finished === false) {
			  // 2. 判断数据是否全部加载完成，
			  // 如果没有数据了，把finished设置为true，之后
			  // 不再触发加载更多
			  if (isRequestSuccess(results) 
			  				&& results.data && results.data.length < this.page) {
			  			  // 网络请求成功，二维数组里的每个数据元素都是一页数据
			  			  this.finished = true
			  } else if (results.code == 'rest_post_invalid_page_number') {
			  			  // 报错，无效page_number
			  			  this.finished = true
			  } 
			  // 页面累加
			  this.page += 1;
			  
			  
	        // 清空之前的数据
			this.list.length = 0
			// 将二维数组压平，赋值给list
	        this.list = this.list.flatMap(row => row);;
	  
	        if (isRefreshAction) {
	          // 下拉刷新操作
	          // 需要清空数组
	          list.length = 0
	          // 更新下拉刷新成功提示的文本 success-duration控制显示时长 默认是500毫秒
	          this.refreshSuccessText = `刷新成功，更新了${this.list.length}条数据`
	  
	          // 手动触发 当数据不满一屏时，连续调用loadListData()的校验
	          // check挪到整个代码的最底下，让页面刷新完，再检查
	          // this.$refs.vanList.check()
	          // setTimeout(this.$refs.vanList.check, 0)
	        }
	      } else {
	        // 没有更多数据时，下拉刷新完成的提示文本
	        this.refreshSuccessText = '暂无数据'
	      }
	    } catch (e) {
	      // 显示错误提示状态
	      this.error = true
	      // 下拉刷新完成的提示文本
	      this.refreshSuccessText = '刷新失败'
	    }
	  
	    // 4. 本次数据加载结束之后，要把加载状态loading置为结束
	    // loading 关闭以后，才能触发下一次加载更多
	    this.loading = false
	    this.isRefreshLoading = false
	  },
  },
  // 监听页面加载，其参数为上个页面传递的数据
  onLoad: function (options) {
	  //打印出上个页面传递的参数。
	  //  console.log(option.name); 
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
      title: this.globalConfig.constKey.shareInfo.shareTitle,
      path: this.globalConfig.constKey.shareInfo.homePath,
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

<style>
@import "./index.css";
</style>