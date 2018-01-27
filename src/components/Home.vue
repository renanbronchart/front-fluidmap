<template>
  <div>
    <div class="map">
      <MapHome />
      <ListEvents />
      <RangeSlider />
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
  import MapHome from '@/components/d3-components/map'
  import RangeSlider from '@/components/d3-components/slider'
  import ListEvents from '@/components/elements/ListEvents.vue'

  export default {
    data () {
      return {}
    },
    components: {
      MapHome,
      RangeSlider,
      ListEvents
    }
  }
</script>
