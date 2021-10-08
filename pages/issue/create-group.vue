<template>
	<view class="create-group">
		
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">创建小组</block>
		</cu-custom>
		
		
		<!-- 标题 -->
		<view class="create-group-title">
			<view class="title text-lg">小组标题</view>
			<view>
				<input class="text-xl" placeholder="标题 (可不填)" placeholder-class="placeholder-input"/>
			</view>
		</view>
		
		<!-- 封面 -->
		<view class="create-group-image">
			<view class="title text-lg">小组封面</view>
			<view>
				<uploadImage></uploadImage>
			</view>
			
		</view>
		
		<!-- 小组描述 -->
		<view class="create-group-description">
			<view class="title text-lg">小组描述</view>
			<view>
				<textarea :auto-height="true" :maxlength="30" placeholder="写点什么吧~" placeholder-class="placeholder-textarea">
					
				</textarea>
			</view>
			
		</view>
		
		
		<!-- 参与话题 -->
		<view class="topic">
			<view class="cu-list menu">
				<view class="cu-item arrow no-border">
					<view class="content">
						<text class="text-xs">#</text>
						<text class="text-deep-black text-df text-custom-weight">参与话题</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">选择合适的话题可以让更多人看到</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 发布按钮 -->
		<view class="issue-btn text-df" :class="{'animate-btn':isBtn}"><text class="cuIcon-add"></text> 发布</view>
	</view>
</template>

<script>
	import uploadImage from "@/components/upload-image.vue";
	
	export default{
		components:{
			uploadImage,
		},
		data(){
			return{
				isBtn:false
			}
		},
		mounted() {
			setTimeout(()=>{
				this.isBtn=true
			},1500)
		},
	}
</script>

<style lang="scss" scoped>
	/deep/ .placeholder-input{
		color: #888888;
		font-weight: 500;
		font-size: 24upx;
		background-color: #f6f7f9;
	}
	/deep/ .placeholder-textarea{
		color: #888888;
		font-weight: 400;
	}
	.title{
		font-weight: 500;
		margin: 24upx 0;
	}
	.animate-btn{
		bottom: 120upx!important;
	}
	.issue-btn{
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: -64upx;
		transition: 800ms ease;
		width: 250upx;
		border-radius: 100px;
		height: 64upx;
		background-color: rgba(226,88,90,0.7);
		color: #FFFFFF;
		text{
			color: #FFFFFF;
		}
	}
	.create-group{
		min-height: 100vh;
		background-color: #FFFFFF;
		padding: 24upx;
		
		&-title{
			>view{
				input{
					padding: 0 24upx;
					height: 80upx;
					border-radius: 100px;
					background-color: #f6f7f9;
				}
			}
		}
		
		&-description{
			
			textarea{
				height: 400upx!important;
				padding: 24upx;
				width: 100%;
				border-radius: 24upx;
				background-color: #f6f7f9;
			}
		}
		
		.topic{
			.cu-list{
				.cu-item{
					.content{
						>text:first-child{
							border-radius: 8upx;
							padding: 2upx 6upx;
							margin: 0 6upx 0 0;
							vertical-align: middle;
							color: #FFFFFF;
							background-color: #222222;
						}
					}
				}
			}
		}
	}
</style>
