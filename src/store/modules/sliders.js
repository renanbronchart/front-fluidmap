const state = {
  config: [
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

const getters = {
  getConfigSliders: state => state.config
}

const actions = {

}

const mutations = {

}

export default {
  state,
  actions,
  getters,
  mutations
}
