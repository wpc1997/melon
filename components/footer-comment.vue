<template>
	<view class="footer-comment" :style="[{height:CustomBar + 'px'}]">
		<view class="fixed" :style="style">
			<view class="operation">
				<view class="operation-input text-sm" @tap="popupComment">
					{{commend==''?'说点什么呗~':commend}}
				</view>
				<view class="operation-share">
					<text class="cuIcon-share text-sm"></text>
					<view><text class="text-xs">15</text></view>
				</view>
				<view class="operation-collection">
					<text class="cuIcon-favor text-sm"></text>
					<view><text class="text-xs">3</text></view>
				</view>
				<view class="operation-click">
					<text class="cuIcon-appreciate text-sm"></text>
					<view><text class="text-xs">8</text></view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			commend:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			}
		},
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var style = `height:${CustomBar}px;padding-bottom:${StatusBar}px;`;
				return style
			}
		},
		methods: {
			popupComment(){
				this.$emit("popupComment",true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer-comment{
		.fixed{
			border-top: 1px solid #f6f7f9;
			position: fixed;
			width: 100%;
			bottom: 0;
			z-index: 99;
			background-color: #FFFFFF;
			left:0;
			.operation{
				padding: 12upx 24upx;
				display: flex;
				&-input{
					width: 350upx;
					height: 60upx;
					line-height: 60upx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					background-color: #f6f7f9;
					border-radius: 100px;
					text-indent: 30upx;
					color: #888888;
				}
				&-share,&-collection,&-click{
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					text{
						color: #888888;
					}
					view{
						position: relative;
						width: 24upx;
						height: 24upx;
						text{
							position: absolute;
							color: #888888;
							left: 2upx;
							top: -8upx;
						}
					}
				}
			}
		}
	}
</style>
