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
			<input class="input-code" placeholder="验证码" v-model="password" placeholder-class="placeholder-text" maxlength="6"
				confirm-type="next" />
				<text class="code text-xs" @tap="getCode">发送验证码</text>
		</view>
		<view class="login-input">
			<input placeholder="设置6-16位的登录密码" v-model="password" placeholder-class="placeholder-text" maxlength="16"
				confirm-type="next" />
		</view>
		<view class="login-input">
			<input placeholder="设置昵称" v-model="password" placeholder-class="placeholder-text" maxlength="7"
				confirm-type="done" />
		</view>

		<view class="login-btn">注册</view>

		
		<view class="login-operate">
			<text class="text-sm" @tap="toLogin">已有账号，去登陆</text>
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
		methods:{
			
			//获取验证码
			getCode(){
				console.log('验证码')
			},
			
			//去登陆
			toLogin(){
				uni.navigateBack()
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

	.login-main{
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
			position: relative;

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
			input.input-code{
				padding-right: 150upx;
			}
			.code{
				right: 12upx;
				top: 50%;
				transform: translateY(-50%);
				position: absolute;
				color: #BD362E;
				z-index: 99;
			}
		}

		&-operate {
			margin-top: 36upx;
			display: flex;
			justify-content: center;

			>text {
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
