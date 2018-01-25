<template>
  <button class="button" :class="extraClass">
    <span v-if="label">
      {{label}}
    </span>
    <i class="material-icons" v-if='iconName'>{{iconName}}</i>
  </button>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: 'Button'
      },
      extraClass: {
        type: String,
        default: ''
      },
      iconName: {
        type: String
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .button {
    display: flex;
    align-items: center;
    color: white;
    background-color: $color-blue-ribbon;
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 10px 25px;
    white-space: nowrap;
    text-transform: uppercase;
    &.button--block {
      display: block;
    }
    &.button--ghost {
      background-color: transparent;
      color: $color-blue-ribbon;
      border: 1px solid $color-blue-ribbon;
      box-shadow: none;
    }
    .material-icons {
      font-size: 15px;
      margin: 0 0 0 10px;
    }
  }
</style>
