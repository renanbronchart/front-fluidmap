<template>
  <div>
    <p>{{countLocal}}</p>
    <p>{{countTourist}}</p>
  </div>
</template>

<script>
  export default {
    props: [
      'countLocal',
      'countTourist'
    ]
  }
</script>
