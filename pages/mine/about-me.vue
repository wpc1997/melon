<template>
	<view class="about-me">
		
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">编辑资料</block>
		</cu-custom>
		
		<!-- 头像 -->
		<view class="about-me-list avatar">
			<view class="cu-list menu">
				<view class="cu-item arrow no-border">
					<view class="content">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg"></image>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 信息 -->
		<view class="about-me-list">
			<view class="cu-list menu">
				<view class="cu-item arrow no-border" v-for="(item,index) in list" :key="index" @tap="toEditInfo(item.name)">
					<view class="content">
						<text>{{item.name}}</text>
					</view>
					<view class="action">
						<text class="text-sm text-cut">{{item.nowName}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					{
						icon:'',
						name:'昵称',
						nowName:'种草莓的西瓜'
					},
					{
						icon:'',
						name:'签名',
						nowName:'种草莓的西瓜'
					},
					{
						icon:'',
						name:'常居地',
						nowName:'种草莓的西瓜'
					},
				]
			}
		},
		methods:{
			
			//跳转到编辑页
			toEditInfo(name){
				switch(name){
					case '昵称':
						uni.navigateTo({
							url:'/pages/mine/input-info?type='+name
						})
						break
					case '签名':
						uni.navigateTo({
							url:'/pages/mine/input-info?type='+name
						})
						break
					case '常居地':
						uni.navigateTo({
							url:'/view/city'
						})
						break
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.about-me{
		min-height: 100vh;
		background-color: #F1F1F1;
		.avatar{
			padding-top: 24upx;
		}
		&-list{
			padding: 0 24upx 24upx 24upx;
			background-color: #FFFFFF;
			.cu-list{
				.cu-item:after{
					border-bottom: none;
				}
				.cu-item{
					.action{
						text{
							color: #888888;
						}
					}
					.content{
						>image{
							width: 90upx;
							height: 90upx;
							border-radius: 50%;
						}
						>text{
							color: #222222;
						}
						>text:nth-of-type(2){
							color: #222222;
						}
					}
				}
			}
		}
	}
</style>
