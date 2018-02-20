<template>
  <div>
    <AsideMenu :urls='dataNav.urls'/>

    <section class="dashboard">
      <router-view :key="$route.fullPath"></router-view>
    </section>
  </div>
</template>

<script>
  import AsideMenu from '@/components/elements/dashboard/asideMenu'

  export default {
    data () {
      return {
        dataNav: {
          urls: [
            {
              name: 'profile',
              objectParams: {
                name: 'renan&bronchart'
              },
              iconName: 'person'
            },
            {
              name: 'presets',
              objectParams: {},
              iconName: 'map'
            },
            {
              name: 'preset',
              objectParams: {
                id: 0 // change en computed
              },
              iconName: 'layers'
            },
            {
              name: 'api',
              objectParams: {},
              label: 'API'
            }
          ]
        }
      }
    },
    components: {
      AsideMenu
    }
  }
</script>

<style lang='scss'>
  @import '~stylesheets/helpers/mixins/style.scss';
  @import '~stylesheets/helpers/_variables.scss';

  .dashboard {
    padding: 10px 0 102px 0;
    @include medium {
      padding: 10px 0 40px $width-aside-dashboard;
    }
  }
</style>
