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
    <Button label="Accèder à l'analyse" />
  </div>
</template>

<script>
  // import { mapActions } from 'vuex'
  import timestamps from '../../../static/data/timestamps.js'

  import vueSlider from 'vue-slider-component'
  import Button from '@/components/molecules/Button.vue'

  export default {
    data () {
      return {
        hoursValue: '',
        dayValue: '',
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
    mounted () {
      this.convertTimestamps(timestamps)
    },
    computed: {
      getTimestamp () {
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

        let hoursTrim = this.hoursValue.trim()
        let hourStartAt = hoursTrim.replace(/^(\d{2})H - (\d{2})H$/g, '$1:00')
        let hourEndAt = hoursTrim.replace(/^(\d{2})H - (\d{2})H$/g, '$2:00')

        let dayTrim = this.dayValue.trim()
        let newValueDate = dayTrim.replace(/^[a-z]+ (\d{0,2}) ([a-zû]+)$/i, `$1-$2-2018`)
        let arrayValue = newValueDate.split('-')
        let newValueDay = `${arrayValue[0]}-${dateHash[arrayValue[1]]}-${arrayValue[2]}`

        let startDate = `${newValueDay} ${hourStartAt}`
        let endDate = `${newValueDay} ${hourEndAt}`

        startDate = this.$moment(startDate, 'DD-MM-YYYY HH:mm').locale('fr').unix()
        endDate = this.$moment(endDate, 'DD-MM-YYYY HH:mm').locale('fr').unix()

        return {
          startDate,
          endDate
        }
      }
    },
    methods: {
      convertTimestamps (tableTimestamps) {
        // faire avec lodash peut être ça va peut être optimisé la chose et faire moins de map
        const dates = tableTimestamps
          .map((time) => {
            return this.$moment.unix(time).locale('fr').format('dddd Do MMMM')
          })
          .filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos
          })

        const hours = tableTimestamps
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

        console.log(this.getTimestamp) // remplacer : lancer appel API depuis une action du store
      },
      onChange (value, name) {
        if (name === 'slider-date') {
          this.dayValue = value
        } else {
          this.hoursValue = value
        }

        // faire peut être un debounce de lodash pour pas faire un appel API chaque fois qu'on bouge le curseur.
        console.log(this.getTimestamp) // remplacer : lancer appel API depuis une action du store
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
