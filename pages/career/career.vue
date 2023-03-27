<template>
  <view class="page-item section">
    <!-- <view class="page-title">职业生涯</view> -->
    <view class="page-container career">
      <!-- <view v-for="(item, index) in career" :key="index">
        <view class="item">
          <h3 class="title">{{item.time}}</h3>
          <h3 class="title">{{item.company}}</h3>
          <p class="text">{{item.text}}</p>
        </view>
        <el-viewider class="el-viewider"></el-viewider>
      </view> -->
      <timeline class="timeline">
        <timeline-item 
          class="timeline-item"
          v-for="(item, index) in career"
          :key="index"
          :timestamp="item.time"
          placement="top"
        >
        <view class="card">
          <view class="card-header">
            <view class="card-title">{{ item.company }}</view>
          </view>
          <view class="card-text">
            <view v-for="(item, index) in item.workList" :key="index">
              {{ item }}
            </view>
          </view>
        </view>
        </timeline-item>
      </timeline>
    </view>
  </view>
</template>

<script>
import { career } from '@/data/index.js'
import TimeLine from '@/components/timeline/timeline.vue'
import TimelineItem from '@/components/timeline/timeline-item.vue'
export default {
  name: 'career',
  components: {
    TimeLine,
    TimelineItem
  },
  data(){
    return {
      career: career,
    }
  },
  created(){
    this.career = this.career.reverse();
  }
}
</script>

<style lang="scss" scoped>
.section {
  background-color: #1c6c77 !important;
  .career {
    .card {
      box-sizing: border-box;
      border-radius: 10px;
      border: 1px solid rgb(176, 190, 197);
      text-align: left;
      background-color: rgba(28, 108, 119, 10%);
      padding: 0px 5px;
      .card-header {
        padding: 5px 0px;
      }
      .card-title {
        color: #ffffff;
        font-size: 1.2rem;
      }
      .card-text {
        padding: 5px 0px;
        letter-spacing: 1px;
        color: #e3e3e3;
        text-align: left;
      }
    }
  }
}
</style>