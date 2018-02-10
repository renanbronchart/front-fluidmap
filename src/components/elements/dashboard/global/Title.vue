<template>
  <div>
    <h2>{{title}}</h2>
    <p class="text--secondary" v-if="subtitle">{{subtitle}}</p>
  </div>
</template>

<script>
  export default {
    props: ['title', 'subtitle']
  }
</script>
