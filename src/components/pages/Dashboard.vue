<template>
  <div>
    <aside class="navAside">navabar</aside>

    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>
