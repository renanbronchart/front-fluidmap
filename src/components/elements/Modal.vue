<template>
  <transition name="fade">
    <div class="modal" v-if="modal.open">
      <div class="modal__content">
        <a href="#" @click.prevent="closeModal" v-if="!modal.noClose" class="modal__close">
          <i class="material-icons">close</i>
        </a>
        <div class="modal__body">
          <component :is="getComponentModal"></component>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'

  export default {
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
    },
    mounted () {
      console.log('mounted modal.vue')
      console.log(this.modal, 'modal')
    }
  }
</script>

<style lang="scss" scoped>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/_media-queries.scss';

  .modal,
  .modal__background {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 15000;
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

  .modal__content {
    width: 90%;
    min-height: 380px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: $border-radius-base;
    box-shadow: 0 26px 163px 0 rgba(0, 0, 0, 0.11);
    z-index: 20000;
    padding: 50px 60px;
    margin: 50px auto;

    @include medium {
      width: 870px;
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
