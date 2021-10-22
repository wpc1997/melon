<template>
	<view class="mall-page">
		<cu-custom-animal :isBack="true" :isShowBack="false" :isAnimal="true" :customColor="{r:248,g:211,b:71}"
			:scrollTop="scrollTop">
			<block slot="backText">
				<view class="text-lg text-bold" style="letter-spacing: 5upx;">萌宠商城</view>
			</block>
		</cu-custom-animal>

		<refresh @onScroll="onScroll" :scrollHeight="scrollHeight">
			<view class="mall">
				<view class="mall-search bg-topic-theme" :style="{top:0}">
					<view class="mall-search-input">
						<text class="cuIcon-search"></text>
						<text class="text-gray text-sm">搜索商品关键词</text>
					</view>
				</view>
				<!-- 轮播图 -->
				<view class="mall-swiper">
					<swiper class="swiper" :class="'square-dot'" :indicator-dots="true" :autoplay="true"
						:interval="2000" :circular="true" :duration="500" indicator-color="#8799a3"
						indicator-active-color="#FCD209">
						<swiper-item class="swiper-item-custom">
							<image src="https://img01.yzcdn.cn/vant/cat.jpeg"></image>
						</swiper-item>
						<swiper-item class="swiper-item-custom">
							<image src="https://img01.yzcdn.cn/vant/cat.jpeg"></image>
						</swiper-item>
						<swiper-item class="swiper-item-custom">
							<image src="https://img01.yzcdn.cn/vant/cat.jpeg"></image>
						</swiper-item>
					</swiper>
				</view>

				<!-- 金刚区 -->

				<view class="mall-area">
					<areaGrid :list="cuIconList" :gridCol="5" @girdClick="girdClick"></areaGrid>
				</view>

				<!-- 今日疯抢模块 -->
				<view class="mall-kill">
					<kill></kill>
				</view>

				<!-- 套餐推荐模块 -->
				<view class="mall-package">


					<view class="tower-swiper fade-animal" @touchmove="TowerMove" @touchstart="TowerStart" @touchend="TowerEnd" :class="{'fade':isShowSwiper}">
						<view class="tower-item" :class="item.zIndex==1?'none':''" v-for="(item,index) in swiperList"
							:key="index" :style="[{'--index': item.zIndex,'--left':item.mLeft}]"
							:data-direction="direction">
							<view class="swiper-item">
								<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
								<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
									objectFit="cover" v-if="item.type=='video'"></video>
							</view>
						</view>
					</view>


					<!-- 套餐轮播图 -->
					<!-- 	<swiper class="card-swiper" :autoplay="false" interval="5000" duration="500" :previous-margin="50" :next-margin="50" @change="cardSwiper">
						<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
							<view class="swiper-item">
								<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
								<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
									objectFit="cover" v-if="item.type=='video'"></video>
							</view>
						</swiper-item>
					</swiper> -->

				</view>



			</view>



		</refresh>

		<view class="mall-page-head-bg bg-topic-theme"></view>



	</view>
</template>

<script>
	import refresh from '../../components/refresh.vue'
	import areaGrid from '../index/components/area-grid.vue'

	import kill from './components/kill.vue'

	export default {
		components: {
			refresh,
			areaGrid,
			kill
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				cardCur: 0,
				towerStart: 0,
				direction: '',
				isShowSwiper:false,
				rgbaColor: {
					r: 255,
					g: 148,
					b: 92,
					o: 1
				},
				scrollTop: 0,
				scrollHeight: 0,
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '签到',
					url: '../../view/registration',
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '问答',
					url: '../../view/answer',
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '小组',
					url: '../../view/channel',
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '课堂',
					url: '../../view/classroom',
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '寻宠',
					url: '../../view/found',
				}, {
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '签到',
					url: '../../view/registration',
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '问答',
					url: '../../view/answer',
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '小组',
					url: '../../view/channel',
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '课堂',
					url: '../../view/classroom',
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '寻宠',
					url: '../../view/found',
				}, ],
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, ],
			}
		},

		onLoad() {
			this.TowerSwiper('swiperList');
			setTimeout(()=>{
				this.isShowSwiper = true
			},500)
		},
		onReady() {
			let _this = this
			let query = uni.createSelectorQuery().in(this);

			query.select('.mall-page').boundingClientRect(data => {

				console.log(data)
				_this.scrollHeight = data.height - _this.CustomBar

			}).exec();
		},

		methods: {


			//金刚区点击事件
			girdClick(url) {
				console.log(url)
			},

			//页面滚动事件监听
			onScroll(e) {
				let _this = this
				if (_this.scrollTop > e.detail.scrollTop) {
					if (e.detail.scrollTop < 10) {
						_this.scrollTop = 0
					} else {
						_this.scrollTop = e.detail.scrollTop
					}
				} else {
					_this.scrollTop = e.detail.scrollTop
				}

			},


			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},


			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},

		}
	}
</script>

<style lang="scss" scoped>
	

	.mall-page {
		height: 100vh;
		max-height: 100vh;
		position: relative;
		background-color: #F5F5F5;


	}

	.mall-page-head-bg {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
		border-radius: 0 0 (1000px 1000px)/ 60%;
		width: 100vw;
		height: 382upx;

	}

	.mall {
		position: relative;

		z-index: 2;
		height: 150vh;

		&-search {
			position: sticky;
			padding: 24upx;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 2;

			&-input {
				z-index: 2;
				position: relative;
				width: 702upx;
				height: 64upx;
				background: #FFFFFF;
				border-radius: 34upx;
				display: flex;
				align-items: center;
				justify-content: center;

				>text:last-child {
					margin-left: 6upx;
				}
			}

		}

		&-swiper {
			position: relative;
			width: 702upx;
			margin: 0 auto;
			height: 240upx;
			border-radius: 12upx;

			.swiper {
				position: relative;
				width: 100%;
				height: 100%;
				border-radius: 12upx;

				.swiper-item-custom {
					width: 100%;
					height: 100%;
					border-radius: 12upx;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
						border-radius: 12upx;
					}
				}
			}


		}

		&-kill {
			position: relative;
			margin: 24upx auto;
			padding: 24upx;
			width: 702upx;
			// height: 358upx;
			background: linear-gradient(180deg, #FFF0F0 0%, #FFFFFF 100%);
			border-radius: 16upx;
		}


		&-package {
			position: relative;
			margin: 24upx auto;
			width: 702upx;
			height: 272upx;
			background: #FFFFFF;
			border-radius: 16upx;
			// .card-swiper swiper-item{
			// 	padding: 0!important;
			// 	width: 300upx!important;
			// }
			// .card-swiper swiper-item:first-child{
			// 	right: -15px;
			// }
			// .card-swiper swiper-item:last-child{
			// 	left: -15px;
			// }
			// .card-swiper{
			// 	height: 200upx!important;
			// 	width: 900upx!important;
			// 	.swiper-item{
			// 		padding: 0!important;
			// 		width: 300upx;
			// 		height: 200upx;
			// 	}

			// }

		}


	}
	
	
	
	.fade-animal{
		transition: 1500ms ease;
		opacity: 0;
	}
	.fade{
		opacity: 1!important;
	}
	.tower-swiper{
		width: 702upx;
		height: 272upx;
	}
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10)) translateX(calc(-38%));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
		
	}
	.tower-swiper .tower-item {
		width: 550upx!important;
		height: 300upx!important;
		// left: 35%;
	}
	
	.tower-swiper .tower-item.none {
		opacity: 0.9!important;
	}
</style>
