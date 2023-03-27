<template>
  <view class="page-item section">
    <!-- <view class="page-title">技能</view> -->
    <view class="page-container">
      <view class="skills-list">
        <view
          ref="skill"
          v-for="item in skills"
          :key="item"
          :tag="item"
          :show="true"
          class="skill animate__animated animate__zoomIn"
        >
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex"
import { skills } from "@/data/index.js"
import { shuffle } from "@/utils/index.js";
// import { shuffle } from 'lodash-es'
export default {
  name: "Skills",
  components: {
  },
  props: ["pageIndex"],
  data() {
    return {
      skills: skills,
    };
  },
  computed: {
    ...mapState(["activeIndex"])
  },
  watch: {
    activeIndex: {
      handler(newVal) {
        if (newVal === this.pageIndex) {
          this.startShuffle();
        } else {
          this.clearShuffle()
        }
      }
      // immediate: true //初始化立即执行(data里面定义了activeIndex后就立即执行handle)
    }
  },
  methods: {
    shuffleSkills(){
      this.skills = shuffle(this.skills)
    },
    clearShuffle(){
      clearInterval(this.time)
    },
    startShuffle(){
      this.shuffleSkills()
      this.time = setInterval(() => {
        this.shuffleSkills()
      }, 3000)
    },
  }
};
</script>

<style lang="scss" scoped>
.section {
  background-color: rgb(53, 125, 153) !important;
  .page-container {
    .skill {
      background-color: rgba(176, 190, 197, 60%);
      margin: 5px;
      color: rgb(56, 19, 59);
      border-radius: 16px;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      // font-size: 12px;
      white-space: nowrap;
      display: inline-block;
    }
  }
}
@keyframes shakeX {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translate(30px, 0);
  }
}
 
.shakeX {
  animation-name: shakeX;
  animation-duration: 3s;
  animation-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}
/* 微信小程序不支持transition组件
// 1. 声明过渡效果 
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
}

// 2. 声明进入和离开的状态
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

// 3. 确保离开的项目被移除出了布局流
// 以便正确地计算移动时的动画效果
.fade-leave-active {
  position: absolute;
} */
</style>