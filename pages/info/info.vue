<template>
  <view class="page-item section">
    <!-- <h2>个人简介</h2> -->
    <!-- <view class="page-title">个人简介</view> -->
    <view class="page-container">
      <view class="head">
        <img class="img" :src="headImg">
        <!-- <el-avatar  :src="headImg"></el-avatar> -->
      </view>
      <view>{{ info.name }}</view>
      <view>{{ info.introduce }}</view>
      <view class="papers">
        <view v-for="(item, index) in info.status" :key="index">
          <view :key="index" class="paper" circle :z-depth="4">
            <!-- <i :class="`iconfont ${item.icon}`"></i> -->
            <i class="iconfont" :class="item.icon"></i>
            <view class="title">{{ item.value }}</view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import { mapState } from 'vuex'
import headImg from 'static/images/head.png'
export default {
  name: 'Info',
  components: {
  },
  data() {
    return {
      headImg
    }
  },
  mounted() {
  },
  computed: {
    ...mapState(['info'])
  }
}
</script>

<style lang="scss" scoped>
.section {
  background-color: #1d6666 !important;
  .head {
    margin: 10px 0px;
    .img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

  }
}

.papers {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .paper {
    margin: 15px;
    width: 50px;
    height: 50px;
    color: #c0c8cf;
    border-radius: 50%;
    background-color: rgba(97, 136, 207, .363);

    /* box-shadow:  5px 5px 10px #114040,
            -5px -5px 10px #175252; */
    .iconfont {
      height: 50px;
      line-height: 50px;
      font-size: 30px;
    }

    .title {
      font-size: .9rem;
      margin: 5px 0;
      // color: rgba(192, 200, 207, 0.514);
    }
  }
}
</style>