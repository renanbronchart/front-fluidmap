<template>
  <div class="sliders">
    <div class="sliders__range" v-for="slider in getConfigSliders">
      <span>{{slider.label}}</span>
      <div class="slider__content" :class='slider.ref'>
        <vue-slider @callback='onChange(slider.slider.value, slider.ref)' v-bind="slider.slider" v-model="slider.slider.value" :ref="slider.ref">
          <div class="tooltip__custom" slot="tooltip" slot-scope="{value}">
            <span>{{value}}</span>
          </div>
        </vue-slider>
      </div>
    </div>
    <Button label="Accèder à l'analyse" @eventClick="showModal" extraClass="button--primary"/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import _ from 'lodash'

  import vueSlider from 'vue-slider-component'
  import Button from '@/components/molecules/Button.vue'

  export default {
    data () {
      return {
        dayValue: '',
        hoursValue: ''
      }
    },
    created () {
      this.initSlider()
      this.initDates(this.getAllDays[0], this.getAllSchedules[0])
    },
    computed: {
      ...mapGetters([
        'getAllTimestamps',
        'getAllDays',
        'getAllSchedules',
        'getConfigSliders'
      ])
    },
    methods: {
      ...mapActions([
        'setNewDate',
        'openModal',
        'deselectPlace',
        'deselectEvent',
        'setNewDataSlider'
      ]),
      showModal () {
        this.openModal({
          component: 'ModalBeforeAnalyse'
        }, 5000)
      },
      initSlider () {
        const allDataDays = [...this.getAllDays]
        const allDataSchedules = [...this.getAllSchedules]

        this.setNewDataSlider({
          refSlider: 'slider-date',
          data: allDataDays
        })

        this.setNewDataSlider({
          refSlider: 'slider-hour',
          data: allDataSchedules
        })
      },
      initDates (date, hours) {
        this.dayValue = date
        this.hoursValue = hours

        this.setNewDate({
          date: this.dayValue,
          schedules: this.hoursValue
        })
      },
      onChange: _.debounce(function (value, name) {
        if (name === 'slider-date') {
          this.dayValue = value
        } else {
          this.hoursValue = value
        }

        this.deselectPlace()
        this.deselectEvent()
        this.setNewDate({
          date: this.dayValue,
          schedules: this.hoursValue
        })
      }, 450)
    },
    components: {
      vueSlider,
      Button
    }
  }
</script>

<style lang='scss'>
  @import '~stylesheets/helpers/_variables.scss';

  .sliders {
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background: white;
    border-top: 1px solid $gray-lighter;
    padding: 0 20px;
  }

  .slider-date {
    .tooltip__custom {
      color: $color-blue-ribbon;
    }

    .slider__map .vue-slider .vue-slider-dot {
      &:after {
        background: $color-blue-ribbon;
      }
    }
  }

  .slider-hour {
    .tooltip__custom {
      color: $color-caribbean-green;
    }

    .slider__map .vue-slider .vue-slider-dot {
      &:after {
        background: $color-caribbean-green;
      }
    }
  }

  .sliders__range {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .slider__content {
    flex-grow: 2;
    padding: 0 60px;
  }

  .tooltip__custom {
    white-space: nowrap;
  }

  .slider__map .vue-slider .vue-slider-dot {
    background: none;
    background-size: contain;
    box-shadow: none;
    border-radius: 0;
    position: relative;
    &:after {
      content: '';
      width: 60px;
      height: 15px;
      border-radius: 3px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -30px;
    }
  }

</style>
