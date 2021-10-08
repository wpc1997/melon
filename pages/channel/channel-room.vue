<template>
	<view class="channel-room">
		<view class="channel-room-nav">
			<cu-custom bgColor="bg-gradual-opacity" :isBack="true" backColor="#ffffff"></cu-custom>
		</view>

		<!-- 小组顶部详情 -->
		<view class="channel-room-head" :style="{paddingTop:(CustomBar+12)+'px'}">
			<view class="hannel-room-head">
				<view class="channel-room-head-title">
					<text class="text-xl">交换私藏店铺</text>
				</view>
				<view class="channel-room-head-description">
					<text class="text-sm">分享你收藏夹里的私藏店铺</text>
				</view>
				<view class="channel-room-head-info">
					<text class="text-sm">58420人关注 | 2917个帖子</text>
					<view class="text-sm">关注</view>
				</view>
				<view class="channel-room-head-user">
					<view>
						<image class="avatar" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg">
						</image>
					</view>

					<text class="text-sm name">种草莓的西瓜</text>
					<view class="text-xs">
						管理员
					</view>
					<text class="cuIcon-right text-sm"></text>
				</view>
			</view>


			<!-- 背景图 -->
			<image class="channel-room-head-background"
				src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg">
			</image>
		</view>

		<!-- 内容切换的tabs栏 -->
		<view class="channel-room-tab" :style="{top:(CustomBar?CustomBar+'px':'84px')}">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item text-df text-custom-weight"
					:class="index==TabCur?'text-deep-black cur':'text-custom-gray'" v-for="(item,index) in tabs"
					:key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
		</view>

		<!-- 内容 -->
		<view class="channel-room-content">
			<dynamic></dynamic>
		</view>

	</view>
</template>

<script>
	
	import dynamic from "@/components/dynamic.vue";
	
	export default {
		components:{
			dynamic
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				tabs: [{
						name: '最新'
					},
					{
						name: '热门'
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.channel-room {
		
		&-nav {
			position: fixed;
			z-index: 9999;
		}

		&-head {
			position: relative;
			padding: 24upx 24upx 0 24upx;
			background-color: rgba(26, 36, 49, 0.5);

			&-background {
				top: 0;
				left: 0;
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: -1;
			}

			>view {
				.channel-room-head-title {
					text {
						color: #FFFFFF;
						font-weight: 500;
					}
				}

				.channel-room-head-description {
					margin-top: 12upx;

					text {
						color: #F1F3F4;
					}
				}

				.channel-room-head-info {
					margin-top: 36upx;
					padding-bottom: 24upx;
					border-bottom: 1px solid #888888;
					display: flex;
					justify-content: flex-start;

					text {
						color: #F1F3F4;
					}

					view {
						padding: 6upx 30upx;
						border-radius: 8upx;
						background-color: #E2585A;
						color: #FFFFFF;
						margin-left: auto;
					}
				}

				.channel-room-head-user {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 24upx 0;

					>view:first-child {
						image.avatar {
							width: 45upx;
							height: 45upx;
							border-radius: 50%;
						}
					}

					.text-sm {
						color: #F1F3F4;
					}

					.name {

						margin-left: 12upx;
					}

					>view:nth-of-type(2) {
						display: flex;
						margin-left: 24upx;
						align-items: center;
						justify-content: center;
						color: #FFFFFF;
						padding: 3upx 8upx;
						border-radius: 30upx;
						background-color: #444444;
					}

					>text:last-child {
						margin-left: auto;
					}
				}
			}

		}
	
		&-tab{
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
			padding-top: 24upx;
		}
		
	}
</style>
