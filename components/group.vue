<template>
	<view class="group">
		<view class="group-head">
			<view>
				<image class="avatar" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"></image>
			</view>
			<view>
				<text class="text-df">购后晒单</text>
				<text class="text-sm">85585人关注</text>
			</view>
		</view>
		<view class="group-description text-sm">
			收到货以后晒个单，告诉路友不值得购买
		</view>
		<view class="group-images">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg"></image>
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg"></image>
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg"></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.group{
		padding: 24upx;
		margin: 24upx;
		background-color: #FFFFFF;
		border-radius: 24upx;
		&-head{
			display: flex;
			>view:nth-of-type(1){
				image.avatar{
					width: 80upx;
					height: 80upx;
					border-radius: 24upx;
				}
			}
			>view:nth-of-type(2){
				flex: 1;
				margin-left: 12upx;
				display: flex;
				flex-flow: column;
				justify-content: center;
				>text:first-child{
					font-weight: 500;
					color: #222222;
				}
				>text:last-child{
					color: #888888;
				}
			}
		}
	
		&-description{
			padding: 24upx 0;
			color: #888888;
		}
		
		&-images{
			display: flex;
			image{
				width: 186upx;
				height: 186upx;
				border-radius: 24upx;
			}
			image:not(:first-child){
				margin-left: 48upx;
			}
		}
	
	
	}
</style>
