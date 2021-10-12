<template>
	<view class="answer">

		<cu-custom-search :isBack="true" bgColor="bg-gradual-white"></cu-custom-search>
		<!-- 问答页面 -->

		<!-- tab栏 -->
		<view class="answer-tabs bg-gradual-white" :style="{top:(CustomBar?CustomBar+'px':'84px')}" id="tabs">
			<custom-tabs :tabs="tabs" :isAvg="true" :tabIndex="tabIndex" @clickTab="clickTab"></custom-tabs>
		</view>

		<!-- 问答内容 -->
		<view class="answer-list" id="scrollView" :style="[{'margin-top':marginTop+'px'}]">
			<swiper class="swiper" :style="{height:scrollHeight+'px'}" duration="350" :indicator-dots="false" :current="current" :autoplay="false" @change="change">
				<swiper-item v-for="(item,index) in tabs" :key="index">
					<refresh :scrollHeight="scrollHeight">
						<view>
							<question v-for="(it,idx) in item.list" :key="item.id" :item="it"></question>
						</view>
					</refresh>
				</swiper-item>
			</swiper>


		</view>

	</view>
</template>

<script>
	import customTabs from "@/components/custom-tabs.vue";
	import refresh from "@/components/refresh.vue";
	import question from "@/view/components/question.vue";

	export default {
		components: {
			customTabs,
			refresh,
			question
		},
		data() {
			return {
				
				CustomBar: this.CustomBar,
				tabs: [{
						title: '热门',
						list:[
							{
								id:'a',
								title:'边境牧羊犬拉肚子的坏毛病',
								answer:'这种情况一般考虑多喂一些益生菌保证肠胃健康',
							},
							{
								id:'a',
								title:'边境牧羊犬拉肚子的坏毛病',
								answer:'这种情况一般考虑多喂一些益生菌保证肠胃健康',
							},
							{
								id:'a',
								title:'边境牧羊犬拉肚子的坏毛病',
								answer:'这种情况一般考虑多喂一些益生菌保证肠胃健康',
							},
							{
								id:'a',
								title:'边境牧羊犬拉肚子的坏毛病',
								answer:'这种情况一般考虑多喂一些益生菌保证肠胃健康',
							},
							{
								id:'a',
								title:'边境牧羊犬拉肚子的坏毛病',
								answer:'这种情况一般考虑多喂一些益生菌保证肠胃健康',
							},
							{
								id:'a',
								title:'边境牧羊犬拉肚子的坏毛病',
								answer:'这种情况一般考虑多喂一些益生菌保证肠胃健康',
							},
							{
								id:'a',
								title:'边境牧羊犬拉肚子的坏毛病',
								answer:'这种情况一般考虑多喂一些益生菌保证肠胃健康',
							},
							{
								id:'a',
								title:'边境牧羊犬拉肚子的坏毛病',
								answer:'这种情况一般考虑多喂一些益生菌保证肠胃健康',
							},
						],	//把每个tab栏对应的数据挂到对应的tab栏上，然后进行swiper切换，避免每次切换tab栏都存在重新获取数据
					},
					{
						title: '最新',
						list:[
							{
								id:'b',
								title:'阿拉斯加真的可以长到180斤吗',
								answer:'你好，阿拉斯加是可以长到100斤的，至于180斤就是谣言',
							}
						]
					},
				],
				scrollHeight: 0,
				current:0,	//当前所在滑块的 index
				tabIndex:0,		//tab栏所选中的索引
				marginTop:0,
			};
		},
		onReady() {
			let _this = this
			let query = uni.createSelectorQuery().in(this);
			
			query.select('#tabs').boundingClientRect(data => {
			
				console.log(data)
				_this.marginTop = data.height
			
			}).exec();
			query.select('#scrollView').boundingClientRect(data => {

				console.log(data)
				_this.scrollHeight = data.height - _this.marginTop

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

		&-tabs {
		
			position: fixed;
			z-index: 9;
			width: 100%;
			padding: 0upx 0upx 12upx 0;
		}

		&-list {
			flex: 1;
		}

	}
</style>
