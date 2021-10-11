<template>
	<view class="order">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">我的订单</block>
		</cu-custom>
		<view class="order-tabs bg-gradual-white" :style="{top:(CustomBar?CustomBar+'px':'84px')}">
			<custom-tabs :tabs="tabs" :tabIndex="tabIndex" :isAvg="true"></custom-tabs>
		</view>
		<!-- <view class="order"></view> -->
		<view class="order-view" id="scrollView">
			<refresh :scrollHeight="scrollHeight">
				<view class="order-list">
					<order-card></order-card>
				</view>
			</refresh>
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
				scrollHeight:0
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
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.order-list{
		padding: 24upx;
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
			margin-top: 92upx;
		}

	}
</style>
