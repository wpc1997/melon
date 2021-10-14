<template>
	
	<view>
		<!-- <view :class="[{['calendar']:true},{[positionClass]:poppable},{['calendar-show']:poppable},{['calendar-poppable']:!poppable},{['calendar-fullScreen']:fullScreen}]"> -->
		<view :style="{'background-color':bg?bg:'#FFFFFF'}" :class="[{['calendar']:true},{[positionClass]:poppable},{['calendar-show']:poppable},{[positionAnimal]:show&&poppable},{['calendar-poppable']:!poppable},{['calendar-fullScreen']:fullScreen}]">

		<view :class="'calendar-head'" :style="{'background-color':bg?bg:'#FFFFFF'}" v-if="showTitle">
			<view></view>
			<view :class="'calendar-head-title'">{{title}}</view>
			<view>
				<icon type="cancel" class="calendar-icon" @tap="cancel()" v-if="closeImg === 'undefined' && showClose">
				</icon>

				<image class="calendar-img" :src="closeImg" v-if="closeImg !== 'undefined' && showClose" @tap="cancel()"></image>
			</view>
		</view>

		<view :class="'calendar-weekends'" :style="[{'background-color':bg?bg:'#FFFFFF'},{'box-shadow':bg?'unset':'0 2px 10px #f1f1f1'}]">

			<view :class="'calendar-weekends-week'" v-for="(item,index) in weekends" :key="index"
				:style="{color:item.color}">{{item.week}}
			</view>

		</view>

		<view :style="{'background-color':bg?bg:'#FFFFFF'}" :class="[{['calendar-content']:true},{['middle-fullScreen']:(fullScreen||position==='left'||position==='right')}]">

			<view :class="'calendar-days'" v-for="(item,index) in days" :key="index">

				<view :class="'calendar-days-head'">{{item.title}}</view>

				<view :class="'calendar-days-body'">

					<ul :class="'calendar-days-body-ul'">

						<li v-for="(v,k) in item.list" :key="v.uuid" @tap="choose(item,v)"
							:style="[{backgroundColor:v.backgroundColor_li}]">

							<view :class="'calendar-start'" :style="{backgroundColor:v.backgroundColor_assist}"
								v-if="v.isRangeLeft&&isEnd"></view>

							<view :class="'calendar-end'" :style="{backgroundColor:v.backgroundColor_assist}"
								v-if="v.isRangeRight&&v.backgroundColor_assist"></view>

							<view :class="[('calendar-li-day')]" :style="{backgroundColor:v.backgroundColor}">

								<a :class="'calendar-festival'"
									:style="{color:v.topTitle&&!v.color?'#323233':v.color}">{{v.topTitle||''}}</a>
								<view :class="'calendar-yang'"
									:style="{color:v.isEffective?v.color:'rgba(51, 51, 51, 0.24)'}">
									{{v.text||v.day}}
								</view>

								<view :class="'calendar-nong'"
									:style="{color:v.bottomTitle&&!v.color?'#323233':v.color}">
									{{v.bottomTitle||v.nong}}
<!-- 									{{v.color?(v.bottomTitle?v.bottomTitle:v.nong):v.nong}} -->
								</view>

							</view>

						</li>

					</ul>

				</view>

			</view>

		</view>

		<view :style="{'background-color':bg?bg:'#FFFFFF'}" :class="'calendar-footer'" v-if="showButton">
			<button @tap="confirm()" :style="{backgroundColor:btnColor||color}">{{btnTitle}}</button>
		</view>


		</view>
		
		
		
		<!-- 遮罩层 -->
		<view :class="[{['calendar-overlay']:true},{'calendar-overlay-animal':showPopAnimal}]" v-if="showPop&&isMask&&poppable" @tap="cancelMask()"></view>
	</view>
	
</template>

