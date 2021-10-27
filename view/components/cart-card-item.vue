<template>
	<view>
		<checkbox-group @change="chooseItem">
			<view class="cart-card-item" v-for="(item,index) in list" :key="item.id">

				<view class="cart-card-item-checkbox">
					<checkbox class="round olive-linear scale" :value="item.goodsId" :checked="item.checked" />
				</view>

				<view class="cart-card-item-image">
					<image src="https://img01.yzcdn.cn/vant/cat.jpeg"></image>
				</view>

				<view class="cart-card-item-info">
					<view class="title">{{item.title}}</view>

					<view class="grade">
						<view>{{item.grade}}</view>
					</view>
					<view class="tags" v-if="item.notice">
						<view v-for="(it,idx) in item.notice.split(',')" :key="idx">{{it}}</view>
					</view>
					<view class="footer">
						<text class="text-price">{{item.price}}</text>
						<view>
							<stepper :maxValue="item.maxCount" :minValue="item.minCount" :value="item.count" :item="item" @add="add"
								@subtract="subtract"></stepper>
						</view>
					</view>
				</view>

			</view>

		</checkbox-group>
	</view>

</template>

<script>
	import stepper from '../../components/stepper.vue'

	export default {
		components: {
			stepper
		},
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {

			}
		},
		methods: {





			//选中单个商品
			chooseItem(e) {
				// console.log(e.detail.value)
				this.$emit('chooseItem', e.detail.value)
			},
			//增加购买数量
			add(item) {
				this.$emit('add', item)
			},
			//减少购买数量
			subtract(item) {
				this.$emit('subtract', item)
			},


		}
	}
</script>

<style lang="scss" scoped>
	.cart-card-item {
		display: flex;
		margin-top: 24upx;

		&-checkbox {
			display: flex;
			align-items: center;
			height: 180upx;
		}

		&-image {
			display: flex;
			align-items: flex-start;

			>image {
				width: 180upx;
				height: 180upx;
				border-radius: 8upx;
				margin: 0 24upx;
			}
		}

		&-info {
			flex: 1;

			.title {
				font-size: 28upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #222222;
				line-height: 36upx;
				display: -webkit-box;
				overflow: hidden;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;

			}

			.grade {

				display: flex;
				margin-top: 16upx;

				>view {
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 10upx;
					height: 36upx;
					background: #F5F6F8;
					border-radius: 22upx;
					color: #888888;
					font-size: 20upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
				}

			}

			.tags {
				display: flex;

				// margin-top: 16upx;
				>view:first-child {
					margin-left: 0 !important;
				}

				>view {

					padding: 0 8upx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 16upx 8upx;
					height: 34upx;
					border-radius: 4upx;
					border: 2upx solid #FF111C;
					font-size: 20upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FF111C;

				}

			}

			.footer {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				width: 100%;

				>text {
					font-size: 32upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FF111C;
				}

				>view {
					margin-left: auto;
				}
			}

		}

	}



	.scale {
		transform: scale(0.8);
	}
</style>
