<template>
  <div class="bottom__bar__footer" :style="customStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'BottomBar',
  };
</script>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  /**
   * 自定义样式
   */
  const props = defineProps({
    customStyle: Object,
  });
  const footerWidth = ref();
  onMounted(() => {
    // footerWidth.value = document.getElementsByTagName('aside')[0].offsetWidth + 'px';
  });
</script>

<style lang="less" scoped>
  .bottom__bar__footer {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1;
    width: 100vw; // calc(100vw - v-bind(footerWidth));
    background: #fff;
    padding: 15px 20px;
    box-shadow: 0 -1px 5px 0 #e5e7eb;
  }
</style>
