<template>
  <button class="button" :class="extraClass" @click="callback">
    <router-link :to="{name: linkName, params: linkParams}" :title="linkTitle" v-if='linkName'>
      {{label}}
    </router-link>
    <span v-else>
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
      linkName: {
        type: String
      },
      linkParams: {
        type: Object
      },
      linkTitle: {
        default: 'Lien vers une nouvelle étape'
      },
      extraClass: {
        type: String,
        default: ''
      },
      iconName: {
        type: String
      },
      click: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      callback () {
        this.click()
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
    padding: 10px 20px;
    white-space: nowrap;
    text-transform: uppercase;
    a, i {
      color: white;
    }
    &.button--block {
      display: block;
    }
    &.button--ghost {
      background-color: transparent;
      border: 1px solid $color-blue-ribbon;
      box-shadow: none;
      span, a, i {
        color: $color-blue-ribbon;
      }
    }
    .material-icons {
      font-size: 15px;
      margin: 0 0 0 10px;
    }
  }
</style>
