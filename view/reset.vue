<template>
	<view class="login-main">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content"></block>
		</cu-custom>

		<view class="login" :style="{top:(CustomBar+12)+'px'}" :class="step==1?'animate-reset-1':'animate-reset-0'">


			<view class="login-title"><text class="text-xxl">重置密码</text>（<text>{{step}}</text>/2）</view>
			<view class="login-input margin-input">
				<input placeholder="请输入手机号" v-model="phone" placeholder-class="placeholder-text" maxlength="11"
					confirm-type="next" />
			</view>
			<view class="login-input">
				<input class="input-code" placeholder="验证码" v-model="password" placeholder-class="placeholder-text"
					maxlength="6" confirm-type="next" />
				<text class="code text-xs" @tap="getCode">发送验证码</text>
			</view>

			<view class="login-btn" @tap="toNext">下一步</view>

		</view>
		<view class="login" :style="{top:(CustomBar+12)+'px'}" :class="step==2?'animate-reset-1':'animate-reset-2'">


			<view class="login-title"><text class="text-xxl">重置密码</text>（<text>{{step}}</text>/2）</view>
			<view class="login-input margin-input">
				<input placeholder="设置6-16位的登录密码" v-model="password" placeholder-class="placeholder-text" maxlength="16"
					confirm-type="next" />
			</view>
			<view class="login-input">
				<input placeholder="确认密码" v-model="password" placeholder-class="placeholder-text" maxlength="16"
					confirm-type="next" />
			</view>

			<view class="login-btn">完成</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: '',
				step: 1,
				CustomBar: this.CustomBar
			}
		},
		methods: {

			//下一步
			toNext() {
				this.step = 2
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

	.animate-reset-0 {
		transform: translateX(-100%);
	}

	.animate-reset-1 {
		transform: translateX(0);
	}

	.animate-reset-2 {
		transform: translateX(100%);
	}

	.login-main {
		display: flex;
		flex-flow: column;
		min-height: 100vh;
		overflow: hidden;
		position: relative;
	}

	.active-btn {
		background-color: rgba(235, 84, 73, 1) !important;
	}

	.login {
		width: 100%;
		position: absolute;
		flex: 1;
		transition: .5s ease;
		background-color: #FFFFFF;
		padding: 0 64upx;
		left: 0;

		&-title {
			margin-top: 24upx;
			color: #C4C4C6;

			>text {
				color: #222222;
				font-weight: 500;
			}
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

			input.input-code {
				padding-right: 150upx;
			}

			.code {
				right: 12upx;
				top: 50%;
				transform: translateY(-50%);
				position: absolute;
				color: #BD362E;
				z-index: 99;
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


	}
</style>
