<template>
	<view class="unused-detail" :style="{paddingBottom:CustomBar+'px'}">
		
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">详情</block>
		</cu-custom>
		
		<!-- 标题 -->
		<view class="unused-detail-title">
			<text class="text-xl text-custom-weight text-deep-black">Good morning</text>
		</view>
		
		<!-- 发布人 -->
		<view class="unused-detail-user">
			<view>
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg"></image>
			</view>
			<view>
				<view class="text-sm">种草莓的西瓜</view>
				<view class="text-xs">6月6号 22:26</view>
			</view>
			<view>关注</view>
		</view>
		
		<!-- 发布内容 -->
		<view class="unused-detail-text" v-html="'内容内容内容内容内容内容'"></view>
		
		<!-- 发布图片 -->
		<view class="unused-detail-images">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg"></image>
		</view>
		
		<!-- 标签 -->
		<view class="unused-detail-tags">
			<view class="text-sm">#衣服</view><view class="text-sm">#衣服</view><view class="text-sm">#衣服</view>
		</view>
		
		<!-- 评论 -->
		<view class="unused-detail-comment">
			<view class="unused-detail-comment-title text-lg">评论<text class="text-lg">（38）</text></view>
			
			<view>
				<comment></comment>
			</view>
			
		</view>
		
		<!-- 底部评论输入框 -->
		<view class="unused-detail-input">
			<footerComment @popupComment='popupComment' :commend='commend'></footerComment>
		</view>
		
		
		<!-- 弹出输入框进行输入内容 -->
		<view class="unused-detail-popup">
			<inputComment :isShow='isShow' :keyBoardHeight='keyBoardHeight' @cancel='cancel'></inputComment>
		</view>
		
		<!-- 遮罩层 -->
		<view class="overlay" :class="isShow?'':'overlay-pointer'" :style="{'background-color':isShow?'rgba(0,0,0,0.4)':'rgba(0,0,0,0)'}"></view>
		
	</view>
</template>

<script>
	
	import comment from "@/components/comment.vue";
	import footerComment from "@/components/footer-comment.vue";
	import inputComment from "@/components/input-comment.vue";
	
	export default{
		components:{
			comment,
			footerComment,
			inputComment
		},
		data(){
			return{
				isShow:false,
				commend:'说点什么呗~',	//输入的内容
				keyBoardHeight:0,	//键盘变化高度
				CustomBar: this.CustomBar
			}
		},
		mounted() {
			console.log('键盘：')
			uni.onKeyboardHeightChange(res => {
			  console.log('键盘：',res)
			  this.keyBoardHeight=res.height
			})
		},
		methods:{
			
			//打开弹窗
			popupComment(value){
				this.isShow=value
			},
			
			//关闭弹窗
			cancel(commend){
				
				this.isShow=false
				this.commend = commend
			}
		}
	}
</script>

<style lang="scss" scoped>
	.unused-detail{
		// padding: 24upx;
		&-title{
			padding: 24upx 24upx 48upx 24upx;
		}
		&-user{
			padding: 24upx 24upx 0 24upx;
			display: flex;
			justify-content: flex-start;
			>view:nth-of-type(1){
				image{
					width: 60upx;
					height: 60upx;
					border-radius: 50%;
				}
			}
			>view:nth-of-type(2){
				margin-left: 12upx;
				>view:nth-of-type(1){
					font-weight: 500;
					color: #222222;
				}
				>view:nth-of-type(2){
					color: #888888;
				}
			}
			>view:nth-of-type(3){
				border: 1px solid #FC5609;
				border-radius: 6upx;
				padding: 0 20upx;
				height: 45upx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FC5609;
				margin-left: auto;
			}
		}
	
		&-text{
			padding: 48upx 24upx 24upx 24upx;
			// padding: 48upx 0 24upx 0;
		}
		
		&-images{
			padding: 24upx 24upx 0 24upx;
			image{
				max-width: 100%;
				min-width: 100%;
				border-radius: 8upx;
			}
		}
		
		&-tags{
			padding: 24upx;
			display: flex;
			// padding: 24upx 0;
			view:nth-of-type(1){
				margin-left: 0!important;
			}
			view{
				color: #307CFF;
				background-color: #E0EBFE;
				border-radius: 100px;
				padding: 4upx 18upx;
				border: none;
				display: inline-flex;
				margin-left: 18upx;
			}
		}
	
		&-comment{
			padding: 24upx 24upx 0 24upx;
			&-title{
				margin-bottom: 24upx;
				color: #222222;
				font-weight: 500;
				>text{
					color: #888888;
					font-weight: 500;
				}
			}
		}
		
		&-popup{}
	
		.overlay{
			position: fixed;
			width: 100vw;
			height: 100vh;
			// background-color: rgba(0,0,0,0.4);
			top: 0;
			transition: 300ms;
			left: 0;
			z-index: 10000;
		}
		
		//鼠标点击穿透样式
		.overlay-pointer{
			pointer-events: none;
		}
	
	}
</style>
