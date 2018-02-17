export default {
  ref: 'slider-hour',
  label: 'Tranche horaire :',
  slider: {
    value: [
      '18H',
      '20H'
    ],
    data: [
      '00H',
      '02H',
      '04H',
      '06H',
      '08H',
      '10H',
      '12H',
      '14H',
      '16H',
      '18H',
      '20H',
      '22H'
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
