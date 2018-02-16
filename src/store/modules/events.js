import * as types from '@/store/mutationTypes.js'
import HTTP from '@/utils/httpRequest.js'
// import jsonEvents from '../../../static/data/events.js'

const state = {
  events: [
    {
      'id': 56789,
      'name': 'Escrime - homme',
      'dates': ['0908', '1012'],
      'place_name': 'Stade Yves-du-Manoir',
      'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
      'place_id': 12346
    }
  ],
  eventSelected: {
    'id': 56789,
    'name': 'Escrime - homme',
    'dates': ['0908', '1012'],
    'place_name': 'Stade Yves-du-Manoir',
    'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
    'place_id': 12346
  },
  eventsSchedules: [
    {
      'id': 56789,
      'name': 'Escrime - homme',
      'dates': ['0908', '1012'],
      'place_name': 'Stade Yves-du-Manoir',
      'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
      'place_id': 12346
    }
  ],
  eventsCloseToPlace: [
    {
      'id': 56789,
      'name': 'Escrime - homme',
      'dates': ['0908', '1012'],
      'place_name': 'Stade Yves-du-Manoir',
      'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
      'place_id': 12346
    }
  ]
}

const getters = {
  getEventSelected: state => state.eventSelected,
  getEventsBySchedules: state => state.eventsSchedules
}

const actions = {
  getEventsSchedules ({commit}, dates) {
    HTTP.get(`event/all?timestampStart=${dates[0]}&timestampEnd=${dates[1]}`).then(({data}) => {
      commit(types.GET_EVENTS_SCHEDULES, {
        events: data
      })
    }).catch(error => {
      console.log(error, 'error')
    })
  }
}

const mutations = {
  [types.GET_EVENTS_SCHEDULES] (state, {events}) {
    state.eventsSchedules = events
  },
  [types.SELECT_EVENT] (state, {eventSelected}) {
    state.eventSelected = eventSelected
  },
  [types.SELECT_PRESET] (state, {presetSelected}) {
    const lengthPresets = presetSelected.eventsId.length

    if (lengthPresets === 1) {
      const eventId = presetSelected.eventsId[0]
      const eventSelected = state.events.find((event) => {
        return parseFloat(event.id) === parseFloat(eventId)
      })

      state.eventSelected = eventSelected
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
