<template>
  <div class="sliders">
    <div class="sliders__all">
      <span class="slider__opener" @click.prevent="clickOpenSlider"></span>
      <div class="sliders__range" v-for="(slider, index) in getConfigSliders">
        <span class="sliders__rangeLabel text--secondary">{{slider.label}}</span>
        <div class="slider__labels p-r-md p-l-md">
          <p class="text--primary text--lg" :class="index === 0 ? 'text--primary' : 'text--info'">
            <span class="text--secondary">{{slider.label}}</span>
            {{slider.slider.value}}
          </p>
        </div>
        <div class="slider__content" :class='slider.ref'>
          <vue-slider @callback='onChange(slider.slider.value, slider.ref)' v-bind="slider.slider" v-model="slider.slider.value" :ref="slider.ref">
            <div class="tooltip__custom" slot="tooltip" slot-scope="{value}">
              <span class="text--lg">{{value}}</span>
            </div>
          </vue-slider>
        </div>
      </div>
    </div>
    <div class="slider__action">
      <div class="slider__labels">
        <p class="text--primary text--lg">{{getDayValue}}</p>
        <p class="text--info text--lg">{{getSchedulesValue}}</p>
      </div>
      <Button label="Accèder à l'analyse" @eventClick="showModalAnalyse" extraClass="button--primary"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import _ from 'lodash'
  import html2canvas from 'html2canvas'

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
        'getConfigSliders',
        'getDayValue',
        'getSchedulesValue'
      ])
    },
    methods: {
      ...mapActions([
        'setNewDate',
        'openModal',
        'deselectPlace',
        'deselectEvent',
        'setNewDataSlider',
        'addImageMap'
      ]),
      showModalAnalyse () {
        this.openModal({
          component: 'ModalBeforeAnalyse'
        }, 5000)

        document.querySelector('.leaflet-control-container').style.opacity = 0

        html2canvas(document.querySelector('#map__heat'), {
          useCORS: true
        }).then(canvas => {
          this.addImageMap(canvas.toDataURL('image/png'))
          document.querySelector('.leaflet-control-container').style.opacity = 1
        })
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
      }, 450),
      clickOpenSlider () {
        this.$emit('clickOpenSlider')
      }
    },
    components: {
      vueSlider,
      Button
    }
  }
</script>

<style lang='scss'>
  @import '~stylesheets/helpers/_variables.scss';
  @import '~stylesheets/helpers/mixins/style.scss';

  .map--active {
    .sliders {
      height: 250px;
    }
    @include medium {
      .sliders {
        height: 90px;
      }
    }

    .slider__action {
      justify-content: center;
      .slider__labels {
        display: none;
      }
    }
  }

  .sliders {
    width: 100%;
    height: 90px;
    position: fixed;
    bottom: 0;
    display: block;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-top: 1px solid $gray-lighter;
    transition: height .3s ease-in-out;

    @include medium {
      display: flex;
      flex-direction: row;
      padding: 0 20px;
    }
  }

  .sliders__rangeLabel {
    display: none;
    @include medium {
      display: inline-block;
    }
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

  .vue-slider-tooltip-bottom {
    opacity: 0;
    @include medium {
      opacity: 1;
    }
  }



  .slider__action {
    width: 100%;
    min-height: 90px;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background: white;
    z-index: $z-index-slider-action;
    padding: 20px;
    @include medium {
      width: auto;
      position: relative;
      align-items: center;
      min-height: none;
      padding: 0 20px;
    }
  }

  .slider__labels {
    @include medium {
      display: none;
    }
  }

  .sliders__all {
    width: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 0;
    @include medium {
      position: relative;
      flex-direction: row;
      transform: translateY(-10px);
      padding: 0;
    }

    .slider__opener {
      width: 100%;
      height: 30px;
      display: block;
      position: relative;
      z-index: $z-index-slider-opener;
      &:after {
        content: '';
        width: 36px;
        height: 4px;
        background: $color-blue-ribbon;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      @include medium {
        display: none;
      }
    }
  }


  .sliders__range {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 0 0;
    @include medium {
      display: flex;
      margin: 0;
    }
  }

  .slider__content {
    flex-grow: 2;
    padding: 0 30px;
    @include medium {
      padding: 0 60px;
    }
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
      width: 30px;
      height: 7px;
      border-radius: $border-radius-xs;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -15px;
    }

    @include medium {
      &:after {
        width: 60px;
        left: -30px;
      }
    }
  }

</style>
