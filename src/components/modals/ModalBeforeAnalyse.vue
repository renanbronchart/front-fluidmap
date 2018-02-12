<template>
  <div>
    <h3>Bienvenue sur Fluidmap !</h3>
    <div class="row">
      <div class="col-xs-12 col-sm-7">
        <h4>Oui</h4>
        <p>Oui, je souhaite élargir la tranche horaire à analyser sur le lieu choisi. Dans ce cas, l’analyse ne se basera plus sur l’épreuve spécifique choisie.</p>
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
          linkName="preset"
          :linkParams="getLinkParams"
          linkTitle="Lien vers l'analyse"
          extraClass="button--ghost"
          @eventClick="closeModal"
        />
      </div>
      <div class="col-xs-12 col-sm-5">
        <h4>Non</h4>
        <p>Non, merci. Je souhaite accéder à l’analyse de la tranche horaire de 2h que j’ai déjà choisie.</p>
        <Button
          label="Accéder à l'analyse"
          linkName="preset"
          :linkParams="getLinkParams"
          linkTitle="Lien vers l'analyse"
          extraClass="button--ghost"
          @eventClick="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import vueSlider from 'vue-slider-component'
  import slider from '../../../static/data/sliderExtend.js'

  import Button from '@/components/molecules/Button.vue'

  export default {
    data () {
      return {
        slider,
        hoursValue: '',
        dayValue: ''
      }
    },
    computed: {
      ...mapGetters([
        'getDayValue',
        'getSchedulesValue'
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
        'setExpandedDate'
      ]),
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

<style lang="scss">
  @import '~stylesheets/helpers/_variables.scss';

  .slider--extend {
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
          width: 30px;
          height: 15px;
          border-radius: 3px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: -15px;
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
            left: -15px;
            right: auto;
          }
        }
      }
    }
  }

</style>
