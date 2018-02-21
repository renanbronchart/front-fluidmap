<template>
  <div>
    <h3>Voulez-vous élargir votre tranche horaires ?</h3>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-lg-7 modal__block--left m-t-lg">
        <div class="modal__blockContent">
          <h5 class="m-b-sm">Oui</h5>
          <p class="text--lg text--secondary">Oui, je souhaite élargir la tranche horaire à analyser sur le lieu choisi. Dans ce cas, l’analyse ne se basera plus sur l’épreuve spécifique choisie.</p>
          <div class="slider--extend">
            <div class="slider__content" :class='slider.ref'>
              <vue-slider @callback='onChange(slider.slider.value)' v-bind="slider.slider" v-model="slider.slider.value" :ref="slider.ref">
                <div class="tooltip__custom" slot="tooltip" slot-scope="{value}">
                  <span>{{value}}</span>
                </div>
              </vue-slider>
            </div>
          </div>
          <Button
            label="Accéder à l'analyse"
            extraClass="button--ghost button--primary"
            @eventClick="setExtandedPreset"
          />
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-lg-5 modal__block--right">
        <div class="modal__blockContent">
          <h5 class="m-b-sm">Non</h5>
          <p class="text--lg text--secondary">Non, merci. Je souhaite accéder à l’analyse de la tranche horaire de 2h que j’ai déjà choisie.</p>
          <Button
            label="Accéder à l'analyse"
            extraClass="button--ghost button--primary m-t-xl"
            @eventClick="setNormalPreset"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import vueSlider from 'vue-slider-component'
  import slider from '../../../static/data/sliderExtend.js'

  import Button from '@/components/molecules/Button.vue'

  import html2canvas from 'html2canvas'

  import s3 from '@/utils/amazonBucket.js'

  export default {
    data () {
      return {
        slider,
        hoursValue: '',
        dayValue: ''
      }
    },
    computed: {
      ...mapState([
        'map',
        'planning'
      ]),
      ...mapGetters([
        'getDayValue',
        'getSchedulesValue',
        'getEventSelected',
        'getPlaceSelected',
        'isPlaceSelected',
        'isEventSelected'
      ]),
      getLinkParams () {
        return {id: 0} // regarder les presets de l'utilisateur courant, ou faire une requete de preset.
      }
    },
    mounted () {
      this.hoursValue = this.getSchedulesValue
      this.dayValue = this.getDayValue

      const arrayHoursValue = this.getSchedulesValue.split('-')

      this.slider.slider.value = [arrayHoursValue[0].trim(), arrayHoursValue[1].trim()]
    },
    methods: {
      ...mapActions([
        'closeModal',
        'setExpandedDate',
        'setNewEventPreset',
        'setNewPlacePreset'
      ]),
      getCanvasPreset (fileName) {
        document.querySelector('.leaflet-control-container').style.opacity = 0

        html2canvas(document.querySelector('#map__heat'), {
          useCORS: true
        }).then(canvas => {
          // canvas.toDataURL('image/png') // récupérer ça pour mettre dans vuex et afficher ensuite dans le preset

          const buf = new Buffer(canvas.toDataURL('image/png').replace(/^data:image\/\w+;base64,/, ''), 'base64')
          const photoKey = `preset_img/${fileName}.png`

          s3.upload({
            Key: photoKey,
            ContentType: 'image/png',
            Body: buf,
            ACL: 'public-read'
          }, (err, data) => {
            if (err) {
              return console.log('There was an error uploading your photo: ', err.message)
            }
          })
        })
      },
      setNormalPreset () {
        const dates = this.planning.map.dates

        if (this.isEventSelected) {
          const event = this.getEventSelected

          this.setNewEventPreset({
            event,
            dates
          })

          this.getCanvasPreset(event.name) // vérifier le nombre de presets et rajouter au name length + 1

          this.$router.push({name: 'newPreset'})
        } else if (this.map.placeSelected) {
          const place = this.getPlaceSelected

          this.setNewPlacePreset({
            place,
            dates
          })

          this.getCanvasPreset(place.name)

          this.$router.push({name: 'newPreset'})
        } else {
          this.$router.push({name: 'Home'})
        }

        this.closeModal()
      },
      setExtandedPreset () {
        if (this.isPlaceSelected) {
          const dates = this.planning.expanded.dates
          const place = this.getPlaceSelected

          this.setNewPlacePreset({
            place,
            dates
          })

          this.getCanvasPreset(place.name)

          this.$router.push({name: 'newPreset'})
        } else {

          this.$router.push({name: 'Home'})
        }


        this.closeModal()
      },
      onChange (value) {
        const newHours = `${value[0]} - ${value[1]}`

        this.hoursValue = newHours

        this.setExpandedDate({
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
  @import '~stylesheets/helpers/mixins/style.scss';

  .modal__block--left {
    position: relative;
    @include medium {
      .modal__blockContent {
        padding: 0 30px 0 0;
      }
      &:after {
        content: ' ';
        width: 1px;
        height: 170px;
        max-height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background: $gray-lighter;
      }
    }
  }

  .modal__block--right {
    margin: 50px 0 0 0;
    @include medium {
      margin: 30px 0 0 0;
      .modal__blockContent {
        padding: 0 0 0 30px;
      }
    }
  }

  .slider--extend {
    margin: 40px 0 50px 0;
    .vue-slider-tooltip-bottom {
      opacity: 1;
    }


    .slider-hour {
      color: white;
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
      padding: 0;
    }


    .slider__map .vue-slider {
      .vue-slider-dot {
        background: none;
        background-size: contain;
        box-shadow: none;
        border-radius: 0;
        position: absolute;
        &:after {
          content: '';
          width: 20px;
          height: 15px;
          border-radius: 3px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: -10px;
          left: auto;
        }
        .tooltip__custom {
          width: 72px;
          display: inline-block;
          text-align: center;
          white-space: nowrap;
        }
        & + .vue-slider-dot {
          &:after {
            left: -10px;
            right: auto;
          }
        }
      }
      @include medium {
        &:after {
          width: 30px;
          right: -15px;
        }

        & + .vue-slider-dot {
          &:after {
            left: -15px;
            right: auto;
          }
        }
      }
    }
  }

</style>
