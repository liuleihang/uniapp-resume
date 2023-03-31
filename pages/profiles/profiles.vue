<template>
  <view class="page-item section">
    <!-- <view class="page-title">作品</view> -->
    <view class="page-container">
      <swiper
        name="profiles-swiper"
        ref="profiles-swiper"
        class="profiles-swiper"
        :effect="effect"
        :autoplay="autoplay"
        :interval="interval"
        :mousewheel="mousewheel"
        :indicator-dots="indicatorDots"
        :indicator-active-color="indicatorActiveColor"
      >
        <swiper-item class="swiper-item" v-for="(profile, index) in profiles" :key="index">
          <view class="box">
            <view class="card">
              <view class="card-header">
                <!-- <view class="card-title">{{ profile.title }}</view> -->
                <view class="card-sub-title">{{ profile.subTitle }}</view>
              </view>
              <view class="card-title-container">技术栈： {{ profile.skills }}</view>
              <view class="card-text">{{ profile.text }}</view>
              <view class="card-actions" v-if="profile.github">
                <view class="link" @click="toOutLink(profile.github)">
                  <i class="icon iconfont icon-github-fill"></i>
                  <!-- <text class="text">{{ profile.github }}</text> -->
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import { profiles } from "@/data/index.js"
import { copyData } from "@/utils/uniTool.js"
export default {
  name: "Profiles",
  data() {
    return {
      profiles,
      type: "card",
      spaceBetween: 30,
      effect: "fade",
      indicatorDots: true,
      autoplay: true,
      interval: 10000, //自动切换时长，单位ms
      mousewheel: true,
      indicatorDots: true,
      indicatorActiveColor: "#ffffff",
      copyUrlTips: '已自动复制网址，请在浏览器里粘贴网址'
    };
  },
  methods: {
    toOutLink(src){
      // #ifdef H5
      window.open(src)
      // #endif
      // #ifdef MP-WEIXIN
      copyData(src,this.copyUrlTips)
      //个人小程序不支持外链跳转
      // uni.navigateTo({
      //   url: '/pages/out-link/out-link?src='+ src
      // })
      // #endif
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  background-color: rgb(23, 158, 140) !important;

  // color: #000;
  .profiles-swiper {
    height: 100%;
    .swiper-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .box {
        width: 95%;
        .card {
          box-sizing: border-box;
          border-radius: 10px;
          // border-color: rgba(243, 243, 243, 50%);
          border: 1px solid rgba(243, 243, 243, 50%);
          text-align: left;
          background-color: rgba(23, 158, 140, 10%);
          padding: 0px 5px;
          .card-header {
            padding: 5px 0px;
          }
          .card-sub-title {
            // font-size: 14px;
            color: rgba(255, 255, 255, 80%);
          }

          .card-title-container {
            padding: 5px 0px;
            // font-size: 14px;
            // color: rgba(255, 255, 255, 80%);
          }
          .card-title {
            color: #ffffff;
            font-size: 1.3rem;
          }
          .card-text {
            padding: 5px 0px;
            letter-spacing: 1px;
            // color: rgba(255, 255, 255, 90%);
            text-align: left;
          }
          .card-actions {
            padding: 5px 0px;
            .link {
              font-size: 15px;
              text-decoration: none;
              display: flex;
              align-items: center;
              .text {
                color: $uni-text-color;
              }
            }
            .iconfont {
              color: $uni-text-color;
              font-size: 25px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>