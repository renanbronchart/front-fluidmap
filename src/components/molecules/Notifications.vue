<template>
  <span class="notification" :class="extraClass">{{count}}</span>
</template>

<script>
  export default {
    props: {
      count: {
        type: String,
        default: '0'
      },
      extraClass: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .notification {
    color: $color-mine-shaft;
    background: linear-gradient(to right, $color-cyan, $color-caribbean-green);
    border-radius: 100%;
    padding: 6px 10px;
  }
</style>
