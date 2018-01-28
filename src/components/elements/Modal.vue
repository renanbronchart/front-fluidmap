<template>
  <transition name="fade">
    <div class="modal" v-if="open">
      <div class="modal__content">
        <a href="#" @click.prevent="close" v-if="!noClose" class="modal__close">
          <i class="material-icons">close</i>
        </a>
        <div class="modal__body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: [
      'noClose',
      'open'
    ]
  }
</script>

<style lang="scss" scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .modal,
  .modal__background {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 15000;
  }

  .modal__content {
    width: 760px;
    min-height: 380px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: $border-radius-base;
    box-shadow: 0 26px 163px 0 rgba(0, 0, 0, 0.11);
    padding: 50px 60px;
    margin: 50px auto;
    &:after {
      content: ' ';
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba($color-mine-shaft, 0.3);
      z-index: -1;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
