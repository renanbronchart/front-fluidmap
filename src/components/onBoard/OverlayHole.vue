<template>
  <div class="overlay" :class="getClassOverlay"></div>
</template>

<script>
  export default {
    computed: {
      getClassOverlay () {
        const onBoardNumber = parseFloat(this.$route.params.id)

        switch (onBoardNumber) {
          case 1:
            return 'overlay--slider'

          case 2:
            return 'overlay--map'

          case 3:
            return 'overlay--aside'

          case 4:
            return 'overlay--list'

          case 5:
            return 'overlay--slider'

          default:
            return ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: 9500;
    &:after {
      content: ' ';
      opacity: 1;
      position: fixed;
    }

    &.overlay--slider {
      &:after {
        width: 100vw;
        height: 90px;
        bottom: 0;
        left: 0;
        box-shadow: 0 0 0 1000em rgba(black, .4);
        z-index: 9000;
      }
    }

    &.overlay--map {
      &:after {
        width: 250px;
        height: 250px;
        border-radius: 100%;
        bottom: 35vh;
        left: 35%;
        transform: translate(-50%, 50%);
        box-shadow: 0 0 0 1000em rgba(black, .4);
        z-index: 9000;
      }

      &:before {
        content: ' ';
        width: 7px;
        height: 7px;
        position: fixed;
        border: 5px solid black;
        border-radius: 100%;
        background: white;
        color: white;
        bottom: 40vh;
        left: 35%;
        transform: translate(7px, 30px);
        z-index: 9000;
      }
    }

    &.overlay--aside {
      &:after {
        width: 524px;
        height: calc(100vh - 170px);
        top: 80px;
        right: 0;
        box-shadow: 0 0 0 1000em rgba(black, .4);
        z-index: 150000;
      }
    }

    &.overlay--list {
      &:after {
        width: 300px;
        height: 350px;
        bottom: 90px;
        left: 40px;
        box-shadow: 0 0 0 1000em rgba(black, .4);
        z-index: 9000;
      }
    }
  }

</style>
