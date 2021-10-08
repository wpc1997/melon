<template>
	<view class="city">
		
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">常居地</block>
		</cu-custom>
		
		<view class="city-text text-sm">自动定位城市</view>
		
		<!-- 当前定位城市 -->
		<view class="city-list">
			<view class="cu-list menu">
				<view class="cu-item arrow no-border" @tap="toChooseSchool()">
					<view class="content">
						<text>贵阳市</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="city-text text-sm">其他城市</view>
		
		<!-- 城市列表 -->
		<view class="city-list">
			<view class="cu-list menu">
				<view class="cu-item arrow no-border" v-for="(item,index) in list" :key="index" @tap="toChooseSchool(item.name)">
					<view class="content">
						<text>{{item.name}}</text>
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
				list:this.$store.state.city.city
			}
		},
		mounted() {
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
			    }
			});
		},
		methods:{
			
			//跳转到选择学校界面
			toChooseSchool(city){
				uni.navigateTo({
					url:'/view/university?city='+city
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.city{
		background-color: #F1F1F1;
		min-height: 100vh;
		padding-bottom: 30upx;
		&-text{
			color: #888888;
			height: 64upx;
			display: flex;
			align-items: center;
			padding: 24upx;
		}
		&-list{
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
