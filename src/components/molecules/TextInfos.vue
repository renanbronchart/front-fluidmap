<template>
  <div class="information" :class="extraClass">
    <i class="material-icons information__icon">{{iconName}}</i>
    <p class="text-sm">{{content}}</p>
  </div>
</template>

<script>
  export default {
    props: [
      'content',
      'iconName',
      'extraClass'
    ]
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .information {
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
  }

  .information__primary {
    .information__icon {
      color: $color-caribbean-green;
    }
  }

  .information__icon {
    margin: 0 8px 0 0;
  }
</style>
