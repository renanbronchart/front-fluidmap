<template>
  <span class="notification">{{count}}</span>
</template>

<script>
  export default {
    props: {
      count: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .notification {
    background: linear-gradient(to right, $color-cyan, $color-caribbean-green);
    border-radius: 100%;
    padding: 5px 10px;
  }
</style>
