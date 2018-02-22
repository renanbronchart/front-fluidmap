<template>
  <div class="loader">
    <svg class="circular">
      <circle class="path" cx="25" cy="25" r="10" fill="none" stroke-width="2" stroke-miterlimit="5"/>
    </svg>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';
  $width: 50px;

  .loader {
    position: relative;
    width: $width;
    height: $width;
  }

  .circular{
   animation: rotate 2s linear infinite;
   height: $width;
   position: relative;
   width: $width;
  }

  .path {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
    animation:
     dash 1.5s ease-in-out infinite,
     color 6s ease-in-out infinite
    ;
    stroke-linecap: round;
  }

  @keyframes rotate {
   100% {
    transform: rotate(360deg);
   }
  }
  @keyframes dash {
   0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
   }
   50% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -35;
   }
   100% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -124;
   }
  }
  @keyframes color {
    100%, 0% {
      stroke: $color-blue-ribbon;
    }
    40% {
      stroke: $color-malibu;
    }
    66% {
      stroke: $color-caribbean-green;
    }
    80%, 90% {
      stroke: $color-torch-red;
    }
  }
</style>
