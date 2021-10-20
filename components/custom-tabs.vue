<template>
	<view class="custom-tabs">

		<!-- 自定义tabs栏 -->

		<view class="custom-tabs-tab" :class="[{'active':tabCur===index},{'yes-Avg':isAvg},{'no-Avg':!isAvg}]" @tap="clickTab(item,index)" :id="'main-'+index" v-for="(item,index) in tabs"
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
			},
			isAvg:{
				type:Boolean,
				default: false
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

				_this.clickTab(_this.tabs[_this.tabIndex],_this.tabIndex)

			}).exec();



		},
		watch:{
			tabIndex(){
				console.log('tabIndex变化')
				this.clickTab(this.tabs[this.tabIndex],this.tabIndex)
			}
		},
		methods: {
			clickTab(item,index) {
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
				
				//把当前选择的tabs栏的数据和索引传到父组件
				_this.$emit('clickTab',item,index)
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.yes-Avg{
		
		flex: 1;
		
	}
	.no-Avg{
		padding: 0 32upx;
	}
	
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
			// flex: 1;
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
			transition: 300ms ease;
			border-top-right-radius: 6upx;
			border-top-left-radius: 6upx;

		}


	}
</style>
