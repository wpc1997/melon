<template>
	<view>
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{info.sendUser.nickname}}</block>
		</cu-custom>
	
		<view class="cu-chat">
			<view class="cu-item self">
				<view class="main">
					<view class="content bg-green shadow">
						<text>喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！</text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">2018年3月23日 13:23</view>
			</view>
			
			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						<text>喵喵喵！喵喵喵！</text>
					</view>
				</view>
				<view class="date "> 13:23</view>
			</view>
			
			
			<view class="cu-item self">
				<view class="main">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date"> 13:23</view>
			</view>
			
			
			
		</view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10" @focus="InputFocus"
			 @blur="InputBlur"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow">发送</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				info:{}
			};
		},
		onLoad(option) {
			this.info = JSON.parse(decodeURIComponent(option.item));
			
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		padding-bottom: 100upx;
	}
	.text-content{
		height: 2.4em!important;
	}
	.text-content-des{
		font-size: 28rpx;
		color: #888888;
		height: 2.7em;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.article{
		box-shadow: 0 0 20upx 0 #CDCDCD;
		max-width: 700upx;
		width: 90%;
		border-radius: 8upx;
		margin-left: 5%;
		margin-top: 15upx;
	}
</style>
