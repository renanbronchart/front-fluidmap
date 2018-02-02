<template>
  <li class="event" :class="extraClass">
    <a href="" class="event__link" >
      <h4 class="event__name p">{{event.name}}</h4>
      <p class="event__step text--xs">{{event.step}}</p>
      <p class="event__hour text--xs">{{event.hour}}</p>
      <p class="event__place text--xs">{{event.place}}</p>
    </a>
  </li>
</template>

<script>
  export default {
    props: ['event', 'extraClass']
  }
</script>

<style lang="scss">
  @import '~stylesheets/helpers/_variables.scss';

  .event {
    position: relative;
    display: block;
    .event__link {
      position: relative;
      display: block;
    }
  }

  .event--block {
    border-style: solid;
    border-width: 1px;
    border-image-source: linear-gradient(to left, $color-blue-ribbon, $color-caribbean-green);
    border-image-slice: 1;
    .event__link {
      padding: 20px;
    }
    & + .event--block {
      margin: 20px 0 0 0;
    }
  }

  .event--timeline {
    &:after {
      content: ' ';
      width: 1px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 19px;
      background: $color-blue-ribbon;
    }

    &:first-child {
      margin: 25px 0 0 0;
      &:after {
        top: 25px;
      }
    }

    &:last-child {
      &:after {
        height: 25px;
      }
    }

    .event__link {
      padding: 15px 40px;
      &:before {
        content: ' ';
        width: 7px;
        height: 7px;
        position: absolute;
        top: 20px;
        left: 15px;
        border: 1px solid $color-blue-ribbon;
        border-radius: 100px;
        background: white;
        z-index: 2;
      }

      &:after {
        content: ' ';
        width: 10px;
        height: 19px;
        position: absolute;
        top: 15px;
        left: 14px;
        background: white;
        z-index: 1;
      }
    }
  }

  .event__name {
    color: $color-caribbean-green;
    margin: 0 0 5px 0;
  }
</style>
