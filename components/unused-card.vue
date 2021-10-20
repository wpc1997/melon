<template>
	<view class="panel">
		<view class="panel-card" @click="toUnused(item.id)">
			<!--      <view class="topTag tagColor-1" v-if="v.tag == '0'">游记</view>-->
			<image mode="aspectFill" :src="item.coverImg"></image>
			<view class="panel-info">
				<view class="panel-title">{{ item.title }}</view>
				<view class="panel-1">
					<view class="account">
						<text class="text-price text-xl">{{item.price}}</text>
					</view>
					<view class="look">
						<!-- <img :src="imgSrc" /> -->
						<view class="text-xs">{{ item.consult+' 想要' }}</view>
					</view>
				</view>
				<view class="panel-1">
					<view class="account">
						<image class="round" :src="item.avatar"></image>
						<view class="text-sm text-gray">{{ item.userName }}</view>
					</view>
					<view class="look">
						<!-- <img :src="imgSrc" /> -->
						<view class="text-sm">{{ item.createTime }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		watch: {
			item() {
				console.log(this.item)
			}
		},
		data() {
			return {

			}
		},
		methods: {

			//去闲置详情页
			toUnused() {

			}

		}
	}
</script>

<style scoped lang="scss">
	.look {
		image {
			width: 32upx;
			height: 24upx;
		}
	}

	image {
		width: 100%;
		max-height: 400upx;
	}

	.round {
		border-radius: 50%;
		width: 42upx;
		height: 42upx;
	}

	.panel {
		width: 332upx;

		&-card {
			position: relative;
			width: 332upx;
			box-shadow: 4upx 4upx 40upx 0upx rgba(226, 226, 226, 0.5);
			border-radius: 16upx;
			overflow: hidden;
			background-color: #ffffff;
			margin-top: 20upx;
			image{
				display: block;
			}
			.topTag {
				position: absolute;
				top: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				left: 0;
				font-size: 24upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #222222;
				padding: 6upx 14upx;
				border-radius: 16upx 0upx 16upx 0upx;
			}

			.tagColor-1 {
				background: #fcd209;
			}

			.tagColor-2 {
				background: linear-gradient(137deg, #ffead7 0%, #fddb9e 100%);
			}

			.panel-info {
				padding: 10upx;

				.panel-title {
					// margin: 10upx 0;
					font-size: 28upx;
					color: #222222;
					font-weight: 550;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.panel-2 {
					margin: 10upx 0;

					.info {
						display: flex;
						justify-content: flex-end;

						.oldPrice:before {
							content: '¥';
							color: #bebebe;
							margin-right: 4upx;
							font-size: 24upx;
						}

						.oldPrice {
							color: #bebebe;
							font-size: 24upx;
							text-decoration: line-through;
						}

						.already:before {
							content: '想要';
							color: #bebebe;
							margin-right: 4upx;
							font-size: 24upx;
						}

						.already {
							color: #bebebe;
							margin-right: 4upx;
							font-size: 24upx;
							margin-left: auto;
						}

						.already:after {
							content: '件';
							color: #bebebe;
							margin-right: 4upx;
							font-size: 24upx;
						}
					}

					.price:before {
						content: '¥';
						color: #fc5609;
						margin-right: 4upx;
						font-size: 24upx;
					}

					.price {
						color: #fc5609;
						font-size: 36upx;
						font-weight: 500;
					}

					.price:after {
						content: '起';
						color: #bebebe;
						margin-left: 4upx;
						font-size: 24upx;
					}
				}

				.panel-1 {
					margin: 16upx 0;
					display: flex;
					justify-content: flex-start;

					.account,
					.look {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						view {
							margin-left: 10upx;
						}

						.text-price {
							font-weight: 450;
							color: #F95703;
						}
					}

					.look {
						margin-left: auto;

						view {
							color: #bebebe;
						}
					}
				}
			}
		}
	}
</style>
