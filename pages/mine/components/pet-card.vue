<template>
	<view class="pet-card">

		<!-- 宠物卡片 -->
		<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>

		<!-- 模糊背景 -->
		<view class="pet-card-filter"></view>

		<view class="pet-card-panel">
			<view class="pet-card-panel-avatar">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
			</view>
			<view class="pet-card-panel-info">
				<view>
					<text class="text-lg text-white">{{item.name}}</text>
					<view>
						<text class="cuIcon-female text-lg"></text>
					</view>

				</view>
				<view>
					<view>
						<text class="text-xs">8个月15天</text>
					</view>
					<view>
						<text class="text-xs">威尔士柯基犬</text>
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default{
		props:{
			item:{
				type:Object,
				default:() =>{
					return {}
				}
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pet-card {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 24upx;
		padding: 0 24upx;
		overflow: hidden;
		width: 100%;
		height: 100%;


		
		&-panel {
			position: relative;
			display: flex;
			flex: 1;
			border-radius: 24upx;
			z-index: 2;

			&-avatar {
				>image {
					width: 90upx;
					height: 90upx;
					border-radius: 50%;
				}
			}

			&-info {
				margin-left: 10upx;

				// display: flex;
				>view:nth-of-type(1) {
					display: flex;
					align-items: center;
					justify-content: flex-start;

					>view {
						margin: 0 4upx;
						padding: 2upx 4upx;
						display: inline-flex;
						background-color: #F0F0F0 !important;
						border-radius: 1000px;

						.cuIcon-female {
							color: #EB9451 !important;
						}

						.cuIcon-male {
							color: #298BFF !important;
						}
					}

				}

				>view:nth-of-type(2) {
					display: flex;

					>view {
						margin: 0 4upx;
						padding: 2upx 4upx;
						display: inline-flex;
						background-color: #F0F0F0 !important;
						border-radius: 1000px;

						>text {
							color: #E67770;
						}
					}
				}
			}

		}

		>image {
			position: absolute;
			left: 0;
			top: 0;
			border-radius: 24upx;
			width: 100%;
			height: 100%;
			z-index: 0;
		}
		&-filter{
			border-radius: 24upx;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			backdrop-filter: blur(2px) brightness(50%);
			background-color: rgba(255, 255, 255, .1);
			z-index: 1;
		}	
	}
</style>