<script>
	/**
	 * auth: wpc
	 * email: 1509827684@qq.com
	 * @Array Of Property
	 * @return Hex
	 */
	const calendarNumber = {

		/**
		 * 农历1900-2100的润大小信息表
		 * @Array Of Property
		 * @return Hex
		 */
		lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0,
			0x055d2, //1900-1909
			0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
			0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
			0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
			0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
			0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
			0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
			0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
			0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
			0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
			0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
			0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
			0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
			0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
			0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
			/**Add By JJonline@JJonline.Cn**/
			0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
			0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
			0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
			0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
			0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
			0x0d520
		], //2100

		/**
		 * 公历每个月份的天数普通表
		 * @Array Of Property
		 * @return Number
		 */
		solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

		/**
		 * 天干地支之天干速查表
		 * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
		 * @return Cn string
		 */
		Gan: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],

		/**
		 * 天干地支之地支速查表
		 * @Array Of Property
		 * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
		 * @return Cn string
		 */
		Zhi: ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149",
			"\u620c", "\u4ea5"
		],

		/**
		 * 天干地支之地支速查表<=>生肖
		 * @Array Of Property
		 * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
		 * @return Cn string
		 */
		Animals: ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21",
			"\u72d7", "\u732a"
		],

		/**
		 * 阳历节日
		 */
		festival: {
			'1-1': {
				title: '元旦节'
			},
			'2-14': {
				title: '情人节'
			},
			'5-1': {
				title: '劳动节'
			},
			'5-4': {
				title: '青年节'
			},
			'6-1': {
				title: '儿童节'
			},
			'9-10': {
				title: '教师节'
			},
			'10-1': {
				title: '国庆节'
			},
			'12-25': {
				title: '圣诞节'
			},

			'3-8': {
				title: '妇女节'
			},
			'3-12': {
				title: '植树节'
			},
			'4-1': {
				title: '愚人节'
			},
			'5-12': {
				title: '护士节'
			},
			'7-1': {
				title: '建党节'
			},
			'8-1': {
				title: '建军节'
			},
			'12-24': {
				title: '平安夜'
			},
		},

		/**
		 * 农历节日
		 */
		lfestival: {
			'12-30': {
				title: '除夕'
			},
			'1-1': {
				title: '春节'
			},
			'1-15': {
				title: '元宵节'
			},
			'5-5': {
				title: '端午节'
			},
			'8-15': {
				title: '中秋节'
			},
			'9-9': {
				title: '重阳节'
			},
		},

		/**
		 * 返回默认定义的阳历节日
		 */
		getFestival() {
			return this.festival
		},

		/**
		 * 返回默认定义的内容里节日
		 */
		getLunarFestival() {
			return this.lfestival
		},

		/**
		 *
		 * @param {Object} 按照festival的格式输入数据，设置阳历节日
		 */
		setFestival(param = {}) {
			this.festival = param
		},

		/**
		 *
		 * @param {Object} 按照lfestival的格式输入数据，设置农历节日
		 */
		setLunarFestival(param = {}) {
			this.lfestival = param
		},

		/**
		 * 24节气速查表
		 * @Array Of Property
		 * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
		 * @return Cn string
		 */
		solarTerm: ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206",
			"\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3",
			"\u5c0f\u6691", "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206",
			"\u5bd2\u9732", "\u971c\u964d", "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"
		],

		/**
		 * 1900-2100各年的24节气日期速查表
		 * @Array Of Property
		 * @return 0x string For splice
		 */
		sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
			'97bcf97c3598082c95f8c965cc920f',
			'97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
			'97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
			'97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
			'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
			'97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
			'97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
			'9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
			'97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
			'97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
			'97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
			'9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
			'97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
			'97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
			'97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
			'9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
			'97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
			'97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
			'9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
			'7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
			'97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
			'97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
			'9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
			'7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
			'97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
			'97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
			'9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
			'7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
			'97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
			'9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
			'7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
			'7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
			'97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
			'9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
			'7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
			'7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
			'97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
			'9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
			'7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
			'7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
			'977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
			'7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
			'7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
			'7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
			'977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
			'7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
			'7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
			'7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
			'977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
			'7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
			'7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
			'7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
			'7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
			'7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
			'7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
			'7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
			'7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
			'7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
			'7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
			'7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
			'7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
			'7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
			'7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
			'665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
			'7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
			'7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
			'7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'
		],

		/**
		 * 数字转中文速查表
		 * @Array Of Property
		 * @trans ['日','一','二','三','四','五','六','七','八','九','十']
		 * @return Cn string
		 */
		nStr1: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d",
			"\u5341"
		],

		/**
		 * 日期转农历称呼速查表
		 * @Array Of Property
		 * @trans ['初','十','廿','卅']
		 * @return Cn string
		 */
		nStr2: ["\u521d", "\u5341", "\u5eff", "\u5345"],

		/**
		 * 月份转农历称呼速查表
		 * @Array Of Property
		 * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
		 * @return Cn string
		 */
		nStr3: ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341",
			"\u51ac", "\u814a"
		],

		/**
		 * 返回农历y年一整年的总天数
		 * @param lunar Year
		 * @return Number
		 * @eg:var count = calendar.lYearDays(1987) ;//count=387
		 */
		lYearDays: function(y) {
			var i, sum = 348;
			for (i = 0x8000; i > 0x8; i >>= 1) {
				sum += (this.lunarInfo[y - 1900] & i) ? 1 : 0;
			}
			return (sum + this.leapDays(y));
		},

		/**
		 * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
		 * @param lunar Year
		 * @return Number (0-12)
		 * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
		 */
		leapMonth: function(y) { //闰字编码 \u95f0
			return (this.lunarInfo[y - 1900] & 0xf);
		},

		/**
		 * 返回农历y年闰月的天数 若该年没有闰月则返回0
		 * @param lunar Year
		 * @return Number (0、29、30)
		 * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
		 */
		leapDays: function(y) {
			if (this.leapMonth(y)) {
				return ((this.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
			}
			return (0);
		},

		/**
		 * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
		 * @param lunar Year
		 * @return Number (-1、29、30)
		 * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
		 */
		monthDays: function(y, m) {
			if (m > 12 || m < 1) {
				return -1
			} //月份参数从1至12，参数错误返回-1
			return ((this.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
		},

		/**
		 * 返回公历(!)y年m月的天数
		 * @param solar Year
		 * @return Number (-1、28、29、30、31)
		 * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
		 */
		solarDays: function(y, m) {
			if (m > 12 || m < 1) {
				return -1
			} //若参数错误 返回-1
			var ms = m - 1;
			if (ms == 1) { //2月份的闰平规律测算后确认返回28或29
				return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
			} else {
				return (this.solarMonth[ms]);
			}
		},

		/**
		 * 农历年份转换为干支纪年
		 * @param  lYear 农历年的年份数
		 * @return Cn string
		 */
		toGanZhiYear: function(lYear) {
			var ganKey = (lYear - 3) % 10;
			var zhiKey = (lYear - 3) % 12;
			if (ganKey == 0) ganKey = 10; //如果余数为0则为最后一个天干
			if (zhiKey == 0) zhiKey = 12; //如果余数为0则为最后一个地支
			return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];

		},

		/**
		 * 公历月、日判断所属星座
		 * @param  cMonth [description]
		 * @param  cDay [description]
		 * @return Cn string
		 */
		toAstro: function(cMonth, cDay) {
			var s =
				"\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
			var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
			return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7"; //座
		},

		/**
		 * 传入offset偏移量返回干支
		 * @param offset 相对甲子的偏移量
		 * @return Cn string
		 */
		toGanZhi: function(offset) {
			return this.Gan[offset % 10] + this.Zhi[offset % 12];
		},

		/**
		 * 传入公历(!)y年获得该年第n个节气的公历日期
		 * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
		 * @return day Number
		 * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
		 */
		getTerm: function(y, n) {
			if (y < 1900 || y > 2100) {
				return -1;
			}
			if (n < 1 || n > 24) {
				return -1;
			}
			var _table = this.sTermInfo[y - 1900];
			var _info = [
				parseInt('0x' + _table.substr(0, 5)).toString(),
				parseInt('0x' + _table.substr(5, 5)).toString(),
				parseInt('0x' + _table.substr(10, 5)).toString(),
				parseInt('0x' + _table.substr(15, 5)).toString(),
				parseInt('0x' + _table.substr(20, 5)).toString(),
				parseInt('0x' + _table.substr(25, 5)).toString()
			];
			var _calday = [
				_info[0].substr(0, 1),
				_info[0].substr(1, 2),
				_info[0].substr(3, 1),
				_info[0].substr(4, 2),

				_info[1].substr(0, 1),
				_info[1].substr(1, 2),
				_info[1].substr(3, 1),
				_info[1].substr(4, 2),

				_info[2].substr(0, 1),
				_info[2].substr(1, 2),
				_info[2].substr(3, 1),
				_info[2].substr(4, 2),

				_info[3].substr(0, 1),
				_info[3].substr(1, 2),
				_info[3].substr(3, 1),
				_info[3].substr(4, 2),

				_info[4].substr(0, 1),
				_info[4].substr(1, 2),
				_info[4].substr(3, 1),
				_info[4].substr(4, 2),

				_info[5].substr(0, 1),
				_info[5].substr(1, 2),
				_info[5].substr(3, 1),
				_info[5].substr(4, 2),
			];
			return parseInt(_calday[n - 1]);
		},

		/**
		 * 传入农历数字月份返回汉语通俗表示法
		 * @param lunar month
		 * @return Cn string
		 * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
		 */
		toChinaMonth: function(m) { // 月 => \u6708
			if (m > 12 || m < 1) {
				return -1
			} //若参数错误 返回-1
			var s = this.nStr3[m - 1];
			s += "\u6708"; //加上月字
			return s;
		},

		/**
		 * 传入农历日期数字返回汉字表示法
		 * @param lunar day
		 * @return Cn string
		 * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
		 */
		toChinaDay: function(d) { //日 => \u65e5
			var s;
			switch (d) {
				case 10:
					s = '\u521d\u5341';
					break;
				case 20:
					s = '\u4e8c\u5341';
					break;
					break;
				case 30:
					s = '\u4e09\u5341';
					break;
					break;
				default:
					s = this.nStr2[Math.floor(d / 10)];
					s += this.nStr1[d % 10];
			}
			return (s);
		},

		/**
		 * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
		 * @param y year
		 * @return Cn string
		 * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
		 */
		getAnimal: function(y) {
			return this.Animals[(y - 4) % 12]
		},

		/**
		 * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
		 * @param y  solar year
		 * @param m  solar month
		 * @param d  solar day
		 * @return JSON object
		 * @eg:console.log(calendar.solar2lunar(1987,11,01));
		 */
		solar2lunar: function(y, m, d) { //参数区间1900.1.31~2100.12.31
			y = parseInt(y)
			m = parseInt(m)
			d = parseInt(d)
			//年份限定、上限
			if (y < 1900 || y > 2100) {
				return -1; // undefined转换为数字变为NaN
			}
			//公历传参最下限
			if (y == 1900 && m == 1 && d < 31) {
				return -1;
			}
			//未传参  获得当天
			if (!y) {
				var objDate = new Date();
			} else {
				var objDate = new Date(y, parseInt(m) - 1, d)
			}
			var i, leap = 0,
				temp = 0;
			//修正ymd参数
			var y = objDate.getFullYear(),
				m = objDate.getMonth() + 1,
				d = objDate.getDate();
			var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900,
				0, 31)) / 86400000;
			for (i = 1900; i < 2101 && offset > 0; i++) {
				temp = this.lYearDays(i);
				offset -= temp;
			}
			if (offset < 0) {
				offset += temp;
				i--;
			}

			//是否今天
			var isTodayObj = new Date(),
				isToday = false;
			if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
				isToday = true;
			}
			//星期几
			var nWeek = objDate.getDay(),
				cWeek = this.nStr1[nWeek];
			//数字表示周几顺应天朝周一开始的惯例
			if (nWeek == 0) {
				nWeek = 7;
			}
			//农历年
			var year = i;
			var leap = this.leapMonth(i); //闰哪个月
			var isLeap = false;

			//效验闰月
			for (i = 1; i < 13 && offset > 0; i++) {
				//闰月
				if (leap > 0 && i == (leap + 1) && isLeap == false) {
					--i;
					isLeap = true;
					temp = this.leapDays(year); //计算农历闰月天数
				} else {
					temp = this.monthDays(year, i); //计算农历普通月天数
				}
				//解除闰月
				if (isLeap == true && i == (leap + 1)) {
					isLeap = false;
				}
				offset -= temp;
			}
			// 闰月导致数组下标重叠取反
			if (offset == 0 && leap > 0 && i == leap + 1) {
				if (isLeap) {
					isLeap = false;
				} else {
					isLeap = true;
					--i;
				}
			}
			if (offset < 0) {
				offset += temp;
				--i;
			}
			//农历月
			var month = i;
			//农历日
			var day = offset + 1;
			//天干地支处理
			var sm = m - 1;
			var gzY = this.toGanZhiYear(year);

			// 当月的两个节气
			// bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
			var firstNode = this.getTerm(y, (m * 2 - 1)); //返回当月「节」为几日开始
			var secondNode = this.getTerm(y, (m * 2)); //返回当月「节」为几日开始

			// 依据12节气修正干支月
			var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
			if (d >= firstNode) {
				gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
			}

			//传入的日期的节气与否
			var isTerm = false;
			var Term = null;
			if (firstNode == d) {
				isTerm = true;
				Term = this.solarTerm[m * 2 - 2];
			}
			if (secondNode == d) {
				isTerm = true;
				Term = this.solarTerm[m * 2 - 1];
			}
			//日柱 当月一日与 1900/1/1 相差天数
			var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
			var gzD = this.toGanZhi(dayCyclical + d - 1);
			//该日期所属的星座
			var astro = this.toAstro(m, d);

			var solarDate = y + '-' + m + '-' + d
			var lunarDate = year + '-' + month + '-' + day

			var festival = this.festival
			var lfestival = this.lfestival

			var festivalDate = m + '-' + d
			var lunarFestivalDate = month + '-' + day

			return {
				date: solarDate,
				lunarDate: lunarDate,
				festival: festival[festivalDate] ? festival[festivalDate].title : null,
				lunarFestival: lfestival[lunarFestivalDate] ? lfestival[lunarFestivalDate].title : null,
				'lYear': year,
				'lMonth': month,
				'lDay': day,
				'Animal': this.getAnimal(year),
				'IMonthCn': (isLeap ? "\u95f0" : '') + this.toChinaMonth(month),
				'IDayCn': this.toChinaDay(day),
				'cYear': y,
				'cMonth': m,
				'cDay': d,
				'gzYear': gzY,
				'gzMonth': gzM,
				'gzDay': gzD,
				'isToday': isToday,
				'isLeap': isLeap,
				'nWeek': nWeek,
				'ncWeek': "\u661f\u671f" + cWeek,
				'isTerm': isTerm,
				'Term': Term,
				'astro': astro
			};
		},

		/**
		 * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
		 * @param y  lunar year
		 * @param m  lunar month
		 * @param d  lunar day
		 * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
		 * @return JSON object
		 * @eg:console.log(calendar.lunar2solar(1987,9,10));
		 */
		lunar2solar: function(y, m, d, isLeapMonth) { //参数区间1900.1.31~2100.12.1
			y = parseInt(y)
			m = parseInt(m)
			d = parseInt(d)
			var isLeapMonth = !!isLeapMonth;
			var leapOffset = 0;
			var leapMonth = this.leapMonth(y);
			var leapDay = this.leapDays(y);
			if (isLeapMonth && (leapMonth != m)) {
				return -1;
			} //传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
			if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
				return -1;
			} //超出了最大极限值
			var day = this.monthDays(y, m);
			var _day = day;
			//bugFix 2016-9-25
			//if month is leap, _day use leapDays method
			if (isLeapMonth) {
				_day = this.leapDays(y, m);
			}
			if (y < 1900 || y > 2100 || d > _day) {
				return -1;
			} //参数合法性效验

			//计算农历的时间差
			var offset = 0;
			for (var i = 1900; i < y; i++) {
				offset += this.lYearDays(i);
			}
			var leap = 0,
				isAdd = false;
			for (var i = 1; i < m; i++) {
				leap = this.leapMonth(y);
				if (!isAdd) { //处理闰月
					if (leap <= i && leap > 0) {
						offset += this.leapDays(y);
						isAdd = true;
					}
				}
				offset += this.monthDays(y, i);
			}
			//转换闰月农历 需补充该年闰月的前一个月的时差
			if (isLeapMonth) {
				offset += day;
			}
			//1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
			var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
			var calObj = new Date((offset + d - 31) * 86400000 + stmap);
			var cY = calObj.getUTCFullYear();
			var cM = calObj.getUTCMonth() + 1;
			var cD = calObj.getUTCDate();

			return this.solar2lunar(cY, cM, cD);
		},
		// 
	};


	export default {
		name: 'calendar',

		props: {
			type: {
				type: String,
				default: 'single',
				desc: '选择类型: single表示选择单个日期、multiple表示选择多个日期、range表示选择日期区间'
			},
			color: {
				type: String,
				default: '#FF960A',
				desc: '主题色，对底部按钮和选中日期生效'
			},
			title: {
				type: String,
				default: '日期选择',
				desc: '标题，日期面板顶部标题'
			},
			btnTitle: {
				type: String,
				default: '确定',
				desc: '按钮文案，底部按钮文案'
			},
			isMask: {
				type: Boolean,
				default: true,
				desc: '是否开启遮罩层',
			},
			
			isMarkClick:{
				type: Boolean,
				default: true,
				desc: '是否开启遮罩层关闭',
			},
			btnColor: {
				type: [Boolean, String],
				default: false,
				desc: '按钮颜色，底部按钮颜色'
			},
			bg:{
				type: [Boolean, String],
				default: true,
				desc: '背景颜色'
			},
			minDate: {
				type: Object,
				default: function() {
					return new Date()
				},
				desc: '可选择的最小日期'
			},
			maxDate: {
				type: Object,
				default: function() {
					return new Date((new Date().getFullYear() + 1), new Date().getMonth(), 1)
				},
				desc: '可选择的最大日期'
			},
			show: {
				type: Boolean,
				default: false,
				desc: '是否显示日历弹窗'
			},
			position: {
				type: String,
				default: 'bottom',
				desc: '弹出位置，可选值为 top | right | left | bottom'
			},
			lunar: {
				type: Boolean,
				default: true,
				desc: '是否显示农历，可选值为 true | false'
			},
			showButton: {
				type: Boolean,
				default: true,
				desc: '是否显示底部按钮，可选值为 true | false'
			},
			showTitle: {
				type: Boolean,
				default: true,
				desc: '是否显示顶部标题，可选值为 true | false'
			},
			fullScreen:{
				type: Boolean,
				default: false,
				desc: '是否全屏日历，可选值为 true | false（左侧和右侧弹出时只能全屏）'
			},
			showClose: {
				type: Boolean,
				default: true,
				desc: '是否显示关闭按钮，可选值为 true | false'
			},
			closeImg: {
				type: String,
				default: 'undefined',
				desc: '右上角关闭按钮图标'
			},
			poppable: {
				type: Boolean,
				default: true,
				desc: '是否以弹层的形式展示日历'
			},
			formatter: {
				type: Function,
				default: function() {
					return Function
				},
				desc: '日期格式化函数'
			},
		},
		
		model: {
			prop: 'show',
			event: 'cancel'
		},

		data() {
			return {
				calendar: 'calendar',
				weekends: [{
						week: '日',
						time: '',
						color: 'rgba(51, 51, 51, 0.4)'
					},
					{
						week: '一',
						time: '',
						color: '#333333'
					},
					{
						week: '二',
						time: '',
						color: '#333333'
					},
					{
						week: '三',
						time: '',
						color: '#333333'
					},
					{
						week: '四',
						time: '',
						color: '#333333'
					},
					{
						week: '五',
						time: '',
						color: '#333333'
					},
					{
						week: '六',
						time: '',
						color: 'rgba(51, 51, 51, 0.4)'
					},
				],
				days: [],
				positionClass:'',
				positionAnimal:'',
				showPop:false,
				showPopAnimal:false,
				autoClose:true,
				checkStart: -1, //开始点击的日期
				checkEnd: -1, //结束点击的日期
				year: new Date().getFullYear(), //获取当前年
				year_min: new Date().getFullYear(), //获取当前年
				year_max: new Date().getFullYear(), //获取当前年
				month: (new Date().getMonth()), //获取当前月
				month_min: 0, //获取当前月
				month_max: 11, //获取当前月
				day: new Date().getDate(),
				day_min: 1,
				day_max: 31,
				isShow: false,
				monthNumber: 5, //每次懒加载时候所加载的月份数
				theme_RGBA: null,
				singleIndex: -1, //单选时，第一级对象的索引
				singleIdx: -1, //单选时，第二级对象的索引,
				checkedList: [], //选中的日期数组
				isStart: false, //选择区间的时候是否选择了开始日期
				isEnd: false, //选择区间的时候是否选择了结束日期
				startIndex: -1,
				startIdx: -1,
				endIndex: -1,
				endIdx: -1,
			}
		},
		watch: {
			show(){
				
				console.log('this.show:',this.show)
				if(this.show){
					this.showPop = this.show
					let t = setTimeout(()=>{
						this.showPopAnimal = this.show
						clearTimeout(t)
					},1)
				}else{
						this.showPopAnimal = this.show
					let t = setTimeout(()=>{
						this.showPop = this.show
						clearTimeout(t)
					},400)
				}
			},
		},
		computed: {},
		mounted() {
			// console.warn(this.maxDate)
			// console.warn(this.minDate)
			let tMinDate = new Date(this.minDate)
			let tMaxDate = new Date(this.maxDate)
			this.positionClass = ('calendar-position-'+this.position)
			this.positionAnimal = ('calendar-animal-'+this.position)
			
			if (!this.poppable) {
		
				this.show = true

			}

			this.year_min = tMinDate.getFullYear()
			this.year_max = tMaxDate.getFullYear()
			// console.warn(this.year_min)
			// console.warn(this.year_max)
			if (this.year_min <= this.year_max) {

				this.monthNumber = 0

				this.year = this.year_min

				this.month_min = (tMinDate.getMonth())
				this.month_max = (tMaxDate.getMonth())
				this.month = this.month_min

				this.day_min = tMinDate.getDate()
				this.day_max = tMaxDate.getDate()


				let m_month_min = this.month_min

				let m_year_min = this.year_min


				for (m_year_min; m_year_min <= this.year_max; m_year_min++) {
					let m = this.month_max

					if (m_year_min < this.year_max) {
						m = 11
					}

					for (m_month_min; m_month_min <= m; m_month_min++) {

						this.monthNumber++

					}
					m_month_min = 0

				}


			}

			// console.warn('月份数：', this.monthNumber)
			// console.warn('this.day_max：', this.day_max)


			this.init()

			this.theme_RGBA = this.hexToRgb(this.color)


		},
		methods: {

			//初始化日历
			init() {
				// console.log('完整日历数组：', this.day_min);
				// console.log('完整日历数组：', this.day_max);
				for (let i = 0; i < this.monthNumber; i++) {
					if ((this.month + 1) > 12) {
						this.month = 1;
						this.year++;
					} else {
						this.month++;
					}
					this.getDays(this.year, this.month);
				}
				// this.getServiceTime()
				// console.log('完整日历数组：', this.days);
				this.loading = false;
				this.finished = false;
			},


			//日历点击
			// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
			choose(item, v) {

				let month = this.days.find(it => it.title === item.title)

				let day = month.list.find(it => it.uuid === v.uuid)

				let color = this.hexToRgb(this.color)

				if (!day.isCheck) {
					return;
				}
				if (!day.isEffective) {
					return;
				}

				if (!day.color) {

					//单选
					if (this.type === 'single') {

						this.checkedList = []

						let time = ''

						if (this.singleIndex !== -1) {

							this.days[this.singleIndex].list[this.singleIdx].color = null

							this.days[this.singleIndex].list[this.singleIdx].backgroundColor = null

						}


						this.singleIndex = this.days.findIndex(it => it.title === item.title)

						this.singleIdx = month.list.findIndex(it => it.uuid === v.uuid)

						day.color = `#FFFFFF`

						day.backgroundColor = `rgba(${color.r},${color.g},${color.b},1)`

						// console.log(day)

						time = day.time

						time = new Date(time)

						this.checkedList.push(time)

						this.$emit('change', time)

						//多选
					} else if (this.type === 'multiple') {

						let time = ''

						day.color = `#FFFFFF`

						day.backgroundColor = `rgba(${color.r},${color.g},${color.b},1)`

						time = day.time

						time = new Date(time)

						this.checkedList.push(time)

						this.$emit('change', this.checkedList)

						//区间
					} else if (this.type === 'range') {

						if (!this.isStart && !this.isEnd) {

							this.startIndex = this.days.findIndex(it => it.title === item.title)

							this.startIdx = month.list.findIndex(it => it.uuid === v.uuid)

							day.color = `#FFFFFF`

							day.backgroundColor = `rgba(${color.r},${color.g},${color.b},1)`

							day.backgroundColor_assist = `rgba(${color.r},${color.g},${color.b},0.1)`

							day.isRangeLeft = true

							this.isStart = true

							this.checkedList.push(new Date(day.time))

						} else if (this.isStart && !this.isEnd) {

							this.endIndex = this.days.findIndex(it => it.title === item.title)

							this.endIdx = month.list.findIndex(it => it.uuid === v.uuid)

							if (this.endIndex < this.startIndex) {
								this.initStartTime()
								this.choose(item, v)
								return;
							} else if (this.endIndex === this.startIndex) {
								if (this.startIdx > this.endIdx) {
									this.initStartTime()
									this.choose(item, v)
									return;
								}
							}


							day.color = `#FFFFFF`

							day.backgroundColor = `rgba(${color.r},${color.g},${color.b},1)`

							day.backgroundColor_assist = `rgba(${color.r},${color.g},${color.b},0.1)`

							for (let si = this.startIndex; si <= this.endIndex; si++) {

								for (this.startIdx = this.startIdx + 1; this.startIdx <= (this.days[si].list
										.length - 1); this.startIdx++) {

									if (this.days[si].list[this.startIdx].uuid !== v.uuid) {

										this.days[si].list[this.startIdx].backgroundColor_li =
											`rgba(${color.r},${color.g},${color.b},0.1)`

										this.days[si].list[this.startIdx].color =
											`rgba(${color.r},${color.g},${color.b},1)`

									} else {

										break

									}

								}

								this.startIdx = -1

							}

							day.isRangeRight = true

							this.isEnd = true


							this.checkedList.push(new Date(day.time))

							this.$emit('change', this.checkedList)


						} else if (this.isEnd && this.isStart) {

							// console.log(this.days[this.startIndex])

							this.checkedList = []

							for (this.startIndex; this.startIndex <= this.endIndex; this.startIndex++) {

								this.days[this.startIndex].list.forEach((item, index) => {

									item.color = null

									item.isRangeLeft = false

									item.isRangeRight = false

									item.backgroundColor = null

									item.backgroundColor_li = null

									item.backgroundColor_assist = null

								})

							}

							this.isStart = false

							this.isEnd = false

							this.choose(item, v)


						}


					}


				} else {

					if (this.type === 'range') {

						if (this.isStart && this.isEnd) {

							this.checkedList = []

							day.color = null

							day.backgroundColor = null

							day.backgroundColor_li = null

							day.backgroundColor_assist = null

							day.isRangeLeft = false

							day.isRangeRight = false

							this.choose(item, v)
						}


						return;

					}

					let time = ''

					time = day.time

					time = new Date(time)

					let idx = this.checkedList.findIndex(it => Date.parse(it) === Date.parse(time))

					// console.log(888, idx)

					this.checkedList.splice(idx, 1)

					day.color = null

					day.backgroundColor = null

					if (this.type === 'single') {

						this.$emit('change', "")

						return

					}


					this.$emit('change', this.checkedList)

				}


			},

			//初始化起始日期
			initStartTime() {

				this.checkedList = []

				this.days[this.startIndex].list[this.startIdx].color = null

				this.days[this.startIndex].list[this.startIdx].backgroundColor = null

				this.days[this.startIndex].list[this.startIdx].backgroundColor_li = null

				this.days[this.startIndex].list[this.startIdx].backgroundColor_assist = null

				this.days[this.startIndex].list[this.startIdx].isRangeLeft = false

				this.days[this.startIndex].list[this.startIdx].isRangeRight = false
				this.isStart = false
			},

			//得出每个月总共有多少天并且得出对应的星期
			getDays(year, month) {
				// console.log(month);
				let _weekDay = ['日', '一', '二', '三', '四', '五', '六']; //用来计算指定时间为周几
				let _days = new Date(year, month, 0).getDate(); //指定的月份总共有多少天
				let _date = year + '/' + month + '/01' + ' 00:00:00';
				// console.log('当前时间:', _date);
				let _seconds = new Date(Date.parse(_date));
				// console.log('当前时间毫秒数:', _seconds);
				let _week = _weekDay[_seconds.getDay()];
				// console.log('当前时间周末:', _week);

				let _index = this.weekends.findIndex(item => item.week == _week);

				this.getArrayDays(year, month, _days, _index);

				// console.log('当前指定月份的天数:', this.days);

			},

			//16进制转成rgba
			hexToRgb(hex) {
				const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
				return result ? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
				} : null;

			},

			//uuid
			generateUUID() {
				let d = new Date().getTime();
				
				// #ifndef MP
				if (window.performance && typeof window.performance.now === "function") {
					d += performance.now(); //use high-precision timer if available
				}
				// #endif
				let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					let r = (d + Math.random() * 16) % 16 | 0;
					d = Math.floor(d / 16);
					return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
				});
				return uuid;
			},

			//获取一个月的日期数组
			getArrayDays(year, month, _days, _index) {
				let timeString = year + '/' + (month < 10 ? '0' + month : month) + '/';
				let isNow = false
				let isEnd = false
				if (year === this.year_min && month === (this.month_min + 1)) {
					isNow = true
				}
				if (year === this.year_max && month === (this.month_max + 1)) {
					isEnd = true
				}
				this.days.push({
					title: year + '年' + (month < 10 ? '0' + month : month) + '月',
					list: [],
				});
				for (let i = 0; i < (_days + _index); i++) {
					let color = this.hexToRgb(this.color)
					if (i < _index) {
						this.days[this.days.length - 1].list.push({
							id: '',
							day: '',
							year: '',
							month: '',
							time: '',
							nong: '',
							isTag: false,
							isRangeLeft: false,
							isRangeRight: false,
							color: null,
							backgroundColor: null,
							backgroundColor_li: null,
							backgroundColor_assist: null,
							uuid: this.generateUUID(),
							isChoose: false,
							isCheck: false,
							isEffective: false
						});
					} else {
						let o = {
							isEffective: true
						}
						if (isNow && (this.day_min + _index - 1) > i) {
							o.isEffective = false
						}
						if (isEnd && (this.day_max + _index - 1) < i) {
							o.isEffective = false
						}
						let time = timeString + '' + ((i - _index + 1) < 10 ? ('0' + (i - _index + 1)) : (i -
							_index + 1))
						let dateDay = (new Date(time + ' 00:00:00'))
						let format = this.formatter({
							date: dateDay,
							text: null,
							topTitle: null,
							bottomTitle: null
						})
						// console.warn(format)
						this.days[this.days.length - 1].list.push({
							id: '',
							day: i - _index + 1,
							year: year,
							month: month,
							isRangeLeft: false,
							isRangeRight: false,
							time: time,
							nong: this.lunar ? this.handleNong(year, month, (i - _index + 1)) : '',
							color: null,
							backgroundColor: null,
							backgroundColor_li: null,
							backgroundColor_assist: null,
							isTag: false,
							uuid: this.generateUUID(),
							isChoose: false,
							isCheck: true,
							...o,
							...format
						});

					}

				}
				for (let m = 0; m > -1; m++) {

					let length = this.days[this.days.length - 1].list.length
					if (length % 7 !== 0) {
						this.days[this.days.length - 1].list.push({
							id: '',
							day: '',
							year: '',
							month: '',
							time: '',
							nong: '',
							isTag: false,
							isRangeLeft: false,
							isRangeRight: false,
							color: null,
							backgroundColor: null,
							backgroundColor_li: null,
							backgroundColor_assist: null,
							uuid: this.generateUUID(),
							isChoose: false,
							isEffective: false,
							isCheck: false,
						})
					} else {
						break
					}
				}
				// console.log(this.days[this.days.length - 1].list.length)
			},

			handleNong(year, month, day) {
				let o = calendarNumber.solar2lunar(year, month, day)
				if (o.Term) {
					return o.Term
				} else if (o.IDayCn == '初一') {
					return o.IMonthCn
				} else {
					return o.IDayCn
				}
			},


			confirm() {

				if (this.type === 'range') {

					if (this.checkedList.length === 1) {

						this.checkedList.push(this.checkedList[0])

					}

				}

				console.log(this.checkedList)
				this.$emit('confirm', this.checkedList)
			},
			cancelMask(){
				if(this.isMarkClick){
					this.$emit('cancel', false)
				}
			},
			cancel() {
				
				this.$emit('cancel', false)
			}

		},

	};
