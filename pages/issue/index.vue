<template>
	<view class="content" :class="{'active':active}">
		
		<!-- 发布窗口 -->
		<view class="content-popup" :class="active?'animate-popup':''">
			<view class="text-xl text-custom-weight text-deep-black">发布</view>
			
			<view class="content-popup-list">
				<view @tap="toIssue('1')">
					<image src="../../static/img/issue-unused.png"></image>
					<text class="text-deep-black text-df">闲置</text>
				</view>
				<view @tap="toIssue('2')">
					<image src="../../static/img/issue-image.png"></image>
					<text class="text-deep-black text-df">图文</text>
				</view>
				<view @tap="toIssue('3')">
					<image src="../../static/img/issue-group.png"></image>
					<text class="text-deep-black text-df">小组</text>
				</view>
			</view>
		</view>
		
		<!-- <view class="content-list">
			<view @tap="toIssueImages">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"></image>
				<view>
					<text class="text-lg">发图文</text>
					<text class="text-df">分享新鲜事</text>
				</view>
			</view>
			<view>
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"></image>
				<view>
					<text class="text-lg">发闲置</text>
					<text class="text-df">30s发布宝贝</text>
				</view>
			</view>
			<view>
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"></image>
				<view>
					<text class="text-lg">安利宝贝</text>
					<text class="text-df">大家好才是真的好</text>
				</view>
			</view>
		</view>
		<view class="content-close" @tap="close">
			<text class="cuIcon-close"></text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: false
			};
		},
		onLoad() {},
		onShow() {
			// setTimeout(() => {
			this.active = true;	
			// }, 500);
		},
		onHide() {
			this.active = false;
		},
		methods: {
			close(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			
			//跳转至发布图文页
			toIssue(type){
				if(type!='3'){
					uni.navigateTo({
						url:'/pages/issue/issue-dynamic?type='+encodeURIComponent(type)
					})
				}else{
					uni.navigateTo({
						url:'/pages/issue/create-group'
					})
				}
				
			}
		}
	};
</script>

<style lang="scss" scoped>
	.animate-popup{
		bottom: 0upx!important;
	}
	
.content {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	/* #ifdef H5 */
	height: calc(100vh - var(--window-bottom) - var(--window-top));
	/* #endif */
	/* #ifndef H5 */
	height: 100vh;
	/* #endif */
	transition: opacity 1000ms;
	background: rgba(0,0,0,0.3);
	opacity: 0;
	&-popup{
		position: fixed;
		width: 100vw;
		bottom: -700upx;
		height: 700upx;
		transition: 500ms ease;
		background-color: #FFFFFF;
		border-top-right-radius: 12upx;
		border-top-left-radius: 12upx;
		>view:first-child{
			height: 150upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		
		&-list{
			margin-top: 24upx;
			display: flex;
			>view{
				display: flex;
				flex-flow: column;
				align-items: center;
				flex: 1;
				>image{
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
				}
				>text{
					margin-top: 24upx;
				}
			}
			>view:nth-of-type(2){
				flex: 1.8;
			}
		}
	}
	&-list{
		>view{
			margin-top: 80upx;
			display: flex;
			image{
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
			}
			>view{
				margin-left: 24upx;
				flex: 1;
				display: flex;
				flex-flow: column;
				align-items: flex-start;
				justify-content: center;
				>text:first-child{
					color: #FFFFFF;
					font-weight: 500;
				}
				>text:last-child{
					margin-top: 16upx;
					color: #888888;
				}
			}
		}
	}
	
	&-close{
		position: absolute;
		bottom: 100upx;
		left: 50%;
		transform: translateX(-50%);
		background-color: #FFFFFF;
		border-radius: 16upx;
		padding: 16upx;
		text{
			color: #333333;
			font-weight: bolder;
		}
	}
	
	&.active {
		opacity: 1;
	}
	.logo {
		position: relative;
		margin-top: -400upx;
		width: 200upx;
		height: 200upx;
		// z-index: -1;
		opacity: 0;
		transition: opacity 0.3s;
		&.active {
			opacity: 1;
		}
	}
}
.tabbar-box-wrap {
	position: absolute;
	width: 100%;
	padding: 50upx;
	box-sizing: border-box;
	bottom: 0;
	left: 0;
	.tabbar-box {
		position: relative;
		display: flex;
		width: 100%;
		background: #fff;
		border-radius: 20upx;
		padding: 15upx 20upx;
		box-sizing: border-box;
		z-index: 2;
		box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
		&:after {
			content: '';
			position: absolute;
			bottom: -16upx;
			left: 0;
			right: 0;
			margin: auto;
			width: 50upx;
			height: 50upx;
			transform: rotate(45deg);
			background: #fff;
			z-index: 1;
			box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
			border-radius: 2px;
		}
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #ffffff;
			border-radius: 20upx;
			z-index: 2;
		}
		.tabbar-box-item {
			// position: relative;
			width: 100%;
			z-index: 3;
			margin: 10upx;
			color: $uni-color-subtitle;
			text-align: center;
			font-size: $uni-font-size-base;
			.box-image {
				width: 100%;
				height: $uni-img-size-lg;
			}
		}
	}
}
</style>
