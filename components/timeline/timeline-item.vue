<template>
  <li class="v-timeline-item">
    <div class="v-timeline-item__tail"></div>
    <div class="v-timeline-item__node v-timeline-item__node--normal v-timeline-item__node--"></div>
    <div class="v-timeline-item__wrapper">
      <div class="v-timeline-item__timestamp is-top">{{timestamp}}</div>
      <div class="v-timeline-item__content">
        <slot></slot>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "TimelineItem",
  props: {
    title: {
      type: String,
      default: ""
    },
    timestamp: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.v-timeline-item {
  position: relative;
  padding-bottom: 20px;
}
// 微信小程序不支持:last-child
// .v-timeline .v-timeline-item:last-child .v-timeline-item__tail {
//   display: none;
// }
.v-timeline-item__wrapper {
  padding-left: 16px;
}
.v-timeline-item__timestamp {
  color: #ffffff;
  text-align: left;
}
.v-timeline-item__timestamp.is-top {
  margin-bottom: 8px;
  padding-top: 4px;
}
.v-timeline-item__content {
  padding-right: 5px;
}
.v-timeline-item__tail {
  position: absolute;
  left: 4px;
  height: 100%;
  border-left: 2px solid #e4e7ed;
}
.v-timeline-item__node--normal {
  left: -1px;
  width: 12px;
  height: 12px;
}
.v-timeline-item__node {
  position: absolute;
  background-color: #e4e7ed;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>