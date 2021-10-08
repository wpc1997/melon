<template>
	<view class="input-comment" :class="isShow?'comment-active':''" :style="isShow?'bottom:'+keyBoardHeight+'px':''">
		<view class="input-comment-head">
			<view class="text-lg" @tap="cancel">取消</view>
			<view class="text-lg">评论</view>
			<view class="text-lg">发布</view>
		</view>
		
		<view class="input-comment-area">
			<textarea v-model="value" :focus="isfocus" placeholder="来这里发表你的评论吧~" placeholder-class="placeholder text-sm"></textarea>
		</view>
		
		<view class="input-comment-operate">
			<text class="text-lg cuIcon-emoji"></text>
			<!-- <text class="text-df">@</text> -->
			<text class="text-sm">150</text>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			isShow:{
				type:Boolean,
				default:false
			},
			keyBoardHeight:{
				type:Number,
				default:0
			},
			keyBoardduration:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				isfocus:false,
				value:'',	//输入的评论内容
			}
		},
		watch:{
			isShow(){
				console.log('isShow:',this.isShow)
				if(this.isShow){
					this.isfocus=true
				}else{
					this.isfocus=false
				}
				console.log('isShow:',this.isfocus)
			}
		},
		methods:{
			
			//关闭评论弹窗
			cancel(){
				this.$emit('cancel',this.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.comment-active{
		transform: translateY(0)!important;
		opacity: 1!important;
	}
	
	.placeholder{
		color: #888888;
	}
	
	.input-comment{
		 box-shadow: 10px 10px 5px #888888;
		 position: fixed;
		 width: 100%;
		 bottom: 0;
		 background-color: #FFFFFF;
		 transform: translateY(150%);
		 opacity: 0.5;
		 z-index: 99999;
		 transition: 400ms ease;
		border-top-right-radius: 12upx;
		border-top-left-radius: 12upx;
		&-head{
			display: flex;
			align-items: center;
			border-bottom: 1px solid #f6f7f9;
			padding: 24upx;
			>view:nth-of-type(1){
				font-weight: 500;
				width: 80upx;
				text-align: left;
				color: #888888;
			}
			>view:nth-of-type(2){
				font-weight: 500;
				flex: 1;
				text-align: center;
				color: #222222;
			}
			>view:nth-of-type(3){
				font-weight: 500;
				width: 80upx;
				text-align: right;
				color: #F75801;
			}
		}
	
		&-area{
			textarea{
				padding: 24upx;
				width: 100%;
				// width: 1;
			}
		}
		
		&-operate{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 48upx 24upx;
			>text{
				color: #888888;
			}
			>text:nth-of-type(2){
				border-top: 1px solid #f6f7f9;
				margin-left: auto;
				color: #888888;
			}
		}
	
	}
</style>
