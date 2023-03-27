<template>
  <view class="navbar" :style="{background,color,height:statusBarHeight+navBareight +'px'}">
		<view :style="{height:statusBarHeight+'px'}"></view>
		<view class="navbar-content">
			<!-- <view class="navbar-left" @click="onBack" v-if="back" :style="[{color},{paddingTop}]">
					<uni-icons type="arrowleft" size="25" :color='color' ></uni-icons>
			</view> -->
			<view class="navbar-title">{{title}}</view>
		</view>
	</view>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      statusBarHeight: 0,
      navBareight: 40,
      windowWidth: 375
    };
  },
  props: {
    title: {
      // 标题文字(默认为空)
      type: String,
      default: "#fff"
    },
    color: {
      // 标题和返回按钮颜色(默认白色)
      type: String,
      default: "#fff"
    },
    //建议使用background  因为使用backgroundColor，会导致不识别渐变颜色
    background: {
      // 背景颜色(不传值默认透明)
      type: String,
      // default: "transparent"
      default: "rgba(255,255,255,0)"
    },
    back: {
      // 是否显示返回按钮(不传值默认不显示)
      type: Boolean,
      default: false
    }
  },

  created() {
    //获取手机系统信息 -- 状态栏高度
    let { statusBarHeight, windowWidth } = uni.getSystemInfoSync();
    this.statusBarHeight = statusBarHeight;
    this.windowWidth = windowWidth;
    console.log("navbar.mounted ", statusBarHeight, windowWidth);
  }
  /*
		methods: {
			// 左侧返回按钮调用
			onBack() {
				this.$emit("onBack");
				uni.navigateBack({
						delta:1,//返回层数，2则上上页
			    })
			}
		} */
};
</script>
 
<style lang="scss">
.navbar {
	position: fixed;
	display: flex;
	top: 0;
	left: 0;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	z-index: 100;
	.navbar-left {
		position: absolute;
		width: 100rpx;
		height: 50rpx;
		top: 0;
		bottom: 0;
		left: 20rpx;
		color: #fff;
		margin: auto;
	}
	.navbar-title {
		font-weight: 600;
	}
}
</style>