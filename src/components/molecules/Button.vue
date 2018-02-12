<template>
  <button class="button" :class="extraClass" @click.prevent="eventClick">
    <router-link
      :to="{name: linkName, params: linkParams}"
      :title="linkTitle"
      class="button__link"
      v-if='linkName'
    >
    </router-link>
    <span>
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
      }
    },
    methods: {
      eventClick () {
        this.$emit('eventClick')
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .button {
    display: flex;
    align-items: center;
    position: relative;
    color: white;
    background-color: $color-blue-ribbon;
    border: 1px solid $color-blue-ribbon;
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    white-space: nowrap;
    text-transform: uppercase;
    padding: 10px 20px;
    a, i {
      color: white;
    }
    &.button--block {
      display: block;
    }
    &.button--ghost {
      background-color: transparent;
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

  .button__link {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
