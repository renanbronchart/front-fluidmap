<template>
  <div>
    <div class="map">
      <MapHome />
      <ListEvents />
      <RangeSlider />
      <SideBar />
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
  import MapHome from '@/components/d3-components/map'
  import RangeSlider from '@/components/d3-components/slider'
  import ListEvents from '@/components/elements/ListEvents.vue'
  import SideBar from '@/components/elements/SideBar.vue'

  export default {
    data () {
      return {}
    },
    components: {
      MapHome,
      RangeSlider,
      ListEvents,
      SideBar
    }
  }
</script>
