<template>
  <div class="panel" :class="onBoardPanel ? 'panel--onboard' : ''">
    <div class="panel__heading" @click.prevent='toggle'>
      <h5 class="panel__title text--xs">Évenements dans cette période</h5>
      <i class="material-icons" v-if='!panelOpen'>arrow_drop_down</i>
      <i class="material-icons" v-else>arrow_drop_up</i>
    </div>
    <div class="panel__body" :class="panelOpen ? 'panel__body--active' : ''">
      <ul class="panel__container">
        <EventDescription
          v-for="event in events.eventsSchedules"
          :event="event"
          @clickEvent="clickEvent(event)"
          extraClass="event--timeline"/>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import EventDescription from '@/components/elements/events/EventDescription.vue'

  export default {
    data () {
      return {
        panelOpen: false
      }
    },
    computed: {
      ...mapState([
        'events',
        'planning'
      ]),
      onBoardPanel () {
        return parseFloat(this.$route.params.id) === 4
      }
    },
    mounted () {
      this.callGetEventsSchedules()
    },
    methods: {
      ...mapActions([
        'getEventsSchedules',
        'selectEvent'
      ]),
      callGetEventsSchedules () {
        const dates = [...this.planning.map.dates]

        this.getEventsSchedules(dates)
      },
      toggle () {
        this.panelOpen = !this.panelOpen
      },
      clickEvent (event) {
        this.selectEvent(event)
      }
    },
    components: {
      EventDescription
    }
  }
</script>

<style lang='scss' scoped>
  @import '~stylesheets/helpers/_variables.scss';

  .panel {
    width: 300px;
    position: absolute;
    bottom: 90px;
    left: 40px;
    border-radius: $border-radius-base $border-radius-base 0 0;
    background: white;
    z-index: $z-index-list-dropdown;

    &:before {
      content: ' ';
      height: 0px;
      transition: height .3s ease-in-out;
    }

    &.panel--onboard {
      .panel__body {
        height: 310px;
      }
    }
  }

  .panel__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 8px 20px;
  }

  .panel__title {
    margin: 0;
  }

  .panel__body {
    height: 0;
    max-height: calc(100vh - 200px);
    position: relative;
    overflow: hidden;
    transition: height .3s ease-in-out;
    &.panel__body--active {
      height: 310px;
    }
  }

  .panel__container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-top: 1px solid $dusty-gray;
    list-style: none;
    overflow: auto;
  }

  .event {
    position: relative;
    display: block;
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
  }

  .event__name {
    color: $color-caribbean-green;
    margin: 0 0 5px 0;
  }

  .event__link {
    position: relative;
    display: block;
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
</style>
