<template>
  <div class="welcomePage" :style="{ backgroundImage: 'url(' + getBackground + ')' }"></div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      getBackground () {
        return 'https://s3.eu-west-2.amazonaws.com/fluidmap/preset_img/7.png'
      }
    },
    mounted () {
      this.openModal({
        component: 'ModalWelcome',
        noClose: true
      }, 5000)
    },
    methods: {
      ...mapActions([
        'openModal'
      ])
    }
  }
</script>

<style lang='scss'>
  .welcomePage {
    width: 100vw;
    height: calc(100vh - 80px);
    background-size: cover;
    background-position: center;
  }

  .modal__button {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 50px 0 0 0;
  }
</style>
