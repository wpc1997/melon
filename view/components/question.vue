<template>
	<!-- 问答 问题的组件 -->
	<view class="question">
		<view class="question-head">
			<text class="cuIcon-questionfill text-lg"></text>
			<text class="text-df">提问</text>
		</view>
		
		<view class="question-title">
			<text class="text-xl">{{item.title}}</text>
		</view>
		
		<view class="question-answer">
			<text class="text-sm">{{item.answer}}</text>
		</view>
		
		<view class="question-footer">
			<view class="question-footer-labels">
				<view class="text-xs">边境牧羊犬</view>
				<view class="text-xs">四个月</view>
			</view>
			<view class="question-footer-operate">
				<view>
					<text class="cuIcon-mark"></text>
					<text class="text-sm">52</text>
				</view>
				<view>
					<text class="cuIcon-hot"></text>
					<text class="text-sm">3032</text>
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default{
		props:{
			item:{
				type:Object,
				default: ()=>{
					return {}
				}
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.question{
		padding: 24upx;
		border-bottom: 1upx solid #F1F1F1;
		&-head{
			width: 100%;
			>text{
				color: #489BFC;
			}
			>text:first-child{
				margin-right: 6upx;
			}
		}
		
		&-title{
			margin-top: 12upx;
			>text{
				font-weight: 500;
			}
		}
		
		&-answer{
			margin-top: 12upx;
			
			>text{
				color: #888888;
			}
			
		}
		
		&-footer{
			margin-top: 36upx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			&-labels{
				display: flex;
				>view{
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 1000px;
					height: 40upx;
					padding: 0 12upx;
					background-color: rgba(72,155,252,0.1);
					color: rgba(72,155,252,1);
					margin: 0 6upx;
				}
			}
			&-operate{
				display: flex;
				margin-left: auto;
				>view{
					>text{
						color: #888888;
						margin: 0 3upx;
					}
				}
				>view:last-child{
					margin-left: 12upx;
				}
			}
			
		}
		
		
		
	}
</style>
