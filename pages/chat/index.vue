<template>
	<view class="pages-height">
		<cu-custom bgColor="bg-gradual-white" :isBack="false">
			<block slot="content">消息</block>
		</cu-custom>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<!-- 最近消息-Begin -->
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 最近消息列表
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in recentyList" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
				 @click="hrefChatRoom(item)">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
					<view class="content">
						<view class="text-grey">
							<view class="text-cut">{{item.sendUser.nickname}}</view>
							<view class="cu-tag round bg-topic-theme sm">来自{{item.from}}</view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.text}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.time}}</view>
						<view class="cu-tag round bg-red sm">5</view>
					</view>
					<view class="move">
						<!-- <view class="bg-grey">置顶</view> -->
						<view class="bg-red">删除</view>
					</view>
				</view>
			</view>
			<!-- 最近消息-End -->

			<!-- 更早的消息记录-Begin -->
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 更早消息列表
				</view>
			</view>

			<!-- 更早的消息记录-End -->
		</scroll-view>
		<!-- 加载 -->
		<view class="cu-load" :class="!isLoad?'loading':'over'"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				modalName: null,
				skin: false,
				listTouchStart: 0,
				listTouchStartY:0,
				listTouchDirection: null,
				isLoad: true,
				recentyList: [{
						getId: "002",
						text: "你好在吗我有很多事情",
						from: "话题",
						time: "22:35",
						sendUser: {
							sendId: "001",
							nickname: "西瓜",
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						}
					},
					{
						getId: "002",
						text: "你好在吗我有很多事情",
						from: "闲置",
						time: "0:23",
						sendUser: {
							sendId: "002",
							nickname: "草莓",
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						}
					},
					{
						getId: "002",
						text: "你好在吗我有很多事情",
						from: "私信",
						time: "04:15",
						sendUser: {
							sendId: "003",
							nickname: "橙子",
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						}
					}
				]
			};
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			hrefChatRoom(item) {
				console.log(item)
				uni.navigateTo({
					url: "/pages/chat/chat?item="+encodeURIComponent(JSON.stringify(item))
				})
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
				this.listTouchStartY=e.touches[0].pageY
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				if(e.touches[0].pageX - this.listTouchStart < 0)
				{
					if((Math.abs(e.touches[0].pageY - this.listTouchStartY)<20))
					{
						this.listTouchDirection = 'left'
					}
					else{
						this.listTouchDirection = 'right'
					}
				}
				else{
					this.listTouchDirection = 'right'
				}
				// this.listTouchDirection = (e.touches[0].pageX - this.listTouchStart > 0)&&(Math.abs(e.touches[0].pageY - this.listTouchStartY)<20)? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				// console.log(this.listTouchDirection)
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		padding-bottom: 120rpx;

	}
	.header {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 220rpx;
		display: flex;
		align-items: flex-end;
		background-color: #FFFFFF;
		z-index: 99999;
	}
	.page.show {
		overflow: hidden;
	}

	.cu-load {
		background-color: #FFFFFF;
		padding-bottom: 30rpx;
		color: black;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
