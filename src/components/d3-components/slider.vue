<template>
  <div class="sliders">
    <div class="sliders__range" v-for="slider in sliders">
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
  import { mapActions } from 'vuex'
  import dates from '../../../static/data/timestamps.js'
  import sliders from '../../../static/data/slider.js'

  import vueSlider from 'vue-slider-component'
  import Button from '@/components/molecules/Button.vue'

  export default {
    data () {
      return {
        hoursValue: '',
        dayValue: '',
        sliders
      }
    },
    mounted () {
      this.convertdates(dates)
    },
    methods: {
      ...mapActions([
        'setNewDate',
        'openModal'
      ]),
      showModal () {
        this.openModal({
          component: 'ModalBeforeAnalyse'
        }, 5000)
      },
      convertdates (tabledates) {
        // faire avec lodash peut être ça va peut être optimisé la chose et faire moins de map
        const dates = tabledates
          .map((time) => {
            return this.$moment.unix(time).locale('fr').format('dddd Do MMMM')
          })
          .filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos
          })

        const hours = tabledates
          .map((time) => {
            const hour = this.$moment.unix(time).locale('fr').format('HH')
            const hourEnd = this.$moment.unix(time).add(2, 'h').locale('fr').format('HH')

            return `${hour}H - ${hourEnd}H`
          })
          .filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos
          })

        this.sliders[0].slider.data = dates
        this.sliders[1].slider.data = hours

        this.initDate(dates[0], hours[0])
      },
      initDate (date, hours) {
        this.dayValue = date
        this.hoursValue = hours

        this.setNewDate({
          date: this.dayValue,
          schedules: this.hoursValue
        })
      },
      onChange (value, name) {
        if (name === 'slider-date') {
          this.dayValue = value
        } else {
          this.hoursValue = value
        }

        this.setNewDate({
          date: this.dayValue,
          schedules: this.hoursValue
        })
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

  .sliders {
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background: white;
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
