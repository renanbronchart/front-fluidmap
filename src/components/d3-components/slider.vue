<template>
  <div>
    <vue-slider @callback='onChange' v-bind="slider" v-model="slider.value" ref="slider"></vue-slider>
    <Button label="Accèder à l'analyse" />
  </div>
</template>

<script>
  import vueSlider from 'vue-slider-component'
  import Button from '@/components/molecules/Button.vue'

  export default {
    data () {
      return {
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
            '22H - 00H'
          ],
          piecewiseStyle: {
            'width': '14px',
            'height': '14px',
            'backgroundColor': '#ccc',
            'visibility': 'visible'
          },
          piecewiseActiveStyle: {
            'backgroundColor': '#3498db'
          },
          labelActiveStyle: {
            'color': '#3498db'
          },
          labelStyle: {
            'margin': '20px 0 0 0'
          },
          piecewise: true,
          piecewiseLabel: true,
          height: 8,
          class: 'slider__map',
          dotHeight: 50,
          dotWidth: 15,
          eventType: 'auto',
          realTime: false,
          tooltip: false,
          clickable: true,
          tooltipDir: 'top',
          lazy: false,
          reverse: false,
          speed: 0.3
        }
      }
    },
    methods: {
      onChange (value) {
        let valueTrim = value.trim()
        let newValue = valueTrim.replace(/(\d{2})H - (\d{2})H/g, '$1$2')

        console.log(newValue)
      }
    },
    components: {
      vueSlider,
      Button
    }
  }
</script>

<style lang='scss'>
  .slider__map .vue-slider .vue-slider-dot {
  background: none;
  background-size: contain;
  box-shadow: none;
  border-radius: 0;
  position: relative;
  &:after {
    content: '';
    width: 15px;
    height: 50px;
    background: #3498db;
    position: absolute;
    top: 0;
    left: 0;
  }
}

</style>
