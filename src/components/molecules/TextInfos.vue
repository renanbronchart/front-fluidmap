<template>
  <div class="information" :class="extraClass" @click.prevent="eventClick">
    <i class="material-icons information__icon m-r-sm" v-if="alignIcon === 'left'">{{iconName}}</i>
    <p class="text-sm">{{content}}</p>
    <i class="material-icons information__icon m-l-sm" v-if="alignIcon === 'right'">{{iconName}}</i>
  </div>
</template>

<script>
  export default {
    props: {
      content: {
        type: String
      },
      iconName: {
        type: String
      },
      extraClass: {
        type: String
      },
      alignIcon: {
        type: String,
        default: 'left'
      }
    },
    methods: {
      eventClick () {
        this.$emit('eventClick')
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .information {
    display: flex;
    align-items: center;
  }

  .information--right {
    justify-content: flex-end;
  }

  .information__primary {
    .information__icon {
      color: $color-caribbean-green;
    }
  }
</style>
