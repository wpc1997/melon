<template>
	<view class="channel">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">频道</block>
		</cu-custom>
		
		<!-- 热门模块 -->
		<view class="channel-hot">
			<view class="channel-hot-head">
				<text class="text-df">热门小组 11</text>
				<view class="text-xs">
					查看更多
					<text class="cuIcon-right text-xs"></text>
				</view>
			</view>
			<hotCards></hotCards>
		</view>
		
		<!-- 关注小组的动态 -->
		<view class="text-lg channel-focus"><text class="cuIcon-skinfill"></text>关注小组的动态</view>
		
		<!-- 关注小组的动态排列 -->
		<view class="channel-content">
			<panel></panel>
			<panel></panel>
			<panel></panel>
		</view>
		
	</view>
</template>

<script>
	import hotCards from "@/pages/index/components/hot-cards";
	import panel from "@/components/panel.vue";
	export default {
		components: {
			hotCards,
			panel
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.channel {

		

		&-hot {
			margin-top: 24upx;
			&-head {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-right: 24upx;
				padding-bottom: 24upx;

				>view {
					color: #888888;
					margin-left: auto;

					>text {
						color: #888888;
					}
				}

				>text {
					font-weight: 500;
					margin-left: 24upx;
				}
			}
		}

		&-focus{
			margin: 0 24upx;
			padding: 24upx 0;
			border-bottom: 1px solid #f6f7f9;
			font-weight: 500;
				color: #222222;
			text{
				color: #222222;
				margin-right: 12upx;
				font-weight: 500;
			}
		}


	}
</style>
