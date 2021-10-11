<template>
	<view class="order-card-list">
		<image class="store-img" src="https://img01.yzcdn.cn/vant/cat.jpeg"></image>
		<view class="order-card-list-right">
			
			<!-- 标题 -->
			<view class="order-card-list-right-title">
				<view class="text-lg">家电清家电清洗保家电清家电清洗保洁洗保洁洁洗保洁</view>
				<view>
					<view class="text-price text-sm"></view>
					<view class="text-black text-df">{{handlePrice(0)}}</view>
					<view class="text-black text-xs">.{{handlePrice(1)}}</view>
				</view>
			</view>
			
			<!-- 规格 -->
			<view class="order-card-list-right-grade">
				
				<view class="text-df">一次家电清洗服务</view>
				<view>
					<view class="text-sm">x</view>
					<view class="text-black text-df">1</view>
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"order-card-list",
		data() {
			return {
				
			};
		},
		methods:{
			
			handlePrice(type){
				
				let price = '150'
				
				let arr = []
				
				if(price.indexOf('.') !== -1){
					arr = price.split('.')
				}else{
					arr.push(price)
					arr.push('00')
				}
				
				
				return type?arr[1]:arr[0]
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.order-card-list{
		display: flex;
		padding: 12upx 0;
		>image.store-img{
			width: 150upx;
			min-width: 150upx;
			height: 150upx;
			min-height: 150upx;
			border-radius: 12upx;
		}
		
		&-right{
			
			width: 100%;
			padding: 0 0 0 12upx;
			
			&-title{
				
				display: flex;
				justify-content: flex-start;
				>view:nth-of-type(1){
					font-weight: 500;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					flex: 1;
					max-width: 400upx;
				}
				>view:nth-of-type(2){
					display: flex;
					margin-left: auto;
					align-items: center;
					justify-content: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					>view{
						height: 100%;
						display: flex;
						align-items: center;
					}
					.text-sm{
						padding-top: 6upx;
						// line-height: 30upx;
					}
					
					// .text-xs{
					// 	line-height: 30upx;
					// }
					.text-xs{
						padding-top: 6upx;
					}
				}
				
			}
			
			&-grade{
				
				display: flex;
				justify-content: flex-start;
				margin: 6upx 0 10upx 0;
				view{
					color: #888888;
				}
				>view:nth-of-type(1){
					
					max-width: 450upx;
					
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					
				}
				>view:nth-of-type(2){
					
					display: flex;
					margin-left: auto;
					
					>view{
						display: flex;
						align-items: flex-end;
					}
					
				}
				
			}
			
		}
		
	}
</style>
