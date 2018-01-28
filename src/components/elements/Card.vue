<template>
  <div class="card">
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .card {
    border-radius: $border-radius-base;
    background-color: white;
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .card__header {
    color: $color-blue-ribbon;
    border-radius: $border-radius-base $border-radius-base 0 0;
    background-color: rgba($color-blue-ribbon, 0.06);
    padding: 10px 30px;
  }
</style>
