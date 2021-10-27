<template>
	<view class="cart">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="content">我的口袋</block>
		</cu-custom>

		<view class="cart-head">
			我的口袋里共计77个商品
		</view>

		<view class="cart-list">

			<cart-card v-for="(item,index) in cartList" :key="item.id" :cart="item" :index="index" @add="add"
				@subtract="subtract" @chooseStore="chooseStore" @chooseItem="chooseItem"></cart-card>

		</view>

		<view class="cart-footer" :style="{height:(CustomBar?CustomBar+'px':'')}">
			<view class="cart-footer-bottom">
				<view class="cart-footer-bottom-checkbox">
					<checkbox-group class="block" @change="chooseAllStore">
						<checkbox class="round olive-linear scale" value="all" :checked="checkedAll" /><text
							@tap="chooseAllStore">全选</text>
					</checkbox-group>
				</view>

				<view class="cart-footer-bottom-price">
					合计：<text class="text-price">{{totalPrice}}</text>
				</view>

				<view class="cart-footer-bottom-btn">
					去结算({{total}})
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cartCard from './components/cart-card.vue'

	export default {
		components: {
			cartCard
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				checkedAll: false,
				buyList: [],
				cartList: [{
						id: 'a1',
						storeName: '宠物医院',
						storeId: 'aaa',
						checked: false,
						list: [{
							id: 'b1',
							goodsId: '111',
							imgUrl: 'https://img01.yzcdn.cn/vant/cat.jpeg',
							title: '农家老腊肉特级风干处理外焦里嫩肉味浓郁送亲人送朋友的',
							grade: '农场盛宴2kg',
							notice: '库存紧张,限购一件',
							price: 18.5,
							count: 1,
							maxCount: 20,
							minCount: 1,
							checked: false
						}, ]
					},
					{
						id: 'a2',
						storeId: 'bbb',
						storeName: 'pinn 宠物生活馆',
						checked: false,
						list: [{
								id: 'b2',
								goodsId: '222',
								imgUrl: 'https://img01.yzcdn.cn/vant/cat.jpeg',
								title: '农家老腊肉特级风干处理外焦里嫩肉味浓郁送亲人送朋友的农家老腊肉特级风干处理外焦里嫩肉味浓郁送亲人送朋友的',
								grade: '农场盛宴2kg',
								notice: '限购一件',
								price: 25.9,
								count: 1,
								maxCount: 12,
								minCount: 1,
								checked: false
							},
							{
								id: 'b3',
								goodsId: '333',
								imgUrl: 'https://img01.yzcdn.cn/vant/cat.jpeg',
								title: '渴望origin',
								grade: '海洋盛宴2kg',
								notice: '即将到期',
								price: 230,
								count: 1,
								maxCount: 12,
								minCount: 1,
								checked: false
							},
						]
					},
				],
			};
		},
		computed: {

			total() {
				if (this.buyList.length) {

					let t = 0
					this.buyList.forEach((item, index) => {
						item.list.forEach((it, idx) => {
							t = t + it.count
						})
					})
					return t

				}
				return this.buyList.length
			},

			totalPrice() {
				let price = 0
				if (this.buyList.length) {

					this.buyList.forEach((item, index) => {
						item.list.forEach((it, idx) => {
							price = price + (it.count*it.price)
						})
					})
					return price

				}
				
				return price

			}

		},
		methods: {






			//checkbox选中店铺 index为店铺的索引 id为店铺的id
			chooseStore(index, id) {

				this.cartList[index].checked = !(this.cartList[index].checked)
				this.cartList[index].list.forEach((it, idx) => {
					it.checked = this.cartList[index].checked
				})

				let idx = this.buyList.findIndex(t => t.storeId === this.cartList[index].storeId)

				if (this.cartList[index].checked) {

					this.buyList.push({...this.cartList[index]})

				} else {

					this.buyList.splice(idx, 1)

				}

				this.chooseAll()
				console.log(id)
			},

			//checkbox选中商品 index为店铺的索引 id为商品的id
			chooseItem(index, ids) {

				let buyListIdx = this.buyList.findIndex(t => t.storeId === this.cartList[index].storeId)

				let storeInfo = {
					...this.cartList[index]
				}

				storeInfo.list = []

				if (buyListIdx !== -1) {
					this.buyList[buyListIdx].list = []
				} else {
					this.buyList.push(storeInfo)
					buyListIdx = this.buyList.length - 1
				}

				console.log(this.buyList)
				console.log(this.cartList[index])

				this.cartList[index].list.forEach((it, idx) => {

					if (ids.find(t => t === it.goodsId)) {

						this.buyList[buyListIdx].list.push({...it})

						it.checked = true



					} else {

						it.checked = false

					}
				})



				let storeCheckedAll = true //当前商品所在的店铺的商品是否全部选择，默认true


				for (let item of this.cartList[index].list) {
					if (!item.checked) {
						storeCheckedAll = false
					}
				}

				this.cartList[index].checked = storeCheckedAll

				this.chooseAll()
			},


			//判断是否全部选中
			chooseAll() {
				for (let item of this.cartList) {
					if (!item.checked) {
						this.checkedAll = false
						return
					}
					for (let it of item.list) {
						if (!it.checked) {
							this.checkedAll = false
							return
						}
					}
				}

				this.buyList = this.cartList.slice(0)

				this.checkedAll = true
			},

			//手动选中所有商品、店铺
			chooseAllStore() {

				if (this.checkedAll) {
					for (let item of this.cartList) {
						item.checked = false
						for (let it of item.list) {
							it.checked = false
						}
					}

					this.buyList = []

				} else {
					for (let item of this.cartList) {
						item.checked = true
						for (let it of item.list) {
							it.checked = true
						}
					}

					this.buyList = this.cartList
				}



				this.checkedAll = !this.checkedAll
			},

			//增加购买数量 参数：index为店铺的索引，idx为店铺下面商品的索引，item为商品的信息
			add(index, idx, item) {
				console.log(index, idx, item)
				this.cartList[index].list[idx].count++
			},

			//减少购买数量 参数：index为店铺的索引，idx为店铺下面商品的索引，item为商品的信息
			subtract(index, idx, item) {
				console.log(index, idx, item)
				this.cartList[index].list[idx].count--
			}

		}
	}
</script>

<style lang="scss" scoped>
	.cart {

		min-height: 100vh;
		background-color: #F5F5F5;

		&-head {
			font-size: 28upx;
			padding: 0 24upx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #888888;
			height: 80upx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
		}

		&-footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100vw;
			padding: 16upx 24upx;
			display: flex;
			min-height: 132upx;
			align-items: flex-start;
			background-color: #FFFFFF;

			&-bottom {
				height: 100upx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-start;

				&-checkbox {
					// width: 104upx;
					display: flex;

					text {
						margin-left: 16upx;
						font-size: 28upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #222222;
						line-height: 40upx;
					}
				}

				&-price {
					flex: 1;
					padding: 0 16upx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					font-size: 28upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FF111C;

					.text-price {
						color: #FF111C !important;
						font-size: 28upx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
					}
				}

				&-btn {
					display: flex;
					align-items: center;
					margin-left: auto;
					height: 68upx;
					background: linear-gradient(131deg, #8dc63f 0%, #F95B23 100%);
					border-radius: 34upx;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					padding: 0 40upx;
				}

			}


		}

	}

	.scale {
		transform: scale(0.8);
	}
</style>
