<template>
  <div>
    <div class="map" :class="getExtraClass">
      <MapHome />
      <ListEvents
        @openEventsList="removeActiveMap"
      />
      <RangeSlider
        @clickOpenSlider="toggleActiveMap"
      />
      <SideBar />
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
  import MapHome from '@/components/d3-components/map'
  import RangeSlider from '@/components/d3-components/slider'
  import ListEvents from '@/components/elements/events/ListEvents.vue'
  import SideBar from '@/components/elements/aside/SideBar.vue'

  export default {
    data () {
      return {
        mapActive: false
      }
    },
    computed: {
      getExtraClass () {
        return this.mapActive ? 'map--active' : ''
      }
    },
    methods: {
      toggleActiveMap () {
        this.mapActive = !this.mapActive
      },
      removeActiveMap () {
        this.mapActive = false
      }
    },
    components: {
      MapHome,
      RangeSlider,
      ListEvents,
      SideBar
    }
  }
</script>
