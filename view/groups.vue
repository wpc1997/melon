<template>
	<view class="groups">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view>
			<group></group>
		</view>
	</view>
</template>

<script>
	
		import group from "@/components/group.vue";
	export default{
		components:{
			group
		},
		data(){
			return{
				title:''
			}
		},
		onLoad(option) {
			this.title = option.type==1?'我创建的小组':'我加入的小组'
		}
	}
</script>

<style lang="scss" scoped>
	.groups{
		min-height: 100vh;
		background-color: #F1F1F1;
	}
</style>
