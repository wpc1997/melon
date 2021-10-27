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
				<view class="mall-search" :style="backgroundCustomWhite+';top:0'">
					<view class="mall-search-input" :style="backgroundCustomgray">
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


					<view class="tower-swiper fade-animal" @touchmove="TowerMove" @touchstart="TowerStart"
						@touchend="TowerEnd" :class="{'fade':isShowSwiper}">
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


				<!-- 降价好物 | 人气畅销 -->
				<view class="mall-recommend">

					<!-- 降价好物 -->
					<view class="mall-recommend-left">
						<view class="mall-recommend-left-head">
							<text>降价好物</text>
							<text>超级补贴</text>
						</view>
						<view class="mall-recommend-left-bottom">
							<view class="mall-recommend-left-bottom-goods">
								<image mode="aspectFill" src="https://img01.yzcdn.cn/vant/cat.jpeg"></image>
								<view>
									<text class="text-price">18.8</text>
									<text class="cut-line-price">18.8</text>
								</view>
							</view>
							<view class="mall-recommend-left-bottom-goods">
								<image mode="aspectFill" src="https://img01.yzcdn.cn/vant/cat.jpeg"></image>
								<view>
									<text class="text-price">18.8</text>
									<text class="cut-line-price">18.8</text>
								</view>
							</view>
						</view>
					</view>

					<!-- 人气畅销 -->
					<view class="mall-recommend-right">
						<view class="mall-recommend-right-head">
							<text>人气畅销</text>
							<text>TOP20</text>
						</view>
						<view class="mall-recommend-right-bottom">
							<view class="mall-recommend-right-bottom-goods">
								<image mode="aspectFill" src="https://img01.yzcdn.cn/vant/cat.jpeg"></image>
							</view>
							<view class="mall-recommend-right-bottom-goods">
								<image mode="aspectFill" src="https://img01.yzcdn.cn/vant/cat.jpeg"></image>
							</view>
						</view>
					</view>

				</view>

				<view class="mall-radius"></view>

				<!-- 底部tabs -->
				<view class="mall-tabs" :style="{top:(searchHeight?searchHeight+'px':'56px')}" id="tabs">
					
					<custom-tabs :tabs="tabs" :tabIndex="tabIndex" @clickTab="clickTab" :isAvg="true"></custom-tabs>
					
				</view>
				
				<!-- 内容 -->
				<view class="mall-list" id="scrollView">
					<!-- <swiper class="swiper" :style="{height:scrollHeight+'px'}" duration="350" :indicator-dots="false" :current="current" :autoplay="false" @change="change"> -->
					<swiper class="swiper" :style="{height:swiperHeight+'px'}" duration="350" :indicator-dots="false"
						:current="current" :autoplay="false" @change="change">
						<swiper-item v-for="(item,index) in tabs" :key="index"
							:class="[{'swiper-hidden':isHidden},{'swiper-auto':!isHidden}]">
							<view class="swiper-lists">
								<view class="swiper-list" v-for="(it,idx) in item.list" :key="item.id">
									<unused-card v-for="(v,k) in it" :key="v.id" :item="v"></unused-card>
								</view>
							</view>
				
				
				
						</swiper-item>
					</swiper>
				
				
				</view>
				

			</view>



		</refresh>

		<view class="mall-page-head-bg bg-topic-theme" :style="backgroundCustom"></view>
		<view class="mall-page-head-bg-white"></view>



	</view>
</template>

