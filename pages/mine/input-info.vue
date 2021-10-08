<template>
	<view class="input-info">
		
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">编辑</block>
		</cu-custom>
		
		<view class="input-info-input" v-if="type=='昵称'">
			<input placeholder="输入昵称" v-model="value" maxlength="5"/>
			<view class="text-sm">*最多五个字，不能存在空格以及特殊字符</view>
		</view>
		
		
		
		<view class="input-info-textarea" v-if="type=='签名'">
			<textarea placeholder="输入签名"></textarea>
			<view class="text-sm">*最多20个字，不能存在特殊字符</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:'昵称'
			}
		},
		onLoad(option) {
			console.log(option)
			this.type=option.type
		}
	}
</script>

<style lang="scss" scoped>
	.input-info{
		min-height: 100vh;
		background-color: #F1F1F1;
		&-input{
			margin-top: 24upx;
			input{
				background-color: #FFFFFF;
				width: 100%;
				height: 80upx;
				padding: 0 24upx;
				
			}
			>view{
				color: #888888;
				padding: 24upx;
			}
		}
		&-textarea{
			margin-top: 24upx;
			textarea{
				background-color: #FFFFFF;
				width: 100%;
				padding: 24upx;
			}
			>view{
				color: #888888;
				padding: 24upx;
			}
		}
	}
	
	
</style>
