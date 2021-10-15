<template>
	<!-- 课堂页面 -->
	<view class="classroom">
		<cu-custom-search :isBack="true" bgColor="bg-gradual-white"></cu-custom-search>
		
		<view class="classroom-cards">
			<classroom-card></classroom-card>
			<classroom-card></classroom-card>
			<classroom-card></classroom-card>
		</view>
	</view>
</template>

<script>
	
	import classroomCard from './components/classroom-card.vue'
	
	export default{
		components:{
			classroomCard
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.classroom{
		
	}
</style>
