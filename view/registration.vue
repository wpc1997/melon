<template>

	<!-- 签到页面 -->
	<view class="sign" :class="{'anim':isAnim}">

		<!-- 点击签到页面 -->
		<view class="registration">

			<view class="registration-head">
				<cu-custom :isBack="true" bgColor="bg-gradual-opacity">
					<block slot="content">签到</block>
				</cu-custom>

				<view class="registration-head-1">

					<view class="registration-head-1-weeks">
						<view v-for="(item,index) in weeks" :key="index" :style="{color:item.color}" class="text-bold">
							{{item.title}}
						</view>
					</view>

					<view class="registration-head-1-days">
						<view v-for="(item,index) in dates" :key="index" :style="[{color:item.color}]">
							<view>
								<text class="text-df">{{item.isToday?'今天':item.time}}</text>
							</view>
							<view>
								<text class="cuIcon-roundcheckfill" :style="[{color:item.color}]"
									v-if="item.isSign===1"></text>
								<!-- <text class="cuIcon-roundclosefill" :style="[{color:item.color}]" v-if="item.isSign===2"></text> -->
								<text class="cuIcon-timefill" :style="[{color:item.color}]"
									v-if="item.isSign===3"></text>
								<text class="text-xs" v-if="item.isSign===2"
									:style="[{color:item.color}]">{{item.isToday?'签到':'补签'}}</text>
							</view>
						</view>
					</view>

				</view>

				<view class="registration-head-bg"></view>
			</view>

			<view class="registration-panel">

				<!-- //签到的按钮 -->
				<view class="registration-panel-btn text-xxl">签到</view>

				<view class="registration-panel-text">今天还未签到</view>

				<view class="registration-panel-record" @tap="toRecords()">
					<text class="text-sm" @tap="toRecords()">查看近期签到记录</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>

		</view>

		<!-- 查看签到记录页面 -->
		<view class="records">

			<cu-custom :isBack="true" bgColor="bg-gradual-opacity" :isTap="true" @clickTap="clickTap">
				<block slot="content"></block>
			</cu-custom>

			<view class="records-calendar">
				<view class="records-calendar-head">
					<view class="records-calendar-head-back">
						<text class="cuIcon-back"></text>
					</view>
					<view class="records-calendar-head-title">
						<text class="text-df text-bold">签到记录</text>
					</view>
					<view class="records-calendar-head-right">
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<calendar :bg="'rgba(0,0,0,0)'" :poppable="false" :showClose="false" :showButton="false"
					:showTitle="false"></calendar>
			</view>

		</view>


	</view>

</template>

<script>
	import calendar from '@/components/calendar.vue'

	export default {
		components: {
			calendar
		},
		data() {
			return {
				weeks: [{
						title: '日',
						color: '#FF6600',
					},
					{
						title: '一',
						color: '#333333',
					},
					{
						title: '二',
						color: '#333333',
					},
					{
						title: '三',
						color: '#333333',
					},
					{
						title: '四',
						color: '#333333',
					},
					{
						title: '五',
						color: '#333333',
					},
					{
						title: '六',
						color: '#FF6600',
					},

				],
				dates: [],
				isAnim: false,
			};
		},
		onLoad() {
			this.init()
		},
		methods: {

			//初始化本周时间
			init() {
				let date = new Date()
				let arr = this.getDates(date)

				arr.forEach((item, index) => {
					let it = {}
					//此处几个if语句是为了让数据更加真实同时也能看到已签到、未签到、还未到签到时间的状态，item.isSign的参数：1：已签到，2：未签到，3：还未到签到时间
					if (index < date.getDay()) {
						it.time = parseInt(item.slice(-2))
						it.isSign = 1
						it.color = '#F8D347'
						it.isToday = false
					}
					if (index === date.getDay()) {
						it.time = parseInt(item.slice(-2))
						it.isSign = 2
						it.color = '#f95703'
						it.isToday = true
					}
					if (index > date.getDay()) {
						it.time = parseInt(item.slice(-2))
						it.isSign = 3
						it.color = '#888888'
						it.isToday = false
					}
					this.dates.push(it)
				})

				console.log(this.dates)
				// for(weekIndex;weekIndex<0;weekIndex --){
				// 	if(day-1 < 1)
				// }


			},




			//JS获取当前周从星期一到星期天的日期(周日为第一天，如需要周一为第一天时把公式中的 % 6改为 % 7)
			getDates(currentDate) {

				let timesStamp = currentDate.getTime();
				let currenDay = currentDate.getDay();
				let dates = [];
				for (let i = 0; i < 7; i++) { //0		//2+6=8
					dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 6)).toLocaleDateString()
						.replace(/\//g, '-'));
				}
				return dates
			},

			//查看近期签到记录
			toRecords() {
				this.isAnim = true
			},

			//返回翻转之前的页面
			clickTap() {

				console.log('返回')
				if (!this.isAnim) {
					uni.navigateBack({
						delta: 1
					})
					return
				}
				this.isAnim = false
			},

		}

	}
</script>

<style lang="scss" scoped>
	.anim {
		transform: rotateY(180deg);
	}

	.sign {
		height: 100vh;
		width: 100%;
		position: relative;
		transition: all 700ms linear;
		transform-style: preserve-3d;
	}

	.registration {
		background: #FFFFFF;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		flex-flow: column;
		backface-visibility: hidden;

		&-head {
			position: relative;

			&-1 {
				position: relative;
				z-index: 1;

				&-weeks {

					display: flex;
					padding: 24upx 0;

					>view {

						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				&-days {

					display: flex;

					>view {

						flex: 1;
						display: flex;
						flex-flow: column;
						align-items: center;
						justify-content: center;

						>view {
							display: flex;
							align-items: center;
							justify-content: center;
							margin: 6upx;
						}
					}
				}

			}

			&-bg {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				z-index: 0;
				background-image: linear-gradient(0deg, #ffffff,#F8D347);
			}

		}

		&-panel {
			flex: 1;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;

			&-btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 300upx;
				height: 300upx;
				border-radius: 50%;
				font-weight: 450;
				background-image: linear-gradient(180deg, #F8D347, #FFF6F2);
				color: #FF6600;
			}

			&-text {
				position: absolute;
				bottom: 30%;
				left: 50%;
				transform: translateX(-50%);
				color: #F8D347;
			}

			&-record {
				position: absolute;
				bottom: 50upx;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				align-items: center;
				height: 60upx;
				padding: 0 24upx;
				border-radius: 1000px;
				background-color: rgba(0, 0, 0, 0.1);
			}



		}


	}

	.records {

		// 因为使用transform时会创建更高层级的stacking context（堆叠上下文），会导致z-index属性失效。之后就想通过translateZ来把后面盒子放到顶上来，backface-visibility:hidden属性，这个属性就是将旋转图片的背面隐藏，既然浏览器都不知道显示哪一个，我就显示一个把后面的隐藏起来，很好的解决了这个问题，（但要记得给front盒子和back盒子都要加！！）
		transform: rotateY(-180deg) translateZ(1px);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		backface-visibility: hidden;
		display: flex;
		flex-flow: column;
		background-image: linear-gradient(0deg, #ffffff, #F8D347);

		&-calendar {
			background-color: #FFFFFF;
			overflow: hidden;
			margin: auto 24upx;
			border-radius: 24upx;

			&-head {
				padding: 12upx 0;
				width: 100%;
				display: flex;

				&-back {
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 12upx;
				}
				&-title{
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				&-right {
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 12upx;
				}

			}

		}
	}
</style>
