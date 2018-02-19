<template>
  <div class="aside__stations" :class="extraClass">
    <div class="aside__container">
      <Card>
        <slot name="header">
          <div class="card__header">
            <p>{{title}}</p>
          </div>
        </slot>
        <slot></slot>
      </Card>
    </div>
  </div>
</template>

<script>
  import Card from '@/components/elements/Card.vue'

  export default {
    props: ['title', 'extraClass'],
    components: {
      Card
    }
  }
</script>

<style lang='scss'>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/style.scss';

  .aside__stations {
    height: 100%;
    position: relative;
    margin: 30px 0 0 0;
  }

  .aside__container {
    width: 100%;
    height: 100%;
    max-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
    padding: 0 16px;
    @include medium {
      padding: 0 120px 30px 60px;
    }
  }
</style>
