<template>
  <view class="resume">
    <navbar class="header" :title="title">
    </navbar>
    <swiper
      name="pageCarousel"
      ref="pageCarousel" 
      class="pageCarousel"
      :height="height"
			:effect="effect"
			:vertical="vertical"
			:autoplay="autoplay"
			:interval="interval"
			:mousewheel="mousewheel"
			:indicator-dots="indicatorDots"
			:indicator-active-color="indicatorActiveColor"
      @change="changePage"
    >
      <swiper-item>
        <info ref="info" id="info" :pageIndex="0"></info>
      </swiper-item>
      <swiper-item>
        <skills ref="skills" id="skills" :pageIndex="1"></skills>
      </swiper-item>
      <swiper-item>
        <profiles ref="profiles" id="profiles" :pageIndex="2"></profiles>
      </swiper-item>
      <swiper-item>
        <career ref="career" id="profiles" :pageIndex="3"></career>
      </swiper-item>
      <swiper-item>
        <contact ref="contact" id="contact" :pageIndex="4"></contact>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import navbar from '../../components/navbar/navbar.vue'
import info from 'pages/info/info.vue'
import skills from 'pages/skills/skills.vue'
import profiles from 'pages/profiles/profiles.vue'
import career from 'pages/career/career.vue'
import contact from 'pages/contact/contact.vue'
export default {
  name: 'Resume',
  components: {
    navbar,
    info,
    skills,
    profiles,
    career,
    contact
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
			autoplay: true,
			interval: 5000, //自动切换时长，单位ms
			mousewheel: true, // 鼠标滚轮控制Swiper切换
			indicatorDots:true,
			indicatorActiveColor: '#ffffff',
			skillsPageIndex: 1,
    }
  },
  computed: {
    ...mapState(['activeIndex'])
  },
  mounted(){
		
  },
  methods: {
    ...mapActions(['changeActiveIndex']),
    rollScroll(event) {
      let _that = this;
      // chrome、ie使用的wheelDelta，火狐使用detail
      let scrollVal = event.wheelDelta || event.detail;
      // 节流
      if (!_that.timeOut) {
        _that.timeOut = setTimeout(() => {
          _that.timeOut = null;
          scrollVal > 0
            ? _that.$refs.pageCarousel.prev()
            : _that.$refs.pageCarousel.next();
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
		touchstart(e){
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
		},
    changePage({ detail }){
			let currentIndex = detail.current;
			let skillsPageIndex = this.skillsPageIndex;
      // console.log('skills.changePage>>>currentIndex ',currentIndex)
      // console.log('skills.changePage>>>skillsPageIndex ',skillsPageIndex)
      this.changeActiveIndex(currentIndex);
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
}

.resume .swiper-container {
  height: 100vh;
}
</style>