<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-black bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back" :style="{color:backColor&&o<0.65?backColor:'#222222'}"></text>
					<slot name="backText" :style="{color:backColor&&o<0.65?backColor:'#222222'}"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
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
				r:0,
				g:0,
				b:0,
				o:0.1,//透明度
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
				if (this.isAnimal) {
					let v = 0;
					let _o = 0.01
					
					_o = this.scrollTop / 200
					v = this.scrollTop / 0.65
				
					this.o = _o>1?1:_o
					this.r = this.g = this.b = v>255?255:v
					style = `${style}background-image: linear-gradient(rgba(${this.r}, ${this.g}, ${this.b}, 1), rgba(${this.r}, ${this.g}, ${this.b}, ${this.o}));`;
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
			backColor:{
				type: String,
				default: undefined
			},
			isTap:{
				type: [Boolean, String],
				default: false
			},
			isAnimal:{
				type:Boolean,
				default: false
			},
			scrollTop:{
				type:Number,
				default: 0
			}
		},
		methods: {
			BackPage() {
				if(this.isTap){
					this.$emit('clickTap')
					return
				}
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .none-bg{
	// 	background-color: rgba(0,0,0,0);
	// }

</style>
