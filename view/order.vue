<template>
	<view class="order">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">我的订单</block>
		</cu-custom>
		<view class="order-tabs bg-gradual-white" :style="{top:(CustomBar?CustomBar+'px':'84px')}" id="tabs">
			<custom-tabs :tabs="tabs" :tabIndex="tabIndex" :isAvg="true" @clickTab="clickTab"></custom-tabs>
		</view>
		<!-- <view class="order"></view> -->
		<view class="order-view" id="scrollView" :style="[{'margin-top':marginTop+'px'}]">
			<swiper class="swiper" :style="{height:scrollHeight+'px'}" duration="350" :indicator-dots="false" :current="current" :autoplay="false" @change="change">
				<swiper-item v-for="(item,index) in tabs" :key="index">
					<refresh :scrollHeight="scrollHeight" class="order-list" @scrolltolower="scrolltolower">
						<view class="order-list-card">
							<order-card></order-card>
							<order-card></order-card>
							<order-card></order-card>
							<order-card></order-card>
						</view>
					</refresh>
				</swiper-item>
			</swiper>
			
			<!-- <refresh :scrollHeight="scrollHeight">
				<view class="order-list">
					<order-card></order-card>
				</view>
			</refresh> -->
		</view>
	</view>
</template>

<script>
	import customTabs from "@/components/custom-tabs.vue";
	import refresh from "@/components/refresh.vue";
	import orderCard from "@/components/order-card.vue";

	export default {
		components: {
			customTabs,
			refresh,
			orderCard
		},
		data() {
			return {
				
				CustomBar: this.CustomBar,
				tabs: [
					{
						title: '全部'
					},
					{
						title: '待付款'
					},
					{
						title: '待发货'
					},
					{
						title: '待收货'
					},
					{
						title: '待评价'
					},
				],
				tabIndex: 0,
				scrollHeight:0,
				marginTop:46,
				current:0,
			}
		},
		onLoad(option) {
			this.tabIndex = parseInt(option.idx)
			console.log(this.tabIndex)
			
		},
		onReady() {
			let _this = this
			let query = uni.createSelectorQuery().in(this);
			query.select('#scrollView').boundingClientRect(data => {
			
				console.log(data)
				_this.scrollHeight = data.height
			
			}).exec();
			
			query.select('#tabs').boundingClientRect(data => {
			
				console.log(data)
				_this.marginTop = data.height
			
			}).exec();
		},
		methods: {
			
			
			
			
			
			//触底触发上拉刷新
			scrolltolower(){
				
			},
			
			//接收到tab栏传过来的数据和索引，来渲染和控制swiper的双向滑动，如果swiper里面已经有内容，则不渲染数据
			clickTab(item,index){
				this.current = index
			},
			
			//swiper滑动事件
			change(e){
				
				console.log(e)
				this.tabIndex = e.detail.current
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.order-list-card{
		margin: 0 24upx;
	}
	.order {

		min-height: 100vh;

		background-color: #f5f5f5;
		
		display: flex;
		flex-flow: column;

		&-tabs {

			position: fixed;
			z-index: 9;
			width: 100%;
			padding: 0upx 0upx 12upx 0;
		}
		
		&-view{
			flex: 1;
		}

	}
</style>
