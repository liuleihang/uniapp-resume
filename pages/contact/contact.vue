<template>
  <view class="page-item section">
    <!-- <h2>联系我</h2> -->
    <!-- <view class="page-title">联系我</view> -->
    <view class="page-container">
      <view class="experience">
        <view class="title-h3">个人能力</view>
        <view class="content" v-for="(item,index) in contact.experiences" :key="index">
          <p class="p-item">{{item}}</p>
        </view>
        <!-- {{contact.experience}} -->
      </view>
      <view class="evaluation">
        <view class="title-h3">自我评价</view>
        <view class="content">{{contact.evaluation}}</view>
      </view>
      <view class="socials">
        <view class="title-h3">社交帐号</view>
        <view class="box">
          <view v-for="(item, index) in contact.socials" :key="index">
            <view v-if="item.url"  class="socials-item" @click="toOutLink(item.url)">
              <i class="iconfont" :class="item.icon"></i>
              <!-- <uni-icons class="iconfont" custom-prefix="iconfont" type="icon-juejin" size="30"></uni-icons> -->
              <!-- <uni-link :href="item.url">
                <uni-icons class="iconfont" custom-prefix="iconfont" type="icon-juejin" size="30"></uni-icons>
              </uni-link> -->
            </view>
            <view v-if="!item.url" class="socials-item" @click="isShowPop=!isShowPop">
              <i class="iconfont" :class="item.icon"></i>
            </view>
          </view>
        </view>
      </view>
      <view class="contact-me">
        <view class="title-h3">联系方式</view>
        <view class="call">
          <i class="iconfont icon-shoujihao"></i>
           <text class="text" @click="call">{{ contact.tel }}</text>
          <!-- <uni-link :href="`tel:${contact.tel}`" :showUnderLine="showUnderLine">
            <text class="text">{{ contact.tel }}</text>
          </uni-link> -->
        </view>
        <view class="call">
          <i class="iconfont icon-youxiang"></i>
          <text class="text" @click="copy(contact.email)">{{ contact.email }}</text>
          <!-- <uni-link :href="`mailto:${contact.email}`" :showUnderLine="showUnderLine">
            <text class="text">{{ contact.email }}</text>
          </uni-link> -->
        </view>
      </view>
      <view v-show="isShowPop" class='popContainer' @click="isShowPop=!isShowPop">
        <image class="img" :src="qrCodeImage" :show-menu-by-longpress="true">
      </view>
    </view>
  </view>
</template>
<script>

import { contact } from '@/data/index.js'
export default {
  name: 'Contact',
  data(){
    return {
      contact: contact,
      isShowQRCode: false,
      isShowPop: false,
      qrCodeImage: '/static/images/qrCode.png',
      showUnderLine: false,
      copyTips: '复制成功',
      copyUrlTips: '已自动复制网址，请在浏览器丽粘贴网址'
    }
  },
  methods: {
    copy(str,toastStr = this.copyTips){
      uni.setClipboardData({
        data: str, //要被复制的内容
        success: () => { //复制成功的回调函数
          uni.hideToast();
          uni.showToast({
            title: toastStr,
            duration: 2000,
            icon: 'none'
          });
        }
      });
    },
    call(){
      uni.makePhoneCall({
        phoneNumber: contact.tel,
        success: () => {
          
        },
        fail: () => {
          
        }
      });
    },
    previewImage(e) {
      console.log('e', e);
      const qrCodeImage = this.qrCodeImage;
      uni.previewImage({
        // 需要预览的图片链接列表
        urls: [qrCodeImage],
        // 为当前显示图片的链接/索引值
        current: 0,
        // 图片指示器样式  
        indicator:'default',
        // 是否可循环预览
        loop:false,
        // 长按图片显示操作菜单，如不填默认为保存相册
        // longPressActions:{
        //  itemList:[this.l('发送给朋友'),this.l]
        // },
        success: res => {
          console.log('res', res);
        }, 
        fail: err => {
          onsole.log('err', err);
        }
      });
    },
    toOutLink(src){
      // #ifdef H5
      window.open(src)
      // #endif

      // #ifdef MP-WEIXIN
      this.copy(src,this.copyUrlTips)
      //个人小程序不支持外链跳转
      // uni.navigateTo({
      //   url: '/pages/out-link/out-link?src='+ src
      // })
      // #endif
    }
  }

}
</script>
<style lang="scss" scoped>

.section {
  background-color: rgb(23, 141, 150)!important;
  a {
    text-decoration: none;
  }
  .page-container {
    text-align: left;
    height: auto;
    h3 {
      // text-align: center;
      // color: #ffffff;
      margin: 10px 0px;
    }
    .experience {
      .content {
        padding-left: 15px;
      }
      .p-item {
        padding: 2px 0;
      }
    }
    .evaluation {
      .content {
        padding-left: 15px;
      }
    }
    .socials {
      .box {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .socials-item {
          display: block;
          height: 40px;
          width: 40px;
          background: rgba(11, 5, 48, 0.3);
          border-radius: 20px;
          text-align: center;
          margin: 0 5px;
          text-decoration: none;
          .iconfont {
            font-size: 2rem;
            line-height: 40px;
            color: $uni-text-color;
          }
        }
      }
    }
    .contact-me {
      .call {
        margin: 0 auto;
        display: block;
        height: 30px;
        width: 85%;
        background: rgba(11, 5, 48, 0.3);
        border-radius: 15px;
        // font-size: 1.3rem;
        line-height: 30px;
        color: $uni-text-color;
        margin-bottom: 5px;
        text-align: left;
        // text-indent: 1rem;
        .iconfont {
          // font-size: 1.3rem;
          color: rgb(210, 213, 216);
          padding: 0 10px;
          display: inline-block;
        }
        .text {
          color: $uni-text-color;
          font-size: $uni-font-size-base;
          text-decoration: none !important;
        }
      }
    }
  }
}
.popContainer {
      position: fixed;
      width: 100%;
      height: 100%;
      margin: auto;
      left:0;
      right:0;
      top:0;
      bottom:0;
      // background: rgba(0,0,0,0.3);
      .img {
        width: 200px;
        height: 200px;
        position: fixed;
        margin: auto;
        left:0;
        right:0;
        top:0;
        bottom:0;
      }
    }
</style>
