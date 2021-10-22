<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back" v-if="isShowBack"></text>
					<slot name="backText"></slot>
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
				o:0
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
				
					this.o = _o > 1 ? 1 : _o
					style =
						`${style}background-color:rgba(${this.customColor.r},${this.customColor.g},${this.customColor.b},${this.o})`;
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
			customColor: {
				type: Object,
				default: function(){
					return {
						r:255,
						g:255,
						b:255
					}
				}
			},
			isAnimal: {
				type: Boolean,
				default: false
			},
			scrollTop: {
				type: Number,
				default: 0
			},
			isShowBack: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			BackPage() {
				if(this.isShowBack){
					uni.navigateBack({
					delta: 1
				});
				}
				
			}
		}
	}
</script>

<style>

</style>
