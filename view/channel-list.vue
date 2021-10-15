<template>
	<view class="channel-list">
		<cu-custom bgColor="bg-gradual-white" :isBack="true"><block slot="content">发现小组</block></cu-custom>

		<!-- tab栏切换 -->
		<view class="channel-list-tab" :style="{top:(CustomBar?CustomBar+'px':'84px')}">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item text-df text-custom-weight"
					:class="index==TabCur?'text-deep-black cur':'text-custom-gray'" v-for="(item,index) in tabs"
					:key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
		</view>
		
		<!-- 小组列表 -->
		<view class="channel-list-groups">
			<group></group>
			<group></group>
			<group></group>
			<group></group>
			<group></group>
			<group></group>
		</view>

	</view>
</template>

<script>
	import group from "@/components/group.vue";
	export default {
		components:{
			group,
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				tabs: [{
						name: '热门'
					},
					{
						name: '吃瓜'
					},
					{
						name: '八卦'
					},
					{
						name: '生活娱乐'
					}
				],
				TabCur: 0,
				scrollLeft: 0
			}
		},
		methods: {

			//tab栏切换函数
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss" scoped>
	.channel-list{
		min-height: 100vh;
		background-color: #F1F1F1;
		padding-bottom: 24upx;
		&-tab{
			position: sticky;
			z-index: 999;
		}
	}
</style>
