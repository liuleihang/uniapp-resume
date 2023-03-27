<template>
  <ul class="v-timeline">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    reverse: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'left'
    }
  },
  beforeMount(){
  },
  mounted(){
  }
}
</script>

<style>
.v-timeline {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>