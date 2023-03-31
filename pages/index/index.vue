<template>
  <view ref="resume" class="resume">
    <navbar :title="title"></navbar>
    <swiper
      name="pageCarousel"
      ref="pageCarousel" 
      class="pageCarousel"
      :height="height"
			:effect="effect"
			:vertical="vertical"
			:autoplay="autoplay"
			:interval="interval"
			:indicator-dots="indicatorDots"
      :easing-function="easing"
			:indicator-active-color="indicatorActiveColor"
      :current="swiperCurrentIndex"
      @change="changePage"
    >
      <swiper-item>
        <info ref="info" class="swiper-item" :pageIndex="0"></info>
      </swiper-item>
      <swiper-item>
        <skills ref="skills" class="swiper-item" :pageIndex="1"></skills>
      </swiper-item>
      <swiper-item>
        <profiles ref="profiles" class="swiper-item" :pageIndex="2"></profiles>
      </swiper-item>
      <swiper-item>
        <career ref="career" class="swiper-item" :pageIndex="3"></career>
      </swiper-item>
      <swiper-item>
        <contact ref="contact" class="swiper-item" :pageIndex="4"></contact>
      </swiper-item>
    </swiper>
    <view class="pdf-box" @click="previewPdf">
      <view class="pdf-tool">
        <i class="iconfont icon-pdf"></i>
      </view>
    </view>
  </view>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import navbar from 'components/navbar/navbar.vue'
import info from 'pages/info/info.vue'
import skills from 'pages/skills/skills.vue'
import profiles from 'pages/profiles/profiles.vue'
import career from 'pages/career/career.vue'
import contact from 'pages/contact/contact.vue'
import { resumePdfUrl } from 'data/index.js'
export default {
  name: 'Resume',
  components: {
    navbar,
    info,
    skills,
    profiles,
    career,
    contact,
  },
  data() {
    return {
      title: '刘磊航的简历',
			startPoint: 0,
			stopPoint: 0,
			spaceBetween: 30,
			effect: 'fade',
			vertical: true, // 滑动方向是否为纵向
			height: '100vh',
			autoplay: false,
			interval: 10000, //自动切换时长，单位ms
			indicatorDots:true,
			indicatorActiveColor: '#ffffff',
      easing: 'linear',
      swiperCurrentIndex: 0,
			skillsPageIndex: 1,
      totalPage: 0,
    }
  },
  computed: {
    ...mapState(['activeIndex'])
  },
  watch: {
    swiperCurrentIndex(newVal){
      
    }
  },
  created(){
  },
  mounted(){
    // #ifdef H5
    // 以下三种方法都可以
    // document.querySelector('.resume').addEventListener('wheel', this.rollScroll)
    // window.onmousewheel=document.onmousewheel=this.rollScroll
    this.$refs.resume.$el.addEventListener('mousewheel', this.rollScroll)
    // swiper页数
    this.totalPage = document.querySelectorAll('.page-item').length;
    // #endif
  },
  methods: {
    ...mapActions(['changeActiveIndex']),
    rollScroll(event) { //鼠标滚轮事件方法
      let _that = this;
      // 最后一页的索引
      const totalPageIndex = this.totalPage - 1;
      // chrome、ie使用的wheelDelta，火狐使用detail
      let scrollVal = event.wheelDelta || event.detail;
      // 当前时第一页时，滚轮向上滑切换到最后一页,此处有问题，会自动跳到倒数第二页
      if(scrollVal > 0 && _that.swiperCurrentIndex === 0) {
        //  _that.swiperCurrentIndex = totalPageIndex;
        return;
      }
      // 节流
      if (!_that.timeOut) {
        _that.timeOut = setTimeout(() => {
          _that.timeOut = null;
          if(scrollVal > 0){
            _that.swiperCurrentIndex > 0 && _that.swiperCurrentIndex--; //上一页
          }else{
            if (this.swiperCurrentIndex === totalPageIndex) {
              this.swiperCurrentIndex = 0;
              return
            }
            _that.swiperCurrentIndex++; //下一页
          }
        }, 300);
      } else {
      }
    },
    //是否自动播放
    stopAuto() {
      this.autoplay = false;
    },
    startAuto() {
      this.autoplay = true;
    },
		/* touchstart(e){
			//手指点击位置的Y坐标
			this.startPoint = e.changedTouches[0].pageY;
		},
		touchmove(e){
			//手指滑动后终点位置Y的坐标
			this.startPoint = e.changedTouches[0].pageY;
		},
		touchend(){
			let startPoint = this.startPoint;
			let stopPoint = this.stopPoint;
			if (stopPoint == 0 || startPoint - stopPoint == 0) {
				this.resetPoint();
				this.startAuto();
				return;
			}
			// 下划上一页
			if (startPoint - stopPoint > 0) {
				this.resetPoint();
				this.$refs.pageCarousel.slideNext();
				this.startAuto();
				return;
			}
			// 上划下一页
			if (startPoint - stopPoint < 0) {
				this.resetPoint();
				this.$refs.pageCarousel.slidePrev();
				this.startAuto();
				return;
			}
		},
		resetPoint () {
			this.startPoint = 0;
			this.stopPoint = 0;
		}, */
    changePage({ detail }){ //更新swiper当前index
			let currentIndex = detail.current;
      this.swiperCurrentIndex = currentIndex;
      this.changeActiveIndex(currentIndex);
    },
    previewPdf(){
      // #ifdef MP-WEIXIN
      this.openDocument(resumePdfUrl);
      // #endif
      // #ifdef H5
      uni.navigateTo({
        url:'/pages/web-view/web-view'
      })
      // #endif
    },
    openDocument(url){
      /* wx.downloadFile({
        url: url,
        success: function(res) {
          const filePath = res.tempFilePath;
          wx.openDocument({
            filePath: filePath,
            fileType: 'pdf',
            success: function(res) {
              console.log('打开文档成功');
            }
          });
        }
      }); */
      uni.showLoading({
        title: '加载中'
      });
      uni.downloadFile({
        url: url,
        success: function(res) {
          const filePath = res.tempFilePath;
          uni.openDocument({
            filePath: filePath,
            fileType: 'pdf',
            showMenu: true,
            success: function(res) {
              uni.hideLoading();
            },
            fail:(res)=>{
              uni.hideLoading();
              uni.showToast({
                icon:'none',
                title:'文件打开失败',
                duration:2000
              })
            }
          });
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.resume {
  /* background-color: rgba(22,88,57,.897); */
  height: 100vh;
  overflow: hidden;
  .pageCarousel {
    height: 100vh;
  }
  .pdf-box {
    position: fixed;
    z-index: 1;
    right: 20px;
    bottom: 20px;
    .pdf-tool {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255,255,255,.3);
      margin-top: 10px;
      display: flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;
      color: #fff;
      cursor: pointer;
      .icon-pdf {
        font-size: 25px;
      }
    }
  }
}
</style>