<template>
  <view v-if="src">
    <!-- #ifdef H5 -->
    <!-- <iframe width="100%" height="100%" :src="src" :title="title" scrolling="no" onload="this.height=this.contentWindow.document.body.scrollHeight" /> -->
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <web-view :webview-styles="wbStyles" :src="src" :fullscreen="false" />
    <!-- #endif -->
  </view>
</template>
 
<script>
export default {
  data() {
    return {
      title: '',
      src: '',
      wbStyles: {
        width: '100%',
        height: '100%',
      },
    }
  },
  onLoad(option) {
    this.title = option?.title
    this.src = option?.src
    // #ifdef H5
    // window.location.href = option.src
    // #endif
  },
}
</script>