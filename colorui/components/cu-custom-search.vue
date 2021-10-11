<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-black bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back" :style="{color:backColor?backColor:'#222222'}"></text>
					<slot name="backText" :style="{color:backColor?backColor:'#222222'}"></slot>
				</view>
				<input @focus="focusSearch" @blur="blurSearch" :class="{'cu-bar-search':true,'animateWidth':isAnimate}" placeholder="输入关键词搜索..."/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				isAnimate:false
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
	.animateWidth{
		width: 450upx!important;
	}
	.cu-bar-search{
		margin: 0 24upx;
		// width: 250upx;
		width: 450upx;
        height: 72upx;
		line-height: 72upx;
		z-index: 99999;
		padding: 0 24upx;
		transition: 800ms ease;
		border-radius: 40upx;
		background-color: #f6f7f9;
	}
	// .none-bg{
	// 	background-color: rgba(0,0,0,0);
	// }

</style>