<script>
	import refresh from '../../components/refresh.vue'
	import areaGrid from '../index/components/area-grid.vue'
	import customTabs from '../../components/custom-tabs.vue'
	import unusedCard from '../../components/unused-card.vue'

	import kill from './components/kill.vue'

	export default {
		components: {
			refresh,
			areaGrid,
			kill,
			customTabs,
			unusedCard
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				cardCur: 0,
				towerStart: 0,
				direction: '',
				isShowSwiper: false,
				tabIndex:0,
				isHidden: true,
				current: 0, //当前所在滑块的 index
				searchHeight:0,
				backgroundCustom:`background-color:rgba(248,211,71,1)`,
				backgroundCustomWhite:`background-color:rgba(255,255,255,0)`,
				backgroundCustomgray :`background-color:rgba(255,255,255,1)`,
				rgbaColor: {
					r: 255,
					g: 148,
					b: 92,
					o: 1
				},
				list:[],
				tabs: [{
						title: '推荐',
						list: [
							[
								{
										id: 0,
										title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
										tag: '全新',
										coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
										userName: '白萝卜',
										avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
										price: '85',
										consult: '3',
										createTime: '刚刚',
									},
									{
										id: 1,
										title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
										tag: '全新',
										coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
										userName: '白萝卜',
										avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
										price: '755',
										consult: '104',
										createTime: '刚刚',
									},
									{
										id: 1,
										title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
										tag: '全新',
										coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
										userName: '白萝卜',
										avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
										price: '755',
										consult: '104',
										createTime: '刚刚',
									},
									{
										id: 1,
										title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
										tag: '全新',
										coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
										userName: '白萝卜',
										avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
										price: '755',
										consult: '104',
										createTime: '刚刚',
									},
							],
							[
								{
									id: 1,
									title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
									tag: '全新',
									coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									userName: '白萝卜',
									avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									price: '545',
									consult: '32',
									createTime: '刚刚',
								},
								{
									id: 1,
									title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
									tag: '全新',
									coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									userName: '白萝卜',
									avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									price: '136',
									consult: '16',
									createTime: '刚刚',
								},
								{
									id: 1,
									title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
									tag: '全新',
									coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									userName: '白萝卜',
									avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									price: '105',
									consult: '89',
									createTime: '刚刚',
								},
							]
							
						]
					},
					{
						title: '热门',
						list: [
				
							[
								{
									id: 3,
									title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
									tag: '全新',
									coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									userName: '白萝卜',
									avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									price: '136',
									consult: '9',
									createTime: '刚刚',
								},
								{
									id: 3,
									title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
									tag: '全新',
									coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									userName: '白萝卜',
									avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									price: '136',
									consult: '9',
									createTime: '刚刚',
								},
							],
							[
								{
									id: 3,
									title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
									tag: '全新',
									coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									userName: '白萝卜',
									avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									price: '136',
									consult: '16',
									createTime: '刚刚',
								},
							]
						]
					},
					{
						title: '最新',
						list: [
				
							[
								{
									id: 3,
									title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
									tag: '全新',
									coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									userName: '白萝卜',
									avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									price: '136',
									consult: '9',
									createTime: '刚刚',
								},
							],
							[
								{
									id: 3,
									title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡',
									tag: '全新',
									coverImg: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									userName: '白萝卜',
									avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
									price: '136',
									consult: '16',
									createTime: '刚刚',
								},
							]
						]
					},
				],
				scrollTop: 0,
				scrollHeight: 0,
				swiperHeight: 0,
				radiusHeight: 0,
				tabHeight: 0,
				cuIconList: [
					{
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
					},
				],
				swiperList: [
					{
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
					}, 
				],
			}
		},

		onLoad() {
			this.TowerSwiper('swiperList');
			setTimeout(() => {
				this.isShowSwiper = true
			}, 500)
		},
		onReady() {
			let _this = this
			let query = uni.createSelectorQuery().in(this);
			let radius = 0
			let tab = 0
			
			query.select('.mall-search').boundingClientRect(data => {

				console.log(data)
				_this.searchHeight = data.height
				
			}).exec();
			query.select('.mall-radius').boundingClientRect(data => {

				console.log(data)
				this.radiusHeight = data.height
				
			}).exec();
			query.select('.mall-tabs').boundingClientRect(data => {

				console.log(data)
				this.tabHeight = data.height
				
			}).exec();
			query.select('.mall-page').boundingClientRect(data => {
			
				console.log(data)
				_this.scrollHeight = data.height - _this.CustomBar
				_this.swiperHeight = data.height - _this.CustomBar - _this.searchHeight - this.radiusHeight - this.tabHeight
				
			}).exec();
		},

		methods: {


			//swiper滑动事件
			change(e) {

				console.log(e)
				this.tabIndex = e.detail.current

			},
			//金刚区点击事件
			girdClick(url) {
				console.log(url)
			},

			//页面滚动事件监听
			onScroll(e) {
				let _this = this
				let query = uni.createSelectorQuery().in(this);
				_this.isHidden = false
				if (_this.scrollTop > e.detail.scrollTop) {
					if (e.detail.scrollTop < 10) {
						_this.scrollTop = 0
					} else {
						_this.scrollTop = e.detail.scrollTop
					}
				} else {
					_this.scrollTop = e.detail.scrollTop
				}
				
				
				let _o = this.scrollTop / 250
				
				let v = (255 - (this.scrollTop / 0.65))<245?245:(255 - (this.scrollTop / 0.65))
				
				let o = (1 - _o) < 0 ? 0 : (1 - _o)
				
				_o = _o < 0.1?0:(_o - 0.07)
				
				this.backgroundCustom =	`background-color:rgba(248,211,71,${o})`;
				
				this.backgroundCustomWhite = `background-color:rgba(255,255,255,${_o})`;
				
				this.backgroundCustomgray = `background-color:rgba(${v},${v},${v},1)`;
		
				query.select('#tabs').boundingClientRect(data => {
				
					// console.log(data)
				
					if (data.top <= (_this.CustomBar + 20 + _this.tabHeight + _this.radiusHeight)) {
						_this.isHidden = false
					} else {
						_this.isHidden = true
					}
				
				
				}).exec();

			},

			//接收到tab栏传过来的数据和索引，来渲染和控制swiper的双向滑动，如果swiper里面已经有内容，则不渲染数据
			clickTab(item, index){
				this.list = item.list
				this.current = index
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

		},
		
	}
