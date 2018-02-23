<template>
  <div class="fm-index">
    <ul class="fm-index-list">
      <li v-for="index in 10" :class="indice >= index ? 'filled' : ''" >
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['indice'],
    data () {
      return {}
    }
  }
</script>

<style lang='scss'>
  .fm-index {
    width: 90px;
    height: 35px;
  }

  .fm-index ul li {
    width: 14px;
    height: 14px;
    border-radius:100%;
    background-color: #f5f5f5;
    float: left;
    list-style-type: none;
    margin: 0 4px 5px 0;
  }

  .fm-index ul li:nth-child(6) {
    clear: both;
  }

  .fm-index .filled {
    background-image: linear-gradient(to right, #2c5bfc, #42d5fc);
  }
</style>
