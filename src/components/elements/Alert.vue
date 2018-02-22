<template>
  <div class="alert" :class="alert.active ? 'alert--active' : ''">
    <slot>
      <i class="material-icons m-r-md" v-if="alert.iconName">{{alert.iconName}}</i>
      <Loader v-else />
      <span class="alert__content">{{alert.content}}</span>
    </slot>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Loader from '@/components/molecules/Loader.vue'

  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapState([
        'alert'
      ])
    },
    components: {
      Loader
    }
  }
</script>

<style lang='scss'>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/_media-queries.scss';

  .alert {
    width: auto;
    max-width: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    bottom: calc(100% - 80px);
    left: 50%;
    transition: transform .3s ease-in-out;
    border-radius: $border-radius-base;
    background-color: white;
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.1);
    transform: translate(-50%, 0);
    padding: 16px 32px;
    @include medium {
      max-width: 90%;
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
    &.alert--active {
      transform: translate(-50%, 120%);
    }
  }

</style>
