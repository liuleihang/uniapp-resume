<template>
  <view class="out-link">
    <navbar></navbar>
    <view class="conent" v-if="src">
      <!-- #ifdef H5 -->
      <iframe style="width: 100%;height: 100vh" :src="src" frameborder="0" scrolling="no" onload="this.height=this.contentWindow.document.body.scrollHeight" />
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN 个人小程序不支持互联网链接-->
      <!-- <web-view class="webview" :webview-styles="wbStyles" :src="src" :fullscreen="true" /> -->
      <!-- #endif -->
    </view>
  </view>
</template>
 
<script>
import { resumePdfUrl } from 'data/index.js'
import { pdfViewerUrl } from 'config/index.js'
import navbar from 'components/navbar/navbar.vue'
export default {
  name: 'WebView',
  components: {
    navbar
  },
  data() {
    return {
      title:'',
      src: '',
      wbStyles: {
        width: '100%',
        height: '100%',
      },
    }
  },
  onLoad(option) {
    // #ifdef MP-WEIXIN
    this.src = resumePdfUrl;
    // #endif
    //pdf.js库预览
    // #ifdef H5
    this.src = `${pdfViewerUrl}?file=${encodeURIComponent(resumePdfUrl)}`;
    // #endif
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.out-link {
  background-color: rgb(102, 156, 138);
  height: 100vh;
  overflow: hidden;
  
}
</style>