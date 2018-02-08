<template>
  <aside class="navAside">
    <ul class="navAside__list">
      <LinkNav
        v-for='url in urls'
        :url='url'
      />
    </ul>
  </aside>
</template>

<script>
  import LinkNav from '@/components/elements/dashboard/asideMenu/LinkNav.vue'

  export default {
    props: ['urls'],
    components: {
      LinkNav
    }
  }
</script>

<style lang="scss" scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .navAside {
    width: $width-aside-dashboard;
    position: fixed;
    top: $height-header-nav;
    bottom: 0;
    background: white;
  }
</style>
