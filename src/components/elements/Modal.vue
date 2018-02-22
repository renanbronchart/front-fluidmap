<template>
  <transition name="fade">
    <div class="modal" v-if="modal.open || modalStaticOpen" :class="extraClass">
      <div class="modal__content">
        <a href="#" @click.prevent="closeModal" v-if="!modal.noClose && !noClose" class="modal__close">
          <i class="material-icons">close</i>
        </a>
        <div class="modal__body">
          <div class="modal__bodyContainer">
            <slot>
              <component :is="getComponentModal"></component>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'

  export default {
    props: {
      modalStaticOpen: {
        default: false
      },
      noClose: {
        default: false
      },
      extraClass: {
        default: ''
      }
    },
    data () {
      return {
        component: null
      }
    },
    computed: {
      ...mapState([
        'modal'
      ]),
      getComponentModal () {
        const componentName = this.modal.component

        if (!componentName) return

        Vue.component(componentName, () => import(`@/components/modals/${componentName}`))

        return this.modal.component
      }
    },
    methods: {
      ...mapActions([
        'closeModal'
      ])
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/_media-queries.scss';

  .modal,
  .modal__background {
    width: 100vw;
    height: 100vh;
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    z-index: 15000;
    &:after {
      content: ' ';
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      background: rgba($color-mine-shaft, 0.3);
      z-index: -1;
    }

    &.modal--light {
      &:after {
        background: rgba($color-mine-shaft, 0.1);
      }
    }
  }

  .modal {
    display: flex;
  }

  .modal__content {
    width: 90%;
    /*min-height: 380px;*/
    display: block;
    position: relative;
    display: block;
    background: white;
    border-radius: $border-radius-base;
    box-shadow: 0 26px 163px 0 rgba(0, 0, 0, 0.11);
    z-index: 20000;
    margin: 50px auto;
    padding: 0;

    &:after {
      content: '';
      width: 100%;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: linear-gradient(to left, $color-blue-ribbon, $color-caribbean-green);
    }

    @include medium {
      width: 870px;
    }

    &.modal__content--xs {
      @include medium {
        width: 760px;
      }
    }
  }

  .modal__body {
    max-width: 100%;
    max-height: 90vh;
    overflow: auto;
    display: flex;
    padding: 50px 24px;
    .modal__bodyContainer {
      margin: auto;
    }
    @include medium {
      padding: 50px 60px;
    }
  }

  .modal__close {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
