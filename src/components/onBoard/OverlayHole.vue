<template>
  <div class="overlay" :class="extraClass">
  </div>
</template>

<script>
  export default {
    props: ['extraClass']
  }
</script>

<style style="scss" scoped>
  .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: 9500;
  }
</style>
