<template>
	<view class="answer">

		<cu-custom-search :isBack="true"></cu-custom-search>
		<!-- 问答页面 -->

		<!-- tab栏 -->
		<view class="answer-tabs">
			<custom-tabs :tabs="tabs" :isAvg="true" :tabIndex="tabIndex" @clickTab="clickTab"></custom-tabs>
		</view>

		<!-- 问答内容 -->
		<view class="answer-list" id="scrollView">
			<swiper class="swiper" :style="{height:scrollHeight+'px'}" :indicator-dots="false" :current="current" :autoplay="false" @change="change">
				<swiper-item v-for="(item,index) in tabs" :key="index">
					<refresh :scrollHeight="scrollHeight">

						<view :style="{'background-color':index?'#3296FA':'#FFD764'}">{{item.title}}</view>
						<view  v-for="(it,idx) in 50" :key="idx">{{idx}}</view>
					</refresh>
				</swiper-item>
			</swiper>


		</view>

	</view>
</template>

<script>
	import customTabs from "@/components/custom-tabs.vue";
	import refresh from "@/components/refresh.vue";

	export default {
		components: {
			customTabs,
			refresh
		},
		data() {
			return {
				
				tabs: [{
						title: '热门',
						data:[],	//把每个tab栏对应的数据挂到对应的tab栏上，然后进行swiper切换，避免每次切换tab栏都存在重新获取数据
					},
					{
						title: '最新',
						data:[]
					},
				],
				scrollHeight: 0,
				current:0,	//当前所在滑块的 index
				tabIndex:0,		//tab栏所选中的索引
			};
		},
		onReady() {
			let _this = this
			let query = uni.createSelectorQuery().in(this);
			query.select('#scrollView').boundingClientRect(data => {

				console.log(data)
				_this.scrollHeight = data.height

			}).exec();
		},
		methods:{
			
			
			
			//接收到tab栏传过来的数据和索引，来渲染和控制swiper的双向滑动，如果swiper里面已经有内容，则不渲染数据
			clickTab(item,index){
				this.current = index
			},
			
			//swiper滑动事件
			change(e){
				
				console.log(e)
				this.tabIndex = e.detail.current
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.answer {
		min-height: 100vh;
		display: flex;
		flex-flow: column;


		&-list {
			flex: 1;
		}

	}
</style>
