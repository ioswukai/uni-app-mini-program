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
				// 	api_call_function: 'category_list',
				// };
				
				// 新闻资讯 列表
				// const data = {
				// 	s: 'news', 
				// 	c: 'search', 
				// 	// 新闻资讯的栏目id
				// 	catid: '42',
				// 	page: 1,
				// 	pagesize: network.pagesize,
				// 	api_call_function: 'category_list',
				// };
				
				// 详情页
				const data = { 
					c: 'show', 
					// 文章id
					id: '28', 
					api_call_function: 'content_detail'}
				
				
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
