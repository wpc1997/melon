<template>
	<view class="panel">
		<view class="panel-from text-sm">
			来自小组：不能一个人长草<text class="cuIcon-right text-sm"></text>
		</view>
		<view class="panel-top">
			<view class="panel-top-title">
				<view>
					<view class="tag text-xs">好物安利</view>
					每日最受欢迎的20每日最受欢迎的每日最受欢迎的每日最受欢迎的每日最受欢迎的每日最受欢迎的
				</view>
				
				<text class="text-sm">
					小透明发布商品可以选择投稿到#我刚刚下了一单#等话题来参与曝光哦
				</text>
			</view>
			<view class="panel-top-image">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
			</view>
		</view>
		
		<view class="panel-bottom">
			<view class="panel-bottom-user">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg"></image>
				<text class="text-sm">种草机</text>
			</view>
			<view class="panel-bottom-other">
				<text class="cuIcon-mark text-df"></text>
				<text class="text-sm">20</text>
				<text class="cuIcon-favor text-df"></text>
				<text class="text-sm">53</text>
			</view>
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
	.panel{
		padding: 24upx;
		background-color: #FFFFFF;
		border-bottom: 20upx solid #f6f7f9;
		&-from{
			color: #888888;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			padding-bottom: 24upx;
			text{
				margin-left: 12upx;
			}
		}
		&-top{
			display: flex;
			&-title{
				display: flex;
				flex-flow: column;
				>view:nth-of-type(1){
					line-height: 42upx;
					margin-left: 8upx;
					font-weight: 500;
					display: -webkit-box;
					overflow: hidden;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					.tag{
						border-radius: 6upx;
						display: inline-flex;
						background-color: #FFF0EB;
						color: #FC5609;
						max-height: 42upx;
						min-height: 42upx;
						height: 42upx;
						padding: 0 12upx;
						margin-right: 12upx;
						line-height: 42upx;
					}
				}
				>text{
					margin-top: 12upx;
					color: #888888;
					line-height: 36upx;
				}
				
			}
			&-image{
				padding: 0 0 0 24upx;
				image{
					width: 180upx;
					height: 180upx;
					border-radius: 24upx;
				}
			}
		}
		&-bottom{
			padding-top: 24upx;
			padding-bottom: 12upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			&-user{
				display: flex;
				align-items: center;
				image{
					width: 32upx;
					height: 32upx;
					border-radius: 50%;
				}
				text{
					margin-left: 10upx;
					color: #888888;
				}
			}
			&-other{
				display: flex;
				justify-content: flex-start;
				margin-left: auto;
				text{
					color: #888888;
				}
				text:nth-of-type(2){
					display: flex;
					align-items: center;
					margin-right: 24upx;
					margin-left: 8upx;
				}
				text:nth-of-type(4){
					display: flex;
					align-items: center;
					margin-left: 8upx;
				}
			}
		}
	}
</style>
