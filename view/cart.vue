<template>
	<view class="cart">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">我的口袋</block>
		</cu-custom>
		
		<view class="cart-head">
			我的口袋里共计77个商品
		</view>
		
		<view class="cart-list">
			
			<cart-card></cart-card>
			
		</view>
	</view>
</template>

<script>
	
	import cartCard from './components/cart-card.vue'
	
	export default {
		components:{
			cartCard
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.cart{
		
		min-height: 100vh;
		background-color: #F5F5F5;
		
		&-head{
			font-size: 28upx;
			padding: 0 24upx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #888888;
			height: 80upx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
		}
		
	}
</style>
