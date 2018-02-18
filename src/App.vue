<template>
  <div id="app">
    <TheHeader
      title="JO Paris 2024"
      @clickAction="clickAction"
      @clickBrand="clickBrand"
    />
    <main>
      <router-view></router-view>
    </main>
    <Modal></Modal>
  </div>
</template>

<script>
import 'stylesheets/style.scss'
import { mapActions } from 'vuex'

import Modal from '@/components/elements/Modal.vue'
import TheHeader from '@/components/elements/header/TheHeader.vue'

export default {
  name: 'app',
  mounted () {
    this.getPlaces()
  },
  methods: {
    ...mapActions([
      'getPlaces'
    ]),
    clickAction () {
      this.$router.push({name: 'Home'})
    },
    clickBrand () {
      this.$router.push({name: 'Home'})
    }
  },
  components: {
    Modal,
    TheHeader
  }
}
</script>

<style lang='scss'>
@import '~stylesheets/helpers/_variables.scss';

body {
  margin: 0;
  background: $color-whisper;
}

main {
  padding: 80px 0 0 0;
  min-height: calc(100vh);
}
</style>
