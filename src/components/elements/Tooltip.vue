<template>
  <div class="tooltip" :class="extraClass">
    <Notifications :count='count' v-if="count > 0" extraClass="tooltip__notification text--bold"/>
    <p class="tooltip__content">{{text}}</p>
    <Button
      extraClass="button--ghost button--primary tooltip__button"
      iconName="arrow_forward"
      :label="labelButton"
      v-if="labelButton"
      :linkName="linkName"
      :linkParams="linkParams"
      :linkTitle="linkTitle"
    />
  </div>
</template>

<script>
  import Button from '@/components/molecules/Button.vue'
  import Notifications from '@/components/molecules/Notifications.vue'

  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      extraClass: {
        type: String,
        default: ''
      },
      count: {},
      labelButton: {
        type: String
      },
      linkName: {
        type: String
      },
      linkParams: {
        type: Object,
        default: {}
      },
      linkTitle: {
        default: 'Lien vers une nouvelle étape'
      }
    },
    components: {
      Button,
      Notifications
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/style.scss';

  .tooltip {
    display: flex;
    align-items: flex-start;
    position: absolute;
    border-radius: $border-radius-base;
    background: white;
    z-index: $z-index-tooltip;
    padding: 30px 20px;

    &:before {
      content:'';
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      left: 8px;
      top: 100%;
      border-top: 8px solid $color-caribbean-green;
      border-bottom: 8px solid transparent;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
    }

    &:after {
      content: '';
      width: 100%;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: linear-gradient(to left, $color-blue-ribbon, $color-caribbean-green);
    }

    &.tooltip--slider {
      bottom: 130px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.tooltip--sliderRight {
      right: 100px;
      bottom: 130px;
      &:before {
        top: 100%;
        left: auto;
        right: 8px;
        border-top: 8px solid $color-blue-ribbon;
        border-bottom: 8px solid transparent;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
      }
    }

    &.tooltip--left {
      &:before {
        right: 100%;
        left: auto;
        top: 50%;
        transform: translateY(-50%);
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid transparent;
        border-right: 8px solid white;
      }
    }

    &.tooltip--right {
      &:before {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid transparent;
        border-left: 8px solid white;
      }
    }

    &.tooltip--map {
      bottom: 40vh;
      left: 35%;
    }

    &.tooltip--aside {
      top: 50%;
      right: 550px;
      transform: translateY(-50%);
    }

    &.tooltip--list {
      bottom: 120px;
      left: 400px;
      &:before {
        right: 100%;
        left: auto;
        top: 50%;
        transform: translateY(-50%);
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid transparent;
        border-right: 8px solid white;
      }
      @include xlargeHeight {
        bottom: 480px;
        left: 150px;
        &:before {
          right: auto;
          left: 8px;
          top: 100%;
          transform: translateY(0);
          border-top: 8px solid $color-caribbean-green;
          border-bottom: 8px solid transparent;
          border-right: 8px solid transparent;
          border-left: 8px solid transparent;
        }
      }
    }
  }


  .tooltip__notification {
    margin: 0 15px 0 0;
  }

  .tooltip__button {
    margin: 0 0 0 30px;
  }

  .tooltip__content {
    max-width: 275px;
    color: $dusty-gray;
  }
</style>
