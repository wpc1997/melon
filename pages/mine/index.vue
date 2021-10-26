<template>
	<view class="mine">


		<!-- 头部信息（用户信息） -->
		<view class="mine-head">

			<cu-custom bgColor="bg-gradual-opacity" :isBack="false"></cu-custom>

			<userInfo @toMinePanel="toMinePanel" @toLogin="toLogin"></userInfo>

			<view class="mine-head-list">
				<view @tap="toFocusOn">
					<text class="text-lg">7</text>
					<text class="text-sm">关注</text>
				</view>
				<view @tap="toFans">
					<text class="text-lg">0</text>
					<text class="text-sm">粉丝</text>
				</view>
				<view>
					<text class="text-lg">12</text>
					<text class="text-sm">热度</text>
				</view>
			</view>


		</view>

		<!-- 宠物卡片 -->
		<view class="mine-card">

			<!-- 主页轮播图 -->
			<swiper class="card-swiper" :class="'square-dot'" :indicator-dots="false" :circular="true" :autoplay="false"
				interval="5000" duration="500" @change="cardSwiper">
				<swiper-item v-for="(item,index) in pets" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item">
						<pet-card :item="item"></pet-card>
					</view>
				</swiper-item>
			</swiper>

		</view>

		<!-- 功能服务列表 -->
		<view class="mine-list">
			<!-- <view class="cu-list menu">
				<view class="cu-item arrow no-border" v-for="(item,index) in list" :key="index" @tap="toService(item.type)">
					<view class="content">
						<text :class="'cuIcon-'+item.icon"></text>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view> -->
			<view class="mine-list-head">
				<view>我的订单</view>
				<view @tap="toAllOrder(0)">全部 <text class="cuIcon-right"></text></view>
			</view>
			<areaGrid :list="orderList" :gridCol="gridCol" @girdClick="girdClickOrder"></areaGrid>
		</view>
		
		<!-- 功能服务列表 -->
		<view class="mine-list">
			<areaGrid :list="serviceList" :gridCol="4" @girdClick="toService()"></areaGrid>
		</view>
		
		<!-- 功能服务列表 -->
		<view class="mine-list">
			<areaGrid :list="operateList" :gridCol="4"></areaGrid>
		</view>


	</view>
</template>

<script>
	import userInfo from "@/pages/mine/components/user-info.vue";
	import areaGrid from "@/pages/index/components/area-grid";
	import petCard from "@/pages/mine/components/pet-card.vue";


	export default {
		components: {
			userInfo,
			areaGrid,
			petCard
		},
		data() {
			return {

				cardCur: 0,
				gridCol: 5,
				orderList: [
					{
						cuIcon: 'cardboardfill',
						imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
						radius: '50%',
						color: 'red',
						badge: 120,
						name: '待付款'
					}, {
						cuIcon: 'recordfill',
						imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
						radius: '50%',
						color: 'orange',
						badge: 1,
						name: '待发货'
					}, {
						cuIcon: 'picfill',
						imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
						radius: '50%',
						color: 'yellow',
						badge: 0,
						name: '待收货'
					}, {
						cuIcon: 'noticefill',
						imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
						radius: '50%',
						color: 'olive',
						badge: 22,
						name: '待评价'
					}, {
						cuIcon: 'upstagefill',
						imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
						radius: '50%',
						color: 'cyan',
						badge: 0,
						name: '退款/退货'
					},
				],
				pets:[
					{
						name:'乐堡',
						
					},
					{
						name:'开心'
					}
				],
				
				serviceList: [
					{
						cuIcon: 'goods',
						imgUrl:'',
						radius: '50%',
						name: '今日签到',
						url:'',
					},
					{
						cuIcon: 'favor',
						imgUrl:'',
						radius: '50%',
						name: '我的收藏',
						url:'',
					},
					{
						cuIcon: 'group',
						imgUrl:'',
						radius: '50%',
						name: '我的小组',
						url:'',
					},
					{
						cuIcon: 'community',
						imgUrl:'',
						radius: '50%',
						name: '我的口袋',
						url:'../../view/cart',
					},
					{
						cuIcon: 'friendfavor',
						imgUrl:'',
						radius: '50%',
						name: '与我相关',
						url:'',
					},
					{
						cuIcon: 'write',
						imgUrl:'',
						radius: '50%',
						name: '文案投稿',
						url:'',
					},
				],
				operateList:[
					{
						cuIcon: 'question',
						imgUrl:'',
						radius: '50%',
						name: '资质认证',
						url:'',
					},
					{
						cuIcon: 'question',
						imgUrl:'',
						radius: '50%',
						name: '申请开店',
						url:'',
					},
					{
						cuIcon: 'question',
						imgUrl:'',
						radius: '50%',
						name: '意见反馈',
						url:'',
					},
					{
						cuIcon: 'question',
						imgUrl:'',
						radius: '50%',
						name: '联系我们',
						url:'',
					},
				]
			}
		},
		methods: {

			//跳转到 我的 面板
			toMinePanel() {
				uni.navigateTo({
					url: '/pages/mine/mine-panel'
				})
			},

			//去登陆
			toLogin() {
				console.log('登录')
				uni.navigateTo({
					url: '../../view/login'
				})
			},

			//跳转关注页
			toFocusOn() {
				uni.navigateTo({
					url: '../../view/focusOn'
				})
			},

			//跳转所有订单页
			toAllOrder(index){
				uni.navigateTo({
					url:'../../view/order?idx='+index
				})
			},
			
			girdClickOrder(item,index){
				uni.navigateTo({
					url:'../../view/order?idx='+(index+1)
				})
			},

			//跳转粉丝页
			toFans() {
				uni.navigateTo({
					url: '../../view/fans'
				})
			},

			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},

			//跳转到具体服务页
			toService(item) {
				console.log(item)
				uni.navigateTo({
					url: item.url
				})
				
			}
		}


	}
</script>

<style lang="scss" scoped>
	
	.mine {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 12upx;

		&-head {
			background-color: #f5f5f5;

			&-list {
				padding: 0 24upx;
				margin-top: 32upx;
				padding-bottom: 12upx;
				background: linear-gradient(0deg, #FFFFFF 0%, #f5f5f5 100%);
				display: flex;

				>view:nth-of-type(2) {
					flex: 1.5;
				}

				>view {
					flex: 1;
					display: flex;
					align-items: center;
					flex-flow: column;

					>text:nth-of-type(1) {
						font-weight: 500;
						color: #222222;
					}

					>text:nth-of-type(2) {
						color: #888888;
					}
				}
			}
		}

		&-card {
			width: 100%;
			padding: 24upx 0 0;
			// height: 300upx;
			max-height: 300upx;
			background-color: rgba(0,0,0,0);
			
			.card-swiper{
				height: 200upx!important;
				
			}
			.card-swiper swiper-item{
				padding: 0!important;
			}
		}

		&-list {
			border-radius: 24upx;
			margin: 24upx;
			overflow: hidden;
			// padding: 24upx;
			background-color: #FFFFFF;

			&-head {

				padding: 24upx 24upx 0upx 24upx;
				display: flex;
				justify-content: flex-start;

				view:nth-of-type(1) {
					font-weight: 500;
				}

				view:nth-of-type(2) {
					margin-left: auto;
					display: flex;
					align-items: center;
					color: #888888;
					font-size: 24upx;
				}

			}

			.cu-list {
				.cu-item:after {
					border-bottom: none;
				}

				.cu-item {
					.content {
						>text {
							color: #222222;
						}

						>text:nth-of-type(2) {
							color: #222222;
						}
					}
				}
			}
		}

	}
</style>
