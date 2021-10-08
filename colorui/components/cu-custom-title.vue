<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'},{width:'100vw'}]">
			<view class="cu-bar-text fixed" :style="style" :class="[bgImage!=''?'none-bg text-black bg-img':'',bgColor]">
				<text>31</text><text>05</text><text>任何被毁坏的都可以重建</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			focusSearch(){
				this.isAnimate=true
			},
			blurSearch(){
				this.isAnimate=false
			}
		}
	}
</script>

<style lang="scss" scoped>
.cu-custom{
	z-index: 9999;
	.cu-bar-text{
		width: 100%;
		position: fixed;
		display: flex;
		align-items: flex-end;
		background-color: #FFFFFF;
		padding: 24upx;
		>text:nth-of-type(1){
			font-weight: 500;
			font-size: 36upx;
		}
		>text:nth-of-type(2){
			margin-left: 6upx!important;
			margin-top: 5upx;
		}
		>text:nth-of-type(2),text:nth-of-type(3){
			font-weight: 500;
			font-size: 28upx;
			margin-left: 12upx;
		}
	}
}
</style>
