<template>
  <li class="navAsideElement">
    <router-link :to="{ name: url.name, params: url.objectParams}" class="navAside__link" exact-active-class>
      <i class="material-icons link__content" v-if="url.iconName">{{url.iconName}}</i>
      <span v-if="url.label" class="link__content">{{url.label}}</span>
    </router-link>
  </li>
</template>

<script>
  export default {
    props: ['url']
  }
</script>

<style lang="scss" scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .navAside__link {
    position: relative;
    display: block;
    text-align: center;
    padding: 30px 0;
  }

  .router-link-active {
    &:after {
      content: ' ';
      width: 2px;
      height: 40px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      background: $color-blue-ribbon;
    }

    .link__content {
      background: linear-gradient(to left, $color-blue-ribbon, $color-malibu);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
