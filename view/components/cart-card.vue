<template>
	<view class="cart-card">
		
		<view class="cart-card-head">
			<checkbox value="cb" checked="true" />
			<view>
				<text>土特产</text>
			</view>
			<text class="cuIcon-right"></text>
		</view>
		
		<view class="cart-card-body">
			
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart-card{
		margin: 24upx;
		border-radius: 16upx;
		background-color: #FFFFFF;
		&-head{
			padding: 24upx;
			display: flex;
			align-items: center;
			>view{
				margin-left: 10upx;
				>text{
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #222222;
				}
			}
			>text{
				margin-left: 10upx;
			}
			
		}
		
	}
</style>
