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

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/style.scss';

  .navAside__link {
    position: relative;
    display: block;
    text-align: center;
    padding: 16px 32px;
    @include medium {
      padding: 30px;
    }
  }

  .router-link-active {
    &:after {
      content: ' ';
      height: 2px;
      width: 40px;
      position: absolute;
      top: 0;
      right: 50%;
      transform: translate(50%, 0);
      background: $color-blue-ribbon;
    }
    @include medium {
      &:after {
        width: 2px;
        height: 40px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
      }
    }

    .link__content {
      background: linear-gradient(to left, $color-blue-ribbon, $color-malibu);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
