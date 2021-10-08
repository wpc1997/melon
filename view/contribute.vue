<template>
	<!-- 文案投稿 -->
	<view class="contribute">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">文案投稿</block>
		</cu-custom>
		
		<!-- 输入框 -->
		<view class="contribute-input">
			<input placeholder="请输入文案" :focus="true" v-model="value"/>
		</view>
		
		<!-- 提示 -->
		<view class="contribute-notice">*你的文案将出现在首页,请有爱投稿~</view>
		
		<!-- 发布按钮 -->
		<view class="contribute-btn">确认投稿</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contribute{
		background-color: #F1F1F1;
		min-height: 100vh;
		max-height: 100vh;
		&-input{
			height: 80upx;
			display: flex;
			align-items: center;
			border-radius: 8upx;
			padding: 0 10upx;
			background-color: #FFFFFF;
			margin: 24upx 12upx;
		}
		&-notice{
			color: #888888;
			margin: 0 12upx 24upx 12upx;
		}
		&-btn{
			margin-top: 24upx;
			background-color: rgba(226,88,90,0.7);
			border-radius: 1000px;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 16upx 60upx;
		}
	}
</style>
