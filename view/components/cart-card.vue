<template>
	<view class="cart-card">

		<view class="cart-card-head">
			<checkbox-group class="block" @change="chooseStore">
				<checkbox class="round olive-linear scale" :value="cart.storeId" :checked="cart.checked" />
			</checkbox-group>

			<view>
				<text>土特产</text>
			</view>
			<text class="cuIcon-right"></text>
		</view>

		<view class="cart-card-body">
			<cart-card-item :list="cart.list||[]" @add="add" @subtract="subtract" @chooseItem="chooseItem"></cart-card-item>
		</view>

	</view>
</template>

<script>
	import cartCardItem from './cart-card-item.vue'

	export default {
		components: {
			cartCardItem
		},
		props: {
			cart: {
				type: Object,
				default: function() {
					return {}
				}
			},
			index: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {

			}
		},
		methods: {


			//点击选中店铺
			chooseStore(e) {
				this.$emit('chooseStore', this.index, (e.detail.value)[0])
			},

			//点击选中单个商品
			chooseItem(value) {
				this.$emit('chooseItem', this.index, value)
			},

			//增加购买数量
			add(item) {
				let idx = this.cart.list.findIndex(it => it.goodsId === item.goodsId)

				this.$emit('add', this.index, idx, item)
			},

			//减少购买数量
			subtract(item) {
				let idx = this.cart.list.findIndex(it => it.goodsId === item.goodsId)

				this.$emit('subtract', this.index, idx, item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart-card {
		margin: 24upx;
		border-radius: 16upx;
		background-color: #FFFFFF;

		&-head {
			margin: 0 24upx 0 24upx;
			padding-top: 24upx;
			padding-bottom: 24upx;
			display: flex;
			align-items: center;
			border-bottom: 2upx solid #EEEEEE;

			>view {
				margin-left: 10upx;

				>text {
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #222222;
					line-height: 40upx;
				}
			}

			>text {
				margin-left: 10upx;
			}

		}


		&-body {
			padding: 0 24upx 24upx 24upx;
		}



	}

	.scale {
		transform: scale(0.8);
	}
</style>
