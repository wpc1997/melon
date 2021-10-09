<template>
	<view class="content">

		

		<!-- 顶部每日文案 -->
		<cu-custom-title style="background-color: #FFFFFF;" bgColor="#FFFFFF" :isBack="false"></cu-custom-title>
		<!-- <view :style="[{height:this.CustomBar + 'px'},{width:'100vw'}]"></view>
 -->

		<!-- 主页搜索框 -->
		<view class="cu-bar input" :style="{top:(CustomBar?CustomBar+'px':'84px')}">
			<view class="action">
				<text class="cuIcon-search"></text>
			</view>
			<input :adjust-position="false" @tap="searchFocus" :focus="false" maxlength="300" cursor-spacing="10"
				placeholder="输入关键词..."></input>
			
			<view class="cancel" @tap="outFocus" :class="isShowSearchPopup?'left-cancle':''" :style="[{marginRight: isShowSearchPopup?'10upx':'0'}]">{{isShowSearchPopup?'取消':''}}</view>
			
		</view>
		

		<!-- 主页轮播图 -->
		<swiper class="card-swiper" :class="'square-dot'" :indicator-dots="true" :circular="true" :autoplay="true"
			interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			indicator-active-color="#FCD209">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>	
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
						objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>

		<!-- 金刚区 -->
		<view class="content-area">
			<areaGrid :list="cuIconList" :gridCol="gridCol"></areaGrid>
		</view>

		<!-- 热门模块 -->
		<view class="content-hot">
			<view class="content-hot-head">
				<text class="text-df">热门小组</text>
				<view class="text-xs" @tap="toChannelList">
					查看更多
					<text class="cuIcon-right text-xs"></text>
				</view>
			</view>
			<hotCards></hotCards>
		</view>

		<!-- 今日推荐 -->
		<view class="content-recommend">
			<view class="content-recommend-head">
				<image src="../../static/img/index/recommend.png"></image>
				<text class="text-lg">推荐</text>
			</view>

			<!-- <panel></panel> -->

			<dynamic></dynamic>
			<dynamic></dynamic>
		</view>


		<!-- 弹出推荐搜索面板 -->
		<view class="search-popup" :style="[{top:isShowSearchPopup?'0':'-100vh'}]">
			<recommendSearch></recommendSearch>
		</view>

	</view>
</template>

<script>
	import areaGrid from "@/pages/index/components/area-grid";
	import hotCards from "@/pages/index/components/hot-cards";
	import recommendSearch from "@/pages/index/components/recommed-search.vue";
	import panel from "@/components/panel.vue";
	import dynamic from "@/components/dynamic.vue";

	export default {
		components: {
			areaGrid,
			panel,
			hotCards,
			dynamic,
			recommendSearch
		},
		data() {
			return {

				isShowSearchPopup: false,
				CustomBar: this.CustomBar,
				title: 'Hello',
				cardCur: 0,
				gridCol:5,
				cuIconList:[{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}],
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
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}, ]
			};
		},
		onLoad() {
			uni.getImageInfo({
			            src: 'http://chengzi.90czu.com/001c82a1-3bf6-43f7-bf98-fd8490cb3a751587084094424',
			            success: function (image) {
			                console.log('width:',image.width);
			                console.log('height:',image.height);
			            }
			        });
		},
		methods: {

			//搜索输入框的focus事件
			searchFocus() {
				if(!this.isShowSearchPopup){
					this.isShowSearchPopup=!this.isShowSearchPopup
				}
			},

			//点击失去焦点
			outFocus(){
				this.isShowSearchPopup=false
			},

			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			
			//跳转至小组列表页
			toChannelList(){
				uni.navigateTo({
					url:'../channel/channel-list'
				})
			}
		}
	};
</script>


<style lang="scss" scoped>
	.left-cancle{
		width:100upx!important;
		text-indent: 10upx;
	}
	.content {
		position: relative;
		.search-popup{
			position: fixed;
			top: -100vh;
			transition: 500ms all;
			z-index: 999;
			background-color: #FFFFFF;
			padding-top: 280upx;
			width: 100vw;
			height: 100vh;
			overflow: hidden;
		}
		.cu-bar.input {
			padding-right: 0 !important;
		}

		.cu-bar {
			z-index: 9999;
			// padding: 0 24upx;
			position: sticky;
			.cancel{
				width: 0;
				text-align: left;
				height: 100%;
				overflow: hidden;
				white-space: nowrap;
				transition-delay: 0;
				transition: 500ms all;
			}
			.action {
				padding-left: 30upx;
				border-top-left-radius: 40upx;
				border-bottom-left-radius: 40upx;
			}

			.action,
			input {
				line-height: 64upx;
				height: 64upx;
				min-height: 64upx;
				background-color: #f6f7f9;

				.cuIcon-search {
					font-size: 24upx;
					color: #888888;
				}
			}

			input {
				padding: 0 10upx;
				margin-left: 0 !important;
				border-top-right-radius: 40upx;
				border-bottom-right-radius: 40upx;
			}
			
			
		}

		.card-swiper {
			max-height: 350upx;
		}

		&-hot {
			margin: 24upx 0;

			&-head {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-right: 24upx;
				padding-bottom: 24upx;

				>view {
					color: #888888;
					margin-left: auto;

					>text {
						color: #888888;
					}
				}

				>text {
					font-weight: 500;
					margin-left: 24upx;
				}
			}
		}

		&-recommend {
			margin: 48upx 0 24upx 0;

			&-head {
				border-bottom: 1px solid #F5F6F8;
				background: linear-gradient(0deg, #FFFFFF 0%, #F5F6F8 100%);
				// border-radius: 24upx;
				border-top-right-radius: 24upx;
				border-top-left-radius: 24upx;
				padding: 24upx 16upx;
				margin: 0 24upx;
				display: flex;
				align-items: center;

				>image {
					width: 42upx;
					height: 42upx;
				}

				>text {
					color: #222222;
					font-weight: 500;
				}
			}
		}



	}
</style>
