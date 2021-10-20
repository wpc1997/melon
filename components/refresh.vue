<template>
	<view class="refresh">

		<!-- 自定义封装的局部下拉刷新组件 -->

		<scroll-view class="refresh-scroll" :style="{height:isFull?'100vh':(scrollHeight+'px')}" scroll-y="false" refresher-enabled="true"
			refresher-default-style="none" :refresher-triggered="triggered" :refresher-threshold="isFull?CustomBar:48"
			@refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			@refresherabort="onAbort" @scroll="onScroll" @scrolltolower="scrolltolower">

			<slot></slot>

			<view v-show="triggered" class="loading-more">{{notice}}</view>

		</scroll-view>
	</view>
</template>
 
<script>
	export default {
		name: "refresh",
		props: {
			scrollHeight: {
				type: [Number,String],
				default: 0
			},
			isFull:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				triggered: false,
				notice: '下拉即可刷新...'
			};
		},
		methods: {

			onScroll(e) {
				console.log("onScroll", e.detail);
				this.$emit('onScroll',e)
			},

			//自定义下拉刷新控件被下拉时触发
			onPulling(e) {
				this.triggered = true
				if (e.detail.dy >= 48) {
					this.notice = '释放即可刷新...'
				}else{
					this.notice = '下拉即可刷新...'
				}
				console.log("onpulling", e.detail.dy);
			},

			//自定义下拉刷新被触发
			onRefresh() {
				this.notice = '努力刷新中...'
				this.triggered = true;
				setTimeout(() => {

					this.triggered = false;
					this.notice = '下拉即可刷新...'

				}, 1500)
			},

			//自定义下拉刷新被复位
			onRestore() {
				this.triggered = false; // 需要重置
				this.notice = '下拉即可刷新...'
				console.log("onRestore");
			},

			//自定义下拉刷新被中止
			onAbort() {
				this.triggered = false;
				this.notice = '下拉即可刷新...'
				console.log("onAbort");
			},
			
			//滚动条触底时触发
			scrolltolower(e){
				console.log("触底：",e);
				this.$emit('scrolltolower')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.refresh {

		width: 100%;
		overflow: hidden;
		&-scroll {
			position: relative;

			.loading-more {
				position: absolute;
				height: 60px;
				top: -60px;
				left: 0;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #888888;
				font-size: 24upx;
				// background-color: #007AFF;
				// background-color: rgba(0,0,0,0);
			}

		}

	}
</style>
