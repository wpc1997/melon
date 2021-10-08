<template>
	<view class="search">
		<view class="search-history">
			<view class="search-history-head">
				<text class="text-lg">历史搜索</text>
				<text class="cuIcon-delete text-df"></text>
			</view>
			
			<view class="search-history-list">
				<text class="text-sm">电脑</text>
			</view>
		</view>
		
		<view class="search-recommend">
			<view class="search-recommend-head text-lg">
				热搜
			</view>
			<view class="search-recommend-list">
				<view>
					<view v-for="(item,index) in recommends" :key="index">
						<text :class="'font-color-'+(index+1)">{{'0'+(index+1)}}</text>
						<text class="text-df">{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				recommends:[
					{
						name:'表白季'
					},
					{
						name:'防晒'
					},
					{
						name:'儿童节'
					},
					{
						name:'闲置'
					},
					{
						name:'种草'
					},
					{
						name:'签到红包'
					},
					{
						name:'参天大瓜'
					},
					{
						name:'连衣裙'
					},
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.font-color-1{
		color: #E2585A!important;
	}
	.font-color-2{
		color: #C0863D!important;
	}
	.font-color-3{
		color: #D07E4D!important;
	}
	.search{
		&-history{
			padding: 24upx;
			border-bottom: 20upx solid #f6f7f9;
			&-head{
				display: flex;
				justify-content: flex-start;
				text:first-child{
					color: #222222;
					font-weight: 500;
				}
				text:last-child{
					margin-left: auto;
					color: #888888;
				}
			}
			
			&-list{
				padding-top: 24upx;
				padding-bottom: 12upx;
				text{
					margin-top: 16upx;
					padding: 4upx 24upx;
					border: 1px solid #F6F7F9;
					border-radius: 30upx;
					margin-left: 24upx;
				}
				text:first-child{
					margin-left: 0!important;
				}
			}
		}
		
		&-recommend{
			padding: 0 24upx;
			&-head{
				padding-top: 24upx;
				font-weight: 500;
			}
			&-list{
				padding-top: 24upx;
				>view{
					display: grid;
					grid-template-columns:repeat(2,1fr);
					grid-column-gap: 24upx;
					grid-row-gap: 24upx;
					>view{
						>text:first-child{
							font-family: Bebas-Regular, Bebas;
							margin: 24upx;
							color: #AAAAAA;
						}
					}
					
				}
			}
		}
		
	}
</style>
