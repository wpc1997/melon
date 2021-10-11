<template>
	<view class="order-card">
		<view class="order-card-head">
			<view class="order-card-head-info">
				<image src="https://img01.yzcdn.cn/vant/cat.jpeg"></image>
				<text class="text-lg">到家服务专营店</text>
				<text class="cuIcon-right"></text>
			</view>
			<view class="order-card-head-status text-df">
				卖家已发货
			</view>
		</view>

		<!-- 所购买的物品列表 -->
		<view class="order-card-list">
			<order-card-list></order-card-list>
		</view>

		<!-- 物流状态 -->
		<view class="order-card-status">
			<view>
				<text class="cuIcon-apps"></text>
				<text class="">待取件</text>
			</view>
			<view>
				取件码 1-2-4567
			</view>
			<view>
				<text></text>
			</view>
		</view>

		<!-- 付款信息 -->
		<view class="order-card-price">

			<!-- 灰色价格字体 -->
			<view class="order-card-price-virtual">
				<view class="text-df">总价</view>
				<view>
					<view class="text-price text-sm"></view>
					<view class="text-black text-df">{{handlePrice(0)}}</view>
					<view class="text-black text-xs">.{{handlePrice(1)}}</view>
				</view>
			</view>

			<!-- 黑色实际价格字体 -->
			<view class="order-card-price-actual">
				<view class="text-df">实付款</view>
				<view>
					<view class="text-price text-sm"></view>
					<view class="text-black text-df">{{handlePrice(0)}}</view>
					<view class="text-black text-xs">.{{handlePrice(1)}}</view>
				</view>
			</view>

		</view>


		<!-- 操作按钮 -->
		<view class="order-card-footer">

			<view>延长收货</view>
			<view>查看物流</view>
			<view class="enter">确认收货</view>

		</view>


	</view>
</template>

<script>
	import orderCardList from "@/components/order-card-list.vue";

	export default {
		name: "order-card",
		components: {
			orderCardList
		},
		data() {
			return {

			};
		},
		methods: {


			//价格转换
			handlePrice(type) {

				let price = '150'

				let arr = []

				if (price.indexOf('.') !== -1) {
					arr = price.split('.')
				} else {
					arr.push(price)
					arr.push('00')
				}


				return type ? arr[1] : arr[0]

			}
		}
	}
</script>

<style lang="scss" scoped>
	.enter {
		color: #FF945C !important;
		border: 1upx solid #FF945C !important;
	}

	.order-card {
		background-color: #FFFFFF;
		border-radius: 12upx;

		&-head {
			padding: 24upx 24upx 12upx 24upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			&-info {
				display: flex;
				align-items: center;

				>image {
					width: 50upx;
					height: 50upx;
					border-radius: 50%;
				}

				.text-lg {
					margin-left: 8upx;
					font-weight: 400;
				}

				.cuIcon-right {

					margin-left: 8upx;
				}

			}

			&-status {

				margin-left: auto;
				color: #FF945C;

			}

		}

		&-list {
			padding: 0 24upx;
		}

		&-status {

			background-color: #F5F5F5;
			border-radius: 8upx;
			display: flex;
			justify-content: flex-start;
			padding: 12upx 24upx;
			margin: 12upx 24upx;

			>view:nth-of-type(1) {
				text {
					font-weight: 500;
					color: #FF945C;
				}

				text:last-child {
					margin-left: 10upx;
				}
			}

			>view:nth-of-type(2) {
				color: #FF945C;
				margin-left: auto;
			}

		}


		&-price {

			display: flex;
			justify-content: flex-end;
			padding: 12upx 24upx;
			
			&-actual{
				view{
					color: #333333!important;
					font-weight: 400;
				}
			}
			&-virtual,&-actual {
				
				display: flex;
				margin: 0 5upx;

				>view:nth-of-type(1),view{

					color: #888888;

				}

				>view:last-child {
					
					display: flex;
					margin-left: auto;
					align-items: center;
					justify-content: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-left: 5upx;
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

		}


		&-footer {

			display: flex;
			justify-content: flex-end;
			padding: 24upx;

			>view {
				margin: 0 12upx;
				color: #333333;
				border: 1upx solid #888888;
				border-radius: 1000px;
				height: 60upx;
				line-height: 60upx;
				padding: 0 24upx;
				font-size: 28upx;
			}

		}

	}
</style>
