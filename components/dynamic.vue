<template>
	<view class="dynamic">
		
		<!-- 头像这一块，每一部分都用view装起来，为了后期增加元素 -->
		<view class="dynamic-user">
			<view class="dynamic-user-avatar">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg" class="avatar"></image>
			</view>
			<view class="dynamic-user-name">
				<view class="name">
					<text class="text-sm">西瓜_</text>
				</view>
				<view class="time">
					<text class="text-xs">两分钟前更新</text>
				</view>
				
			</view>
		</view>
		
		<!-- 内容区 -->
		<view class="dynamic-info" @click="toDetail">
			<view class="dynamic-info-title text-df">
				olay淡斑小白瓶拼单小样
			</view>
			<view class="dynamic-info-content text-df">
				淡斑小白瓶拼单小样淡斑小白瓶拼单小样淡斑小白瓶拼单小样淡斑小白瓶拼单小样
			</view>
		</view>
		
		<!-- 图片区 分为 1张 2张 3张 4张 9张 样式 -->
		<view class="dynamic-images">
			
			<!-- 只有1张图的时候的样式 -->
			<view class="dynamic-images-1" v-if="imageList.length===1">
				<!-- <image mode="aspectFit" :src="imageList[0].url"></image> -->
				<view :style="{backgroundImage: 'url('+imageList[0].url+')'}"></view>
			</view>
			
			<!-- 有2张图的时候的样式 -->
			<view class="dynamic-images-2" v-if="imageList.length===2">
				<image mode="center" :src="item.url" v-for="(item,index) in imageList" :key="index"></image>
			</view>
			
			<!-- 只有3张图的时候的样式 -->
			<view class="dynamic-images-3" v-if="imageList.length===3">
				<view>
					<image class="preview" mode="center" :src="imageList[0].url"></image>
					<image mode="center" :src="imageList[0].url"></image>
				</view>
				<view>
					<image mode="center" :src="imageList[1].url"></image>
					<image mode="center" :src="imageList[2].url"></image>
				</view>
			</view>
			
			<!-- 只有4张图的时候的样式 -->
			<view class="dynamic-images-4" v-if="imageList.length===4">
				<view :style="{backgroundImage: 'url('+item.url+')'}" v-for="(item,index) in imageList" :key="index"></view>
			</view>
			
			<!-- 大于4张图的时候的样式 -->
			<view class="dynamic-images-more" v-if="imageList.length>4">
				<view :style="{backgroundImage: 'url('+item.url+')'}" v-for="(item,index) in imageList" :key="index"></view>
			</view>
		</view>
	
		<!-- 部分评论 -->
		<view class="dynamic-comment">
			<view>
				<view>
					种草莓的西瓜<text class="text-xxs">楼主</text>:
				</view>
				手机原相机拍摄，非常真实！手机原相机拍摄，非常真实！手机原相机拍摄，非常真实！
			</view>
		</view>
	
		<!-- 底部 -->
		<view class="dynamic-footer" @click="toDetail">
			<view class="text-sm">发布于2021-05-31</view>
			<view>
				<text class="cuIcon-mark text-df"></text>
				<text class="text-sm">20</text>
				<text class="cuIcon-favor text-df"></text>
				<text class="text-sm">35</text>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				imageList:[
					{
						url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					},
					{
						url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					},
					{
						url:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					},
				], //图片容器
			}
		},
		methods:{
			
			//跳转到详情页
			toDetail(){
				uni.navigateTo({
					url:'/view/unused-detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dynamic{
		padding: 24upx;
		background-color: #FFFFFF;
		border-bottom: 20upx solid #f6f7f9;
		&-user{
			display: flex;
			
			&-avatar{
				image.avatar{
					width: 70upx;
					height: 70upx;
					border-radius: 50%;
				}
			}
			&-name{
				margin-left: 14upx;
				.name{
					>text:nth-of-type(1){
						color: #222222;
					}
				}
				.time{
					>text:nth-of-type(1){
						color: #888888;
					}
				}
			}
		}
		
		&-info{
			margin-top: 24upx;
			&-title{
				font-weight: 500;
				line-height: 48upx;
			}
			&-content{
				color: #888888;
				line-height: 48upx;
			}
		}
	
		&-images{
			margin-top: 24upx;
			&-1{
				view{
					max-width: 100%;
					height: 500upx;
					background-repeat: no-repeat;
					background-position: center;
					border-radius: 12upx;
				}
			}
			&-2{
				display: flex;
				image{
					border-radius: 12upx;
					flex: 1;
					max-height: 250upx;
				}
				image:nth-of-type(1){
					margin-right: 12upx;
				}
				image:nth-of-type(2){
					margin-left: 12upx;
				}
			}
			&-3{
				display: flex;
				max-height: 450upx;
				height: 450upx;
				>view{
					position: relative;
				}
				>view:nth-of-type(1){
					flex: 1.5;
					margin-right: 12upx;
					image.preview{
						position: absolute;
						left: 0;
						top: 0;
						z-index: -1;
					}
					image{
						border-radius: 12upx;
						width: 100%;
						height: 100%;
					}
				}
				>view:nth-of-type(2){
					margin-left: 12upx;
					flex: 1;
					display: flex;
					flex-flow: column;
					>image{
						border-radius: 12upx;
						height: calc(50% - 12upx);
						width: 100%;
					}
					>image:nth-of-type(1){
						margin-bottom: 12upx;
					}
					>image:nth-of-type(2){
						margin-top: 12upx;
					}
				}
			}
			&-4{
				max-height: 690upx;
				height: 690upx;
				display: grid;
				grid-column-gap: 24upx;
				grid-row-gap: 24upx;
				grid-template-columns:repeat(2,1fr);
				view{
					background-repeat: no-repeat;
					background-position: center;
					width: 339upx;
					border-radius: 12upx;
				}
			}
			&-more{
				display: grid;
				grid-column-gap: 4upx;
				grid-row-gap: 4upx;
				grid-template-columns:repeat(3,1fr);
				view{
					background-repeat: no-repeat;
					background-position: center;
					width: 231upx;
					height: 231upx;
				}
			}
		
		}
	
		&-comment{
			>view{
				margin: 24upx 0;
				padding: 8upx 24upx;
				color: #888888;
				border-left: 1px solid #888888;
				white-space: 5upx;
				>view{
					// display: inline-block;
					display: flex;
					align-items: center;
					float: left;
					color: #333333;
					height: 38upx;
					line-height: 38upx;
					>text{
						color: #FFFFFF;
						line-height: 16upx;
						height: 16upx;
						display: block;
						background-color: #E2585A;
						border-radius: 6upx;
						padding: 2upx 4upx;
						margin: 0 4upx;
					}
				}
			}
		}
	
		&-footer{
			padding: 36upx 0 12upx 0;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			>view{
				color: #888888;
			}
			>view:nth-of-type(2){
				color: #888888;
				display: inline-flex;
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
