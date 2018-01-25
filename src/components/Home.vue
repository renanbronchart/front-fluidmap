<template>
  <div>
    <div class="map">
      <MapHome />
      <RangeSlider />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import MapHome from '@/components/d3-components/map'
  import RangeSlider from '@/components/d3-components/slider'

  export default {
    data () {
      return {}
    },
    components: {
      MapHome,
      RangeSlider
    }
  }
</script>
