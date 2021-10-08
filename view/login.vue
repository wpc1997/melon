<template>
	<view class="login-main">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content"></block>
		</cu-custom>

		<view class="login">


			<view class="login-title text-xxl">登录</view>
			<view class="login-input margin-input">
				<input placeholder="请输入手机号" v-model="phone" placeholder-class="placeholder-text" maxlength="11"
					confirm-type="next" />
			</view>
			<view class="login-input">
				<input placeholder="密码" v-model="password" placeholder-class="placeholder-text" maxlength="16"
					confirm-type="done" />
			</view>
			<view class="login-operate">
				<text class="text-sm" @tap="toReset">忘记密码？</text>
				<text class="text-sm" @tap="toRegister">立即注册</text>
			</view>

			<view class="login-btn">登录</view>

			<view class="login-other">
				<view class="login-other-driver">
					<view class="driver"></view>
					<text class="text-sm">或</text>
					<view class="driver"></view>
				</view>
				<view class="login-other-way">
					<image src="../static/img/weChat.png" @tap="toAuthorize"></image>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: '',
			}
		},
		methods: {



			//去注册
			toRegister() {
				uni.navigateTo({
					url: './register'
				})
			},

			//去修改密码
			toReset() {
				uni.navigateTo({
					url: './reset'
				})
			},

			//去授权
			toAuthorize() {
				let _this = this
				uni.getProvider({
					service: 'oauth',
					success: function(result) {
						console.log(result.provider)
						if (result.provider.length) {
							uni.getUserProfile({
								provider: result.provider[0],
								desc: '初始化基础信息',
								success: function(res) {
									console.log('用户信息code：', res);
									uni.showLoading({
										title: '授权中'
									})
									uni.setStorageSync('user', res.userInfo)
									_this.getCode(result.provider[0], res.userInfo)
								},
								fail: function(err) {
									console.log('用户信息err：', err);
								}
							})
						}
					}
				});
			},

			//获取用户的code
			getCode(provider, userInfo) {
				let _this = this
				uni.login({
					provider: provider,
					success: function(res) {
						console.log(res);
						_this.getOpenId(res.code, userInfo)
					}
				});
			},

			//获取用户的openid
			getOpenId(code, userInfo) {
				uni.request({
						method:'POST',
						url: 'http://192.168.1.113:9091/openid/registerOpenId',
						data: {
							code: code,
							nickName: userInfo.nickName
						},
						dataType:'json'
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						var [error, res] = data;
						console.log(res);
					})
				// uniCloud.callFunction({
				// 	name: 'getOpenId',
				// 	data: {
				// 		code: code,
				// 		nickName: userInfo.nickName
				// 	}
				// }).then(res => {
				// 	console.log('获取openid成功：', res)
				// 	// this.selectUser(res.result.data.openid)
				// }).catch(err => {
				// 	console.log('获取openid失败：', err)
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ {
		.placeholder-text {
			color: #C4C4C6;
			font-size: 24upx;
		}
	}

	.login-main {
		display: flex;
		flex-flow: column;
		min-height: 100vh;
		overflow: hidden;
	}

	.active-btn {
		background-color: rgba(235, 84, 73, 1) !important;
	}

	.login {
		position: relative;
		flex: 1;
		background-color: #FFFFFF;
		padding: 0 64upx;

		&-title {
			font-weight: 500;
			margin-top: 24upx;
		}

		.margin-input {
			margin-top: 80upx !important;
		}

		&-input {
			margin-top: 42upx;

			input {
				height: 90upx;
				display: flex;
				align-items: center;
				background-color: rgba(0, 0, 0, 0);
				border-top: none;
				border-left: none;
				border-right: none;
				border-bottom: 1upx solid #E6E6E6;
			}
		}

		&-operate {
			margin-top: 36upx;
			display: flex;
			justify-content: flex-start;

			>text:first-child {
				color: #686868;
			}

			>text:last-child {
				margin-left: auto;
				color: #BD362E;
			}
		}

		&-btn {
			margin-top: 64upx;
			border-radius: 1000px;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 90upx;
			background-color: rgba(235, 84, 73, 0.4);
			transition: .2s ease;
			color: #FFFFFF;
		}

		&-other {
			position: absolute;
			bottom: 180upx;
			width: calc(100% - 128upx);

			&-driver {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				text {
					color: #C4C4C6;
					margin: 0 24upx;
				}

				view {
					flex: 1;
					border: none;
					height: 1upx;
					background-color: #E6E6E6;
				}
			}

			&-way {
				margin-top: 64upx;
				display: flex;
				justify-content: center;

				image {
					width: 76upx;
					height: 76upx;
					border-radius: 50%;
				}
			}
		}
	}
</style>
