<template>
  <header class="header">
    <div class="header__brand cursor--pointer" @click.prevent="clickBrand">
      <div class="header__brandChild header__containerImage">
        <img :src="getUrlLogo" alt="logo fluidmap" >
      </div>
      <p class="header__brandChild text--secondary">{{title}}</p>
    </div>
    <div class="header__action">
      <a href="#" title="connection" @click.prevent="clickAction" class="text--sm text--secondary text--normal">Connexion</a>
    </div>
  </header>
</template>

<script>
  export default {
    props: ['title'],
    computed: {
      getUrlLogo () {
        return `${process.env.AMAZON_STATIC_URL}logo/logo-header.png`
      }
    },
    methods: {
      clickAction () {
        this.$emit('clickAction')
      },
      clickBrand () {
        this.$emit('clickBrand')
      }
    }
  }
</script>

<style lang='scss'>
  @import '~stylesheets/helpers/_variables.scss';

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $gray-lighter;
    width: 100%;
    height: 80px;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    z-index: $z-index-header;
    margin: 0;
    padding: 0 20px;
  }

  .header__brand {
    height: 100%;
    max-height: 100%;
    display: inline-flex;
    align-items: center;
  }

  .header__brandChild {
    padding: 10px 15px;
    & + .header__brandChild {
      flex-shrink: 0;
      border-left: 1px solid $gray-lighter;
    }
  }

  .header__containerImage {
    height: 60px;
    max-height: 100%;
    max-width: 150px;
    display: flex;
    align-items: center;
    img {
      max-height:100%;
      max-width: 100%;
    }
  }

  .header__action {
    padding: 20px;
  }
</style>
