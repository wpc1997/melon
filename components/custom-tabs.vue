<template>
	<view class="custom-tabs">

		<!-- 自定义tabs栏 -->

		<view class="custom-tabs-tab" :class="{'active':tabCur===index}" @tap="clickTab(index)" :id="'main-'+index" v-for="(item,index) in tabs"
			:key="index">{{item.title}}</view>



		<view id="line" class="custom-tabs-line" :class="{'tranfroms':isAnimal}" :style="[{left:tabLeft+'px'}]"></view>

	</view>
</template>

<script>
	export default {
		name: "custom-tabs",
		props: {
			tabs: {
				type: Array,
				default: () => {
					return []
				}
			},
			tabIndex:{
				type:Number,
				default: 0
			}
		},
		data() {
			return {
				tabLeft: 0,
				lineWidth: 0,
				isAnimal: false,
				tabCur:0
			};
		},
		onReady() {

			let _this = this
			let query = uni.createSelectorQuery().in(this);
			query.select('#line').boundingClientRect(data => {

				console.log(data)
				_this.lineWidth = data.width

				_this.clickTab(_this.tabIndex)

			}).exec();



		},
		methods: {
			clickTab(index) {
				let _this = this
				let width = 0;
				let id = 'main-' + index

				_this.tabCur = index
				let query = uni.createSelectorQuery().in(this);
				query.select('#' + id).boundingClientRect(data => {

					console.log(data)
					_this.tabLeft = data.left + (data.width / 2) - (_this.lineWidth / 2)
					console.log(_this.lineWidth / 2)

				}).exec();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.custom-tabs {

		position: relative;
		width: 100%;
		height: 80upx;
		// padding: 20upx 0;
		background-color: rgba(0, 0, 0, 0);
		display: flex;
		
		.active{
			font-weight: 400;
			color: #FF945C;
		}

		&-tab {

			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			min-width: 60upx;
			font-size: 28upx;
			// border: 1upx solid #007AFF;

		}

		&-line {

			position: absolute;
			bottom: 0;
			width: 40upx;
			height: 6upx;
			background-color: #FF945C;
			transition: 300ms ease-out;
			border-top-right-radius: 6upx;
			border-top-left-radius: 6upx;

		}


	}
</style>
