<template>
  <span class="icon__station" :style="{backgroundColor: hexa}" :class="extraClass">{{number}}</span>
</template>

<script>
  export default {
    props: ['number', 'hexa', 'extraClass']
  }
</script>

<style lang='scss' scoped>
  .icon__station {
    width: 20px;
    max-width: 20px;
    height: 20px;
    display: inline-block;
    line-height: 20px;
    border-radius: 100%;
    text-align: center;
    color: white;
  }
</style>
