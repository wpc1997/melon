<template>

	<view class="stepper">

		<view class="stepper-left" @tap="subtract">
			<text class="cuIcon-move" :class="{'invalid':isInvalid_min}"></text>
		</view>

		<view class="stepper-middle">
			{{value}}
		</view>

		<view class="stepper-right" @tap="add">
			<text class="cuIcon-add" :class="{'invalid':isInvalid_max}"></text>
		</view>

	</view>

</template>

<script>
	export default {
		props: {
			value: {
				type: Number,
				default: 1,
				description: '当前的值'
			},
			maxValue: {
				type: Number,
				default: 10,
				description: '最大可选值'
			},
			minValue: {
				type: Number,
				default: 1,
				description: '最小可选值'
			},
			item: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
				isInvalid_min: false,
				isInvalid_max: false,
			}
		},
		watch: {
			value() {
				if (this.value === this.minValue) {
					this.isInvalid_min = true
				} else if (this.value === this.maxValue) {
					this.isInvalid_max = true
				} else if (this.value > this.minValue && this.value < this.maxValue) {
					this.isInvalid_max = false
					this.isInvalid_min = false
				}
			}
		},
		mounted() {
			if (this.value === this.minValue) {
				this.isInvalid_min = true
			} else if (this.value === this.maxValue) {
				this.isInvalid_max = true
			} else if (this.value > this.minValue && this.value < this.maxValue) {
				this.isInvalid_max = false
				this.isInvalid_min = false
			}
		},
		methods: {

			//减法
			subtract() {

				if (!this.isInvalid_min) {

					this.$emit('subtract', this.item)

				}



			},

			//加法
			add() {

				if (!this.isInvalid_max) {

					this.$emit('add', this.item)

				}

			}

		}
	}
</script>

<style lang="scss" scoped>
	.invalid {
		color: #BEBEBE !important;
	}

	.stepper {

		height: 60upx;
		border: 2upx solid #BEBEBE;
		border-radius: 6upx;
		display: flex;

		&-left {
			width: 60upx;
			min-width: 60upx;
			max-width: 60upx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #222222;

			>text {}
		}

		&-middle {
			flex: 1;
			font-size: 24upx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #222222;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 24upx;
			border-left: 2upx solid #BEBEBE;
			border-right: 2upx solid #BEBEBE;
		}

		&-right {

			color: #222222;
			width: 60upx;
			min-width: 60upx;
			max-width: 60upx;
			display: flex;
			align-items: center;
			justify-content: center;

			>text {}
		}

	}
</style>
