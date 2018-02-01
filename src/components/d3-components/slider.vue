<template>
  <div class="sliders">
    <div class="sliders__range" v-for="slider in sliders">
      <span>{{slider.label}}</span>
      <div class="slider__content" :class='slider.ref'>
        <vue-slider @callback='onChange' v-bind="slider.slider" v-model="slider.slider.value" :ref="slider.ref">
          <div class="tooltip__custom" slot="tooltip" slot-scope="{value}">
            <span>{{value}}</span>
          </div>
        </vue-slider>
      </div>
    </div>
    <Button label="Accèder à l'analyse" />
<!--     <Tooltip
      text='salut'
      count='1'
      labelButton="Suivant"
    /> -->
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  import vueSlider from 'vue-slider-component'
  import Button from '@/components/molecules/Button.vue'

  export default {
    data () {
      return {
        valueDate: '',
        valueHour: '',
        sliders: [
          {
            ref: 'slider-date',
            label: 'Jour :',
            slider: {
              value: 0,
              data: [
                'Vandredi 2 août',
                'Samedi 3 août',
                'Dimanche 4 août',
                'Lundi 5 août',
                'Mardi 6 août',
                'Mercredi 7 août',
                'Jeudi 8 août',
                'Vandredi 9 août',
                'Vandredi 10 août',
                'Lundi 5 août',
                'Mardi 6 août',
                'Mercredi 7 août',
                'Jeudi 8 août',
                'Vandredi 9 août',
                'Vandredi 10 août',
                'Vandredi 11 août',
                'Vandredi 12 août',
                'Vandredi 13 août',
                'Vandredi 2 août',
                'Vandredi 2 août'
              ],
              min: 2,
              bgStyle: {
                'background-color': 'rgba(44, 91, 252, 0.3)'
              },
              piecewiseStyle: {
                'width': '3px',
                'height': '4px',
                'backgroundColor': 'white',
                'visibility': 'visible'
              },
              piecewiseActiveStyle: {
                'backgroundColor': 'white'
              },
              processStyle: {
                'background-color': 'rgba(44, 91, 252, 0.5)'
              },
              labelActiveStyle: {
                'color': '#2C5BFC'
              },
              labelStyle: {
                'margin': '20px 0 0 0'
              },
              piecewise: true,
              height: 3,
              class: 'slider__map',
              dotHeight: 20,
              dotWidth: 1,
              eventType: 'auto',
              realTime: false,
              tooltip: 'always',
              clickable: true,
              tooltipDir: 'bottom',
              lazy: false,
              reverse: false,
              speed: 0.3
            }
          },
          {
            ref: 'slider-hour',
            label: 'Tranche horaire :',
            slider: {
              value: 0,
              data: [
                '06H - 08H',
                '08H - 10H',
                '10H - 12H',
                '12H - 14H',
                '14H - 16H',
                '16H - 18H',
                '18H - 20H',
                '20H - 22H',
                '12H - 14H',
                '14H - 16H',
                '16H - 18H',
                '18H - 20H',
                '20H - 22H',
                '22H - 00H'
              ],
              min: 2,
              bgStyle: {
                'background-color': 'rgba(1, 237, 162, 0.3)'
              },
              piecewiseStyle: {
                'width': '3px',
                'height': '4px',
                'backgroundColor': 'white',
                'visibility': 'visible'
              },
              piecewiseActiveStyle: {
                'backgroundColor': 'white'
              },
              processStyle: {
                'background-color': 'rgba(1, 237, 162, 0.3)'
              },
              labelActiveStyle: {
                'color': '#2C5BFC'
              },
              labelStyle: {
                'margin': '20px 0 0 0'
              },
              piecewise: true,
              height: 3,
              class: 'slider__map',
              dotHeight: 20,
              dotWidth: 1,
              eventType: 'auto',
              realTime: false,
              tooltip: 'always',
              clickable: true,
              tooltipDir: 'bottom',
              lazy: false,
              reverse: false,
              speed: 0.3
            }
          }
        ]
      }
    },
    methods: {
      ...mapActions([
        'selectPlace'
      ]),
      onChange (value) {
        this.selectPlace()

        const dateHash = {
          janvier: '01',
          fevrier: '02',
          mars: '03',
          avril: '04',
          mai: '05',
          juin: '06',
          juillet: '07',
          août: '08',
          septembre: '09',
          octobre: '10',
          novembre: '11',
          decembre: '12'
        }

        let valueTrim = value.trim()
        let newValueHour = valueTrim.replace(/^(\d{2})H - (\d{2})H$/g, '$1$2')
        let newValueDate = newValueHour.replace(/^[a-z]+ (\d{0,2}) ([a-zû]+)$/i, `$1/$2`)

        if (newValueDate.includes('/')) {
          const arrayValue = newValueDate.split('/')
          const dayNumber = (parseFloat(arrayValue[0]) < 10 ? '0' : '') + arrayValue[0]

          newValueDate = `${dayNumber}/${dateHash[arrayValue[1]]}`

          this.valueDate = newValueDate

          return
        }

        this.valueHour = newValueDate
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
