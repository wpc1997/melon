<template>
	<view class="area-grid">
		<view class="cu-list grid" :class="['col-' + gridCol,'no-border']">
			<view class="cu-item" v-for="(item,index) in list" :key="index" v-if="index<gridCol*2">
				<view :class="['cuIcon-' + (item.imgUrl?'':item.cuIcon),'text-' + item.color]" :style="{'border-radius':item.radius||'0%'}">
					<view class="cuIcon-img" :style="[{backgroundImage:'url('+item.imgUrl+')'},{'border-radius':item.radius||'0%'}]" v-if="item.imgUrl"></view>
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default:()=>{
					return []
				}
			},
			gridCol:{
				type:Number,
				default:4,
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cuIcon-img{
		width: 80upx!important;
		max-width: 80upx!important;
		margin: 0 auto;
		height: 80upx;
		margin-top: 0!important;
		background-position: center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
</style>
