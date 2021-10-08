<template>
	<view class="issue-dynamic">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">发布{{type=='1'?'闲置':'图文'}}</block>
		</cu-custom>

		<view class="issue-dynamic-content">

			<!-- 标题 -->
			<view class="title">
				<input class="text-xl" placeholder="标题 (可不填)" placeholder-class="placeholder-input" />
			</view>

			<!-- 内容 -->
			<view class="description">
				<textarea :auto-height="true" :maxlength="-1" placeholder="写点什么吧~"
					placeholder-class="placeholder-textarea" class="text-df">

				</textarea>
			</view>

			<!-- 图片 -->
			<view class="images">
				<uploadImage></uploadImage>
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

		</view>

		<!-- 发布按钮 -->
		<view class="issue-btn text-df" :class="{'animate-btn':isBtn}"><text class="cuIcon-add"></text> 发布</view>
	</view>
</template>

<script>
	import uploadImage from "@/components/upload-image.vue";

	export default {
		components: {
			uploadImage,
		},
		data() {
			return {
				type: '1',
				isBtn: false
			}
		},
		mounted() {
			setTimeout(()=>{
				this.isBtn=true
			},1500)
		},
		onLoad(option) {
			console.log(option)
			console.log(typeof optionio)
			this.type = option.type
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .placeholder-input {
		color: #888888;
		font-weight: 500;
	}

	/deep/ .placeholder-textarea {
		color: #888888;
		font-weight: 400;
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
	
	.issue-dynamic {
		&-content {
			.title {
				padding: 48upx;

				input {
					border: none;
					font-weight: 500;
					color: #222222;
				}
			}

			.description {
				padding: 24upx;
				border-top: 1px solid #f6f7f9;
				border-bottom: 1px solid #f6f7f9;
				min-height: 400upx;

				textarea {
					padding: 24upx 0;
					min-height: 352upx;
					color: #222222;
					width: 100%;
					height: unset;
				}
			}

			.images {
				padding: 24upx 24upx 4upx 24upx;
				border-bottom: 1px solid #f6f7f9;
			}

			.topic {
				.cu-list {
					.cu-item {
						.content {
							>text:first-child {
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
	}
</style>
