<template>
  <li class="event__info" :class="extraClass" @click.prevent="clickEvent">
    <div class="event__thumbnail m-r-md"> <!-- replacer par un component ImageThumbnail -->
      <!-- <img :src="getImageEvent(event.name)" alt="image de l'évènement"> -->
      <img src="http://lorempixel.com/400/400/" alt="image de l'évènement">
    </div>
    <div class="event__infos">
      <h5 class="event__name">{{event.name}}</h5>
      <p class="event__step text--secondary text--xs">{{event.step}}</p>
      <p class="event__place text--secondary text--xs">{{event.place_name}}</p>
    </div>
  </li>
</template>

<script>
  import parameterize from 'parameterize-string'

  export default {
    props: ['event', 'extraClass'],
    methods: {
      clickEvent () {
        this.$emit('clickEvent')
      },
      getImageEvent (name) {
        const imageName = parameterize(name)

        return `/static/${imageName}.jpg`// a terme faire association avec aws s3
      }
    }
  }
</script>

<style lang="scss">
  @import '~stylesheets/helpers/_variables.scss';

  .event__info {
    display: flex;
    align-items: top;
  }

  .event__thumbnail {
    width: 60px;
    max-width: 60px;
    height: 60px;
    max-height: 60px;
    overflow: hidden;
    border-radius: $border-radius-base;

    img {
      width: 100%;
      max-width: 100%;
      height: auto
    }
  }

</style>
