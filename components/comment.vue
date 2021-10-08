<template>
	<view class="comment">
		
		<!-- 头像 -->
		<view class="comment-avatar">
			<image class="avatar" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg"></image>
		</view>
		
		<!-- 信息 -->
		<view class="comment-info">
			<view class="comment-info-name">
				<view>
					<view class="text-sm">十二</view>
					<view class="text-xs">6月6日 23:00</view>
				</view>
				<view>
					<text class="cuIcon-appreciate text-df"></text>
					<text class="text-sm">4</text>
				</view>
			</view>
			
			<!-- 评论 -->
			<view class="comment-info-content text-df">
				评论评论评论评论
			</view>
			
			<!-- 评论层数 -->
			<view class="comment-list">
				<commentList></commentList>
			</view>
			
			
		</view>
		
		
	</view>
</template>

<script>
	
	
	import commentList from "@/components/comment-list.vue";
	
	export default{
		components:{
			commentList,
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment{
		display: flex;
		
		padding: 24upx 0;
		border-bottom: 1px solid #f6f7f9;
		&-avatar{
			image.avatar{
				width: 60upx;
				height: 60upx;
				border-radius: 50%;
			}
		}
		&-info{
			flex: 1;
			&-name{
				display: flex;
				align-items: center;
				>view:first-child{
					height: 60upx;
					margin-left: 12upx;
					>view:first-child{
						color: #222222;
						font-weight: 500;
					}
					>view:last-child{
						color: #888888;
						
					}
					
				}
				>view:last-child{
					display: inline-flex;
					margin-left: auto;
					text{
						color: #888888;
					}
					>text:last-child{
						margin-left: 6upx;
					}
				}
			}
			&-content{
				color: #222222;
				padding-top: 24upx;
			}
		}
		&-list{
			background-color: #FAFAFB;
			padding: 0 12upx;
		}
		
		
	}
</style>