</script>

<style lang="scss" scoped>
	.mall-page {
		height: 100vh;
		overflow-x: hidden;
		width: 100vw;
		max-height: 100vh;
		position: relative;
		background-color: #F5F5F5;


	}

	.mall-page-head-bg {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		border-radius: 0 0 (1000px 1000px)/ 60%;
		width: 100vw;
		height: 382upx;

	}
	.mall-page-head-bg-white {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
		border-radius: 0 0 (1000px 1000px)/ 60%;
		width: 100vw;
		height: 382upx;
		background-color: #FFFFFF;

	}

	.mall {
		position: relative;

		z-index: 2;
		// height: 300vh;

		&-search {
			position: sticky;
			padding: 24upx;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 9;

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

		&-area{
			margin: 24upx;
			border-radius: 16upx;
			overflow: hidden;
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


		&-recommend {
			margin: 24upx auto;
			width: 702upx;
			min-height: 320upx;
			background: #FFFFFF;
			border-radius: 16upx;
			display: flex;
			overflow: hidden;

			&-left {
				border-right: 2upx solid #E7E7E7;
				padding: 24upx 20upx;
				flex: 1;

				&-head {
					padding-bottom: 12upx;
					>text:first-child {
						font-size: 32upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #222222;
						line-height: 44upx;
					}

					>text:last-child {
						margin-left: 16upx;
						font-size: 24upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #888888;
						line-height: 36upx;
					}
				}

				&-bottom {

					padding-top: 12upx;
					display: flex;
					
					justify-content: space-evenly;

					&-goods {
						width: 152upx;
						height: 152upx;

						>image {
							width: 152upx;
							height: 152upx;
							display: block;

						}

						>view {
							padding: 24upx 6upx;
							width: 100%;
							display: flex;
							justify-content: flex-start;

							>text:first-child {
								font-weight: 500;
								font-size: 24upx;
								line-height: 32upx;
							}

							>text.cut-line-price {
								text-decoration: line-through;
							}

							>text.cut-line-price::before {
								content: "¥";
								font-size: 80%;
								margin-right: 4upx;
							}

							>text:last-child {
								color: #888888;
								margin-left: auto;
								font-weight: 400;
								font-size: 20upx;
								line-height: 36upx;
							}
						}
					}

				}
			}

			&-right {
				padding: 24upx 20upx;
				flex: 1;

				&-head {
					padding-bottom: 12upx;

					>text:first-child {
						font-size: 32upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #222222;
						line-height: 44upx;
					}

					>text:last-child {
						margin-left: 16upx;
						font-size: 24upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #888888;
						line-height: 36upx;
					}
				}

				&-bottom {
					justify-content: space-evenly;
					padding-top: 12upx;
					display: flex;


					&-goods {
						width: 144upx;
						height: 204upx;

						>image {
							width: 144upx;
							height: 204upx;
							display: block;
						}

					}

				}


			}


		}

		&-tabs{
			background-color: #FFFFFF;
			position: sticky;
			z-index: 10;
		}

		&-radius{
			border-radius: 16upx 16upx 0 0;
			background-color: #FFFFFF;
			height: 30upx;
			width: 100%;
		}

		&-list{
			background-color: #FFFFFF;
			// margin-bottom: 60upx;
			
		}

	}


	.swiper-lists{
		display: flex;
		justify-content: space-evenly;
		
		
	}
	.swiper-list{
		margin-bottom: 60upx;
	}
	.swiper-hidden {
		overflow-y: hidden !important;
	}

	.swiper-auto {
		overflow-y: scroll !important;
	}

	.fade-animal {
		transition: 1500ms ease;
		opacity: 0;
	}

	.fade {
		opacity: 1 !important;
	}

	.tower-swiper {
		width: 702upx;
		height: 272upx;
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);

	}

	.tower-swiper .tower-item {
		width: 600upx !important;
		height: 325upx !important;
		left: 203upx;
		// left: 35%;
	}

	.tower-swiper .tower-item.none {
		opacity: 0.9 !important;
	}
</style>