</script>

<style lang="scss" scoped>
	.calendar {
		width: 100%;
		min-height: 816upx;
		background-color: #ffffff;
		display: flex;
		flex-flow: column;
		opacity: 1;
		position: fixed;
		z-index: 2022;
		left: 0;
		bottom: 0;
		right: 0;
		transition: 400ms ease;

		.mask {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: rgba(0, 0, 0, 0.6);
			z-index: -1;

			&.transparent {
				background: transparent;
			}
		}

		&-head {
			background-color: #ffffff;
			height: 96upx;
			display: flex;
			align-items: center;
			padding: 0 24upx;
			position: relative;
			z-index: 10;

			>view:nth-of-type(1) {
				width: 44upx;
			}

			>view.calendar-head-title {
				flex: 1;
				font-size: 34upx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #333333;
				text-align: center;
			}

			>view:last-child {
				.calendar-icon {
					color: #999999;
				}

				.calendar-img {
					width: 46upx;
					max-width: 46upx;
					min-width: 46upx;
					height: 46upx;
					max-height: 46upx;
					min-height: 46upx;
				}
			}

		}

		&-weekends {
			box-shadow: 0 4upx 20upx #F1F1F1;
			background-color: #ffffff;
			height: 80upx;
			position: relative;
			z-index: 9;
			width: 100%;
			display: grid;
			grid-template-columns: repeat(7, 1fr);

			&-week {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #333333;
			}
		}

		&-content::-webkit-scrollbar {
			display: none;
		}

		&-content {
			background-color: #ffffff;
			flex: 1;
			max-height: 640upx;
			overflow: auto;

			.calendar-days {
				&-head {
					height: 72upx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					font-size: 27upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					/*text-align: center;*/
				}

				&-body {
					width: 100%;
					margin-top: 16upx;

					&-ul {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						/*display: grid;*/
						/*grid-template-columns: repeat(7, 1fr);*/
						/*grid-row-gap: 8px;*/
						/*grid-column-gap: 0px;*/
						padding: 0 !important;
						place-items: center;
						list-style-type: none;
						margin-block-start: 0em;
						margin-block-end: 0em;
						margin-inline-start: 0px;
						margin-inline-end: 0px;
						padding-inline-start: 0px;

						li::before {
							content: '';
							padding-top: 100%;
							display: block;
						}

						li {
							-webkit-tap-highlight-color: transparent;
						}

						li {
							position: relative;
							list-style: none;
							display: flex;
							align-items: center;
							justify-content: center;
							border: none;
							width: 14.2857%;
							/*padding:7% 0 0;*/
							margin-top: 16upx;
							/*padding-bottom: 8px;*/

							.custom-default-color {

								background: #FF960A;


								.yang {
									color: #FFFFFF !important;
								}

								.nong {
									color: #ffffff !important;
								}
							}

							.calendar-start {
								position: absolute;
								height: 100%;
								width: 50%;
								right: 0;
								top: 0;
								z-index: 9;
							}

							.calendar-end {
								position: absolute;
								height: 100%;
								width: 50%;
								left: 0;
								top: 0;
								z-index: 9;
							}

							.calendar-li-day {
								position: absolute;
								border-radius: 50%;
								z-index: 10;
								/*width: 38px;*/
								width: 100%;
								height: 100%;
								/*height: 50px;*/
								justify-content: center;
								text-align: center;
								display: flex;
								flex-flow: column;

								.calendar-festival {
									color: #323233;
									/*height: 13px;*/
									/*line-height: 13px;*/
									max-height: 24upx;
									font-size: 24upx;
									line-height: 24upx;
									flex: 1;
									text-decoration: none;
									transform: scale(0.75);
								}

								.calendar-yang {
									/*margin-top: 4px;*/
									/*height: 22px;*/
									height: 30upx;
									line-height: 30upx;
									font-size: 32upx;
									font-family: Avenir-Heavy, Avenir;
									font-weight: 800;
									color: #333333;
								}

								.calendar-nong {

									/*margin-top: -4px;*/
									max-height: 24upx;
									flex: 1;
									/*line-height: 13px;*/
									line-height: 24upx;
									font-size: 24upx;
									transform: scale(0.75);

									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: rgba(51, 51, 51, 0.24);
								}


							}
						}
					}
				}
			}
		}

		&-footer {
			background-color: #ffffff;
			height: 128upx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			button {
				width: 606upx;
				height: 88upx;
				background: #FF960A;
				border-radius: 50upx;
				font-size: 32upx;
				color: #ffffff;
				border: none;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		

	}

	.calendar-fullScreen{
		height: 100vh!important;
	}
	
	.middle-fullScreen{
		max-height: unset!important;
	}
	
	.calendar-poppable{
		position: relative!important;
		left: unset!important;
		bottom: unset!important;
		right: unset!important;
	}
		.calendar-overlay{
			position: fixed;
			z-index: 2021;
			width: 100vw;
			height: 100vh;
			top: 0;
			left: 0;
			background-color: rgba(0,0,0,0);
			transition: 400ms all;
		}
		
		.calendar-overlay-animal{
			background-color: rgba(0,0,0,0.6)!important;
		}


	.calendar-position-top {

		top: 0;
		left: 0;
		bottom: unset!important;
		transform: translateY(-100%);

	}

	.calendar-position-bottom {

		left: 0;
		bottom: 0;
		transform: translateY(100%);

	}

	.calendar-position-left {

		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		transform: translateX(-100%);

	}

	.calendar-position-right {

		right: 0;
		top: 0;
		width: 100%;
		height: 100%;
		transform: translateX(100%);

	}

	.poppable {

		position: relative !important;

	}

	.calendar-show {

		position: fixed;
		width: 100%;
		/*top: 0;*/
		bottom: 0;
		left: 0;
		right: 0;

	}

	.calendar-animal-top {

		opacity: 1 !important;
		transform: translateY(0%) !important;

	}

	.calendar-animal-bottom {
		opacity: 1 !important;
		transform: translateY(-0%) !important;

	}

	.calendar-animal-left {
		opacity: 1 !important;

		transform: translateX(0%) !important;

	}

	.calendar-animal-right {

		opacity: 1 !important;
		transform: translateX(-0%) !important;

	}
</style>
