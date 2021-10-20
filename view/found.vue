<template>
	<!-- 寻宠页面 -->
	<view class="found-page">
		<view class="custom-fixed">
			<cu-custom bgColor="text-white " :isBack="true" :backColor="'white'" :isAnimal="true" :scrollTop="scrollTop"
				v-if="scrollTop">
				<block slot="content"></block>
			</cu-custom>
		</view>

		<refresh :isFull="true" @onScroll="onScroll">


			<view class="found">
				<view class="found-head">
					<cu-custom bgColor="bg-shadeTop text-white" :isBack="true" :backColor="'white'" v-if="!scrollTop">
						<block slot="content"></block>
					</cu-custom>
				</view>

				<view class="found-search">
					<view class="found-search-input">
						<text class="cuIcon-search"></text>
						<text class="text-gray text-sm">输入关键词搜索~</text>
					</view>
				</view>

				<view class="found-sort">
					<view class="found-sort-box">{{scrollTop}}</view>
					<view class="found-sort-box"></view>
					<view class="found-sort-box"></view>
				</view>

				<view class="found-title">
					全部帖子
				</view>

				<view class="found-list" :style="{top:(CustomBar?CustomBar+'px':'84px')}" id="tabs">
					<custom-tabs :tabs="tabs" :tabIndex="tabIndex" @clickTab="clickTab"></custom-tabs>
				</view>


				<!-- 内容 -->
				<view class="answer-list" id="scrollView">
					<!-- <swiper class="swiper" :style="{height:scrollHeight+'px'}" duration="350" :indicator-dots="false" :current="current" :autoplay="false" @change="change"> -->
					<swiper class="swiper" :style="{height:scrollHeight+'px'}" duration="350" :indicator-dots="false"
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

	</view>

</template>

<script>
	import customTabs from '../components/custom-tabs.vue'
	import unusedCard from '../components/unused-card.vue'
	import refresh from '../components/refresh.vue'

	export default {
		components: {
			customTabs,
			unusedCard,
			refresh
		},
		data() {
			return {

				CustomBar: this.CustomBar,
				isShowSearchPopup: false,
				tabIndex: 0,
				tabs: [{
						title: '紧急',
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
				scrollHeight: 0,
				current: 0, //当前所在滑块的 index
				tabIndex: 0, //tab栏所选中的索引
				marginTop: 0,
				isHidden: true,
				scrollTop: 0,
			}
		},
		onReady() {
			let _this = this
			let query = uni.createSelectorQuery().in(this);

			query.select('#tabs').boundingClientRect(data => {

				console.log(data)
				_this.marginTop = data.height

			}).exec();
			query.select('.found').boundingClientRect(data => {

				console.log(data)
				_this.scrollHeight = data.height - _this.marginTop - _this.CustomBar

			}).exec();
		},
		methods: {


			//接收到tab栏传过来的数据和索引，来渲染和控制swiper的双向滑动，如果swiper里面已经有内容，则不渲染数据
			clickTab(item, index) {
				this.current = index
			},


			//swiper滑动事件
			change(e) {

				console.log(e)
				this.tabIndex = e.detail.current

			},

			//搜索输入框的focus事件
			searchFocus() {
				if (!this.isShowSearchPopup) {
					this.isShowSearchPopup = !this.isShowSearchPopup
				}
			},

			//点击失去焦点
			outFocus() {
				this.isShowSearchPopup = false
			},

			//页面滚动事件监听
			onScroll(e) {
				let _this = this
				let query = uni.createSelectorQuery().in(this);
				if (_this.scrollTop > e.detail.scrollTop) {
					if (e.detail.scrollTop < 10) {
						_this.scrollTop = 0
					} else {
						_this.scrollTop = e.detail.scrollTop
					}
				} else {
					_this.scrollTop = e.detail.scrollTop
				}

				console.log(_this.scrollTop)
				query.select('#tabs').boundingClientRect(data => {

					// console.log(data)

					if (data.top <= (_this.CustomBar + 20)) {
						_this.isHidden = false
					} else {
						_this.isHidden = true
					}


				}).exec();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.left-cancle {
		width: 100upx !important;
		text-indent: 10upx;
	}
	
	.swiper-lists{
		display: flex;
		justify-content: space-evenly;
		&-list{
			
		}
		
	}

	.swiper-hidden {
		overflow-y: hidden !important;
	}

	.swiper-auto {
		overflow-y: scroll !important;
	}

	.found-page {
		.custom-fixed {
			position: fixed;
			z-index: 9;
		}
	}

	.found {
		height: 100vh;

		&-head {
			height: 490upx;
			background-color: #39B54A;

			&-search {

				position: fixed;
				width: 100%;

			}

		}

		&-list {
			position: sticky;
			z-index: 99;
			background-color: #FFFFFF;
		}

		&-search {
			margin-top: -40upx;
			display: flex;
			justify-content: center;

			&-input {
				width: 694upx;
				height: 80upx;
				background: #FFFFFF;
				box-shadow: 4upx 4upx 40upx 0upx rgba(0, 0, 0, 0.1);
				border-radius: 44upx;
				padding: 0 24upx;
				display: flex;
				align-items: center;
				justify-content: flex-start;

				>text:last-child {
					margin-left: 12upx;
				}
			}

		}


		&-sort {
			margin-top: 32upx;
			display: flex;
			justify-content: space-between;
			padding: 0 24upx;

			&-box {
				box-shadow: 4upx 4upx 40upx 0upx rgba(0, 0, 0, 0.1);

				width: 220upx;
				height: 220upx;
			}
		}

		&-title {
			font-size: 32upx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #1D1D1C;
			padding: 32upx 24upx;
			line-height: 44upx;
		}



	}
</style>
