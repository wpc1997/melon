<template>
	<view class="kill">
		<view class="kill-head">
			<view class="kill-head-left">
				<image src="../../../static/img/mall/kill-text.png"></image>
				<text class="text-df">天天有特价</text>
			</view>
			<view class="kill-head-right">
				<view>
					<text>主粮</text>
					<text>官方推荐</text>
				</view>
				<view>
					<text>零食</text>
					<text>官方推荐</text>
				</view>
				<view>
					<text>美容</text>
					<text>官方推荐</text>
				</view>
				<view>
					<text>医疗</text>
					<text>官方推荐</text>
				</view>
			</view>
		</view>
		<view class="kill-list">
			
			<view class="kill-list-card" v-for="(item,index) in 4" :key="index">
				
				<image src="https://img01.yzcdn.cn/vant/cat.jpeg" :class="{'first-img':index===0}"></image>
				
				<view :class="{'first':index===0}">
					<image src="../../../static/img/mall/tags.png" v-if="index===0"></image>
					<text class="text-price" :class="{'first-price':index===0}">18.8</text>
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.kill {

		&-head {

			display: flex;
			align-items: center;

			&-left {

				>image {
					display: block;
					width: 182upx;
					height: 44upx;
				}

				>text {
					color: #FF945C;
					display: block;
					margin-top: 6upx;
				}

			}

			&-right {
				display: flex;
				flex: 1;

				>view {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-flow: column;
					>text:first-child{
						color: rgba(255,148,92,1);
						font-size: 32upx;
						font-weight: 400;
					}
					>text:last-child{
						color: #888888;
						font-size: 24upx;
						margin-top: 4upx;
					}
				}
			}


		}
		
		&-list{
			display: flex;
			margin-top: 14upx;
			.kill-list-card:first-child{
				margin-right: 8upx;
			}
			.kill-list-card:not(:first-child){
				margin: 0 8upx;
			}
			&-card{
				// height: 60upx;
				position: relative;
				display: flex;
				flex-flow: column;
				justify-content: flex-end;
				align-items: center;
				image{
					width: 144upx;
					height: 144upx;
				}
				
				.first{
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: -30upx;
				}
				.first-img{
					width: 180upx!important;
					height: 180upx!important;
				}
				>view{
					width: 100%;
					padding: 12upx 0;
					// height: 60upx;
					position: relative;
					>text{
						color: #F95703;
						font-weight: 450;
					}
					>image{
						width: 156upx;
						height: 60upx;
						margin: 0 auto;
					}
					.first-price{
						font-size: 32upx;
						color: #FFFFFF;
						position: absolute;
						top: calc(50% - 4upx);
						left:calc(50% + 8upx);
						transform: translate(-50%,-50%);
					
					}
					
				}
				
			}
			
		}


	}
</style>
