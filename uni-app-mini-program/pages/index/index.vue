<template>
	<view class="container">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	
	import request from '../../utils/api/request.js'
import network from '../../utils/globalConfig/network.js';
	
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this.getBannersData();
		},
		methods: {
			async getBannersData() {
				// 公告资讯 列表
				// const data = {
				// 	s: 'news', 
				// 	c: 'search', 
				// 	// 公告资讯的栏目id
				// 	catid: '13', 
				// 	api_call_function: 'news_category_content_list',
				// };
				
				// 新闻资讯 列表
				// const data = {
				// 	s: 'news', 
				// 	c: 'search', 
				// 	// 新闻资讯的栏目id
				// 	catid: '17',
				// 	page: 1,
				// 	pagesize: network.pagesize,
				// 	api_call_function: 'news_category_content_list',
				// };
				
				// 亲亲讲堂--文博知识 列表
				// const data = {
				// 	s: 'news', 
				// 	c: 'search', 
				// 	// 文博知识的栏目id
				// 	catid: '5',
				// 	page: 1,
				// 	pagesize: network.pagesize,
				// 	api_call_function: 'news_category_content_list',
				// };
				
				// 亲亲讲堂--学生作品 列表
				// const data = {
				// 	s: 'news', 
				// 	c: 'search', 
				// 	// 学生作品的栏目id
				// 	catid: '6',
				// 	page: 1,
				// 	pagesize: network.pagesize,
				// 	api_call_function: 'news_category_content_list',
				// };
				
				// 亲亲讲堂--文博讲堂 列表
				// const data = {
				// 	s: 'news', 
				// 	c: 'search', 
				// 	// 文博讲堂的栏目id
				// 	catid: '2',
				// 	page: 1,
				// 	pagesize: network.pagesize,
				// 	api_call_function: 'news_category_content_list',
				// };
				
				// 常见问答 列表
				// const data = {
				// 	s: 'news', 
				// 	c: 'search', 
				// 	// 常见问答的栏目id
				// 	catid: '3',
				// 	page: 1,
				// 	pagesize: network.pagesize,
				// 	api_call_function: 'news_category_content_list',
				// // };
				
				// 互动问答-栏目分类 列表
				// const data = {
				// 	s: 'wenda',
				// 	c: 'search', 
				// 	// 互动问答的栏目id
				// 	catid: '14',
				// 	page: 1,
				// 	pagesize: network.pagesize,
				// 	api_call_function: 'category_list',
				// };
				
				// 互动问答-各子栏目 列表
				// const data = {
				// 	s: 'wenda', 
				// 	c: 'search', 
				// 	// 互动问答-子栏目id
				// 	catid: '15',
				// 	page: 1,
				// 	pagesize: network.pagesize,
				// 	api_call_function: 'wenda_category_content_list',
				// };
				
				// 文章详情页
				// const data = { 
				// 	c: 'show', 
				// 	// 文章内容id
				// 	id: '25', 
				// 	api_call_function: 'news_content_detail'
				// }
				
				// 问答详情页
				const data = { 
					c: 'show', 
					// 问答内容id
					id: '25', 
					api_call_function: 'wenda_content_detail',
				}
				
				
				const res = await request({data});
				if (res.isResultCodeSuccess) {
				  // 网络请求成功
				  const banners = data.data;
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
