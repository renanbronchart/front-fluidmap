<template>
  <li class="event" :class="extraClass">
    <a href="#" class="event__link" @click.prevent="clickEvent" >
      <Icon :name="getIconEvent" extraClass="icn--xxs event__icon m-r-sm" v-if="!iconHide" />
      <div class="event__content">
        <h5 class="event__name m-b-xs">{{event.name}}</h5>
        <p class="event__step text--sm text--secondary m-t-xs">{{event.step_name}}</p>
        <p class="event__hour text--sm text--secondary m-t-xs">{{getStartEvent}}</p>
        <p class="event__place text--sm text--secondary m-t-xs">{{event.place_name}}</p>
      </div>
    </a>
  </li>
</template>

<script>
  import parameterize from 'parameterize-string'
  import manipulateDate from '@/utils/manipulateDate.js'

  import arrayIconSport from '@/utils/arrayIconSport.js'

  import Icon from '@/components/molecules/Icon.vue'

  export default {
    props: ['event', 'extraClass', 'iconHide'],
    methods: {
      clickEvent () {
        this.$emit('clickEvent')
      }
    },
    computed: {
      getIconEvent () {
        const nameParametrize = parameterize(this.event.name)
        const iconsName = [...arrayIconSport]

        const iconName = iconsName.find((icon) => {
          return nameParametrize.indexOf(icon) >= 0
        })

        return iconName
      },
      getStartEvent () {
        return `${manipulateDate.getHourDisplay(this.event.dates[0])}H00`
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang='scss'>
  @import '~stylesheets/helpers/_variables.scss';

  .event {
    position: relative;
    display: block;
    .event__link {
      position: relative;
      display: flex;
      align-items: top;
    }

    .event__icon {
      background: linear-gradient(to right, $color-torch-red, $color-hollywood-cerise);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
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
      background: $color-caribbean-green;

    }

    &:first-child {
      margin: 25px 0 0 0;
      &:after {
        top: 25px;
        background: $color-blue-ribbon;
      }
    }

    &:nth-child(2) {
      &:after {
        background: linear-gradient(to bottom, $color-blue-ribbon, $color-caribbean-green);
      }
    }

    &:first-child,
    &:nth-child(2) {
      .event__link {
        &:before {
          content: ' ';
          border: 1px solid $color-blue-ribbon;
        }
      }
    }

    &:last-child {
      &:after {
        height: 25px;
      }
    }

    &.event--alone {
      &:after {
        content: normal;
      }
    }

    .event__link {
      padding: 15px 20px 15px 40px;
      &:before {
        content: ' ';
        width: 7px;
        height: 7px;
        position: absolute;
        top: 17px;
        left: 15px;
        border: 1px solid $color-caribbean-green;
        border-radius: 100px;
        background: white;
        z-index: 2;
      }

      &:after {
        content: ' ';
        width: 10px;
        height: 19px;
        position: absolute;
        top: 12px;
        left: 14px;
        background: white;
        z-index: 1;
      }
    }
  }
</style>
