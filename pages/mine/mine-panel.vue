<template>
	<view class="mine-panel">
		<cu-custom bgColor="bg-gradual-white" :isBack="true"></cu-custom>

		<!-- 用户信息 -->
		<view class="mine-panel-head">
			<view class="mine-panel-head-left">
				<view class="name">
					<text class="text-lg">种草莓的西瓜</text>
				</view>
				<view class="description">
					<text class="text-sm">暂无个人简介</text>
				</view>
			</view>
			<view class="mine-panel-head-right">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg"></image>
			</view>
		</view>

		<!-- 关注、粉丝等 -->
		<view class="mine-panel-list">
			<view class="list">
				<view>
					<text class="text-lg">7</text>
					<text class="text-sm">关注</text>
				</view>
				<view>
					<text class="text-lg">0</text>
					<text class="text-sm">粉丝</text>
				</view>
				<view>
					<text class="text-lg">1</text>
					<text class="text-sm">等级</text>
				</view>
			</view>

			<view class="edit">
				<view class="edit-btn text-df" @tap="toAboutMe">编辑资料</view>
			</view>
		</view>

		<!-- 与我相关 -->
		<view class="mine-panel-tab" :style="{top:(CustomBar?CustomBar+'px':'84px')}">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item text-df text-custom-weight" :class="index==TabCur?'text-deep-black cur':'text-custom-gray'" v-for="(item,index) in tabs" :key="index"
					@tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
		</view>

		<!-- 动态 -->
		<view class="mine-panel-content">
			
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				tabs:[
					{
						name:'主页'
					},
					{
						name:'足迹'
					}
				],
				TabCur: 0,
				scrollLeft: 0
			}
		},
		methods: {
			//tab栏切换函数
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			
			//跳转到编辑资料页面
			toAboutMe(){
				uni.navigateTo({
					url:'/pages/mine/about-me'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine-panel {
		min-height: 100vh;
		background-color: #F1F1F1;
		&-head {
			padding: 24upx;
			display: flex;

			background-color: #FFFFFF;
			&-left {
				padding-top: 12upx;
				flex: 1;
				padding-right: 24upx;

				.name {
					text {
						line-height: 64upx;
						font-weight: 500;
						color: #222222;
					}
				}

				.description {
					color: #888888;
					display: -webkit-box;
					overflow: hidden;
					line-height: 32upx;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
				}
			}

			&-right {
				image {
					width: 200upx;
					height: 200upx;
					border-radius: 50%;
				}
			}
		}

		&-list {
			padding: 0upx 24upx 36upx 0;
			display: flex;

			background-color: #FFFFFF;
			.list {
				display: flex;
				flex: 1.2;

				view {
					flex: 1;
					display: flex;
					justify-content: center;
					flex-flow: column;
					align-items: center;

					text:first-child {
						font-weight: 500;
						color: #222222;
					}

					text:last-child {
						margin-top: 8upx;
						color: #888888;
					}
				}
			}

			.edit {
				display: flex;
				flex: 1;
				align-items: center;
				justify-content: flex-end;

				.edit-btn {
					padding: 10upx 0;
					width: 200upx;
					color: #FFFFFF;
					text-align: center;
					background-color: #333333;
					border-radius: 8upx;
				}
			}
		}

		&-tab{
			background-color: #FFFFFF;
			position: sticky;
			
			.nav{
				padding-left: 15upx;
				position: relative;
				.cu-item{
					text-align: center;
					margin: 0 20upx;
				}
			}
		}
		
		&-content{
			height: 200vh;
		}

	}
</style>
