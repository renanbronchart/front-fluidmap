<template>
  <div id="app">
    <header class="header">
      <span>Vue.js PWA</span>
    </header>
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

export default {
  name: 'app',
  mounted () {
    this.getPlaces()
  },
  methods: {
    ...mapActions([
      'getPlaces'
    ])
  },
  components: {
    Modal
  }
}
</script>

<style lang='scss'>
@import '~stylesheets/helpers/_variables.scss';

body {
  margin: 0;
  background: $color-whisper;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  padding: 80px 0 0 0;
  min-height: calc(100vh);
}

.header {
  border-bottom: 1px solid $gray-lighter;
}

header {
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: $z-index-header;
  margin: 0;
  padding: 0 16px 0 24px;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
