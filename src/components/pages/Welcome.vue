<template>
  <div class="welcomePage"></div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {}
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

<style lang="scss" scoped="true">
  .welcomePage {
    width: 100vw;
    height: 100vh;
  }

  .modal__button {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 50px 0 0 0;
  }
</style>
