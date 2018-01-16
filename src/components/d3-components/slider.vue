<template>
  <vue-slider @callback='onChange' v-bind="slider" v-model="slider.value" ref="slider"></vue-slider>
</template>

<script>
  import vueSlider from 'vue-slider-component'

  export default {
    data () {
      return {
        slider: {
          value: 0,
          data: [
            '06-08',
            '08-10',
            '10-12',
            '12-14',
            '14-16',
            '16-18',
            '18-20',
            '20-22',
            '22-00'
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
      onChange (e) {
        console.log(e, 'e')
      }
    },
    components: {
      vueSlider
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
