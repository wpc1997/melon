<template>
	<!-- 寻宠页面 -->
	<view class="found">
		<view class="found-head">
			<cu-custom bgColor="bg-shadeTop text-white" :isBack="true" :backColor="'white'">
				<block slot="content">寻宠启示</block>
			</cu-custom>

		</view>

		<view class="found-sort">
			
		</view>




	</view>

</template>

<script>
	export default {
		data() {
			return {

				isShowSearchPopup: false,
				CustomBar: this.CustomBar,
			}
		},
		methods: {

			//搜索输入框的focus事件
			searchFocus() {
				if (!this.isShowSearchPopup) {
					this.isShowSearchPopup = !this.isShowSearchPopup
				}
			},

			//点击失去焦点
			outFocus() {
				this.isShowSearchPopup = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.left-cancle {
		width: 100upx !important;
		text-indent: 10upx;
	}


	.found {

		&-head {
			height: 490upx;
			background-color: #39B54A;
			
			&-search {

				position: fixed;
				width: 100%;

			}

		}

	}
</style>
