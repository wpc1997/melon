<template>
	<view class="user-info">
		<view class="user-info-avatar">
			<image class="avatar" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg"></image>
		</view>
		<view class="user-info-other" @tap="toMinePanel" v-if="isLogin">
			<view class="user-info-other-left">
				<view class="name">
					<text class="text-lg">西瓜种草机</text>
				</view>
				<view class="description text-sm">
					暂无个人简介
				</view>
				<view class="growth">
					<text class="text-xs">成长值</text>
					<view class="cu-progress radius striped active">
						<view class="bg-orange" :style="[{ width:'30%'}]"></view>
					</view>
				</view>
			</view>
			<view class="user-info-other-right">
				<text class="cuIcon-right"></text>
			</view>
		</view>
		
		<!-- 未登录时 -->
		<view class="user-info-other noLogin" @tap="toLogin" v-else>
			<text class="text-custom-weight text-xl">未登录，点击登录~</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin:this.$store.state.user.isLogin
			}
		},
		mounted() {
			console.log(this.$store.state.user.isLogin)
		},
		methods:{
			
			//跳转到 我的 面板
			toMinePanel(){
				this.$emit('toMinePanel')
			},
			
			//去登陆
			toLogin(){
				this.$emit('toLogin')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-info {
		padding: 24upx;
		display: flex;
		&-avatar {
			image.avatar {
				width: 140upx;
				height: 140upx;
				border-radius: 50%;
			}
		}

		.noLogin{
			align-items: center;
			justify-content: flex-start;
			padding-left: 24upx;
		}
		&-other {
			flex: 1;
			display: flex;
			&-left {
				flex: 1;
				display: flex;
				justify-content: space-evenly;
				flex-flow: column;
				margin-left: 20upx;
				.name {
					color: #222222;
					font-weight: 500;
				}

				.description {
					color: #666666;
					font-weight: 450;
					display: block;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.growth {
					display: flex;
					align-items: center;
					.cu-progress{
						width: 50%;
						height: 10upx;
						// background-color: #F6F7F9;
					}
					text:nth-of-type(1){
						margin-right: 10upx;
						color: #888888;
					}
				}
			}

			&-right {
				text{
					font-size: 34upx;
				}
				display: flex;
				align-items: center;
				color: #888888;
			}
		}
	}
</style>
