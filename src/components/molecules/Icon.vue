<template>
  <span class="icn" :class="getIconClass"></span>
</template>

<script>
  export default {
    props: ['name', 'extraClass'],
    computed: {
      getIconClass () {
        return `icn__${this.name} ${this.extraClass}`
      }
    }
  }
</script>
