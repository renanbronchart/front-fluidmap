<template>
  <button class="button">
    <template v-if="label">
      {{label}}
    </template>
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: ['label']
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .button {
    display: inline-block;
    color: white;
    background-color: $color-blue-ribbon;
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 10px 25px;
    text-transform: uppercase;
    &.button--block {
      display: block;
    }
  }
</style>
