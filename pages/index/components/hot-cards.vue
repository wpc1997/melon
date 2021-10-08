<template>
	<view class="hot-cards">
		<view class="hot-cards-card" @tap="toChannelRoom">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
			<text class="text-sm">闲置小组</text>
			<text class="text-xs">8111个帖子</text>
		</view>
		<view class="hot-cards-card">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
			<text class="text-sm">你有啥想问的</text>
			<text class="text-xs">4257个帖子</text>
		</view>
		<view class="hot-cards-card">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
			<text class="text-sm">今天吃什么</text>
			<text class="text-xs">854567个帖子</text>
		</view>
		<view class="hot-cards-card">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
			<text class="text-sm">美妆护肤心得</text>
			<text class="text-xs">14453个帖子</text>
		</view>
		<view class="hot-cards-card">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
			<text class="text-sm">今天穿什么</text>
			<text class="text-xs">5445个帖子</text>
		</view>
		<view class="hot-cards-card">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
			<text class="text-sm">不能一个人</text>
			<text class="text-xs">15534个帖子</text>
		</view>
		<view class="hot-cards-card">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
			<text class="text-sm">闲置小组</text>
			<text class="text-xs">8111个帖子</text>
		</view>
		<view class="hot-cards-card">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
			<text class="text-sm">闲置小组</text>
			<text class="text-xs">8656个帖子</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			toChannelRoom(){
				uni.navigateTo({
					url:'/pages/channel/channel-room'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-cards{
		display: flex;
		overflow-x: scroll;
		flex-wrap: nowrap;
		.hot-cards-card:nth-of-type(1){
			margin-left: 24upx!important;
		}
		.hot-cards-card:last-child{
			padding-right: 24upx;
		}
		.hot-cards-card{
			display: flex;
			flex-flow: column;
			margin-left: 24upx;
			image{
				width: 180upx;
				height: 130upx;
				border-radius: 16upx;
			}
			>text:nth-of-type(1){
				margin-top: 10upx;
				font-weight: 500;
			}
			>text:nth-of-type(2){
				font-weight: 400;
				color: #888888;
			}
		}
	}
</style>
