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
    },
    {
      'id': 56790,
      'name': 'Natation - Femme',
      'dates': ['0908', '1012'],
      'place_name': 'Invalides',
      'geo_point_2d': [48.85990100000001, 2.3142669999999725], // mêmes que celles des places
      'place_id': 12345
    },
    {
      'id': 56791,
      'name': 'Water Polo - Femme',
      'dates': ['0908', '1012'],
      'place_name': 'Invalides',
      'geo_point_2d': [48.85990100000001, 2.3142669999999725], // mêmes que celles des places
      'place_id': 12345
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
    },
    {
      'id': 56790,
      'name': 'Natation - Femme',
      'dates': ['0908', '1012'],
      'place_name': 'Invalides',
      'geo_point_2d': [48.85990100000001, 2.3142669999999725], // mêmes que celles des places
      'place_id': 12345
    },
    {
      'id': 56791,
      'name': 'Water Polo - Femme',
      'dates': ['0908', '1012'],
      'place_name': 'Invalides',
      'geo_point_2d': [48.85990100000001, 2.3142669999999725], // mêmes que celles des places
      'place_id': 12345
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
    },
    {
      'id': 56790,
      'name': 'Natation - Femme',
      'dates': ['0908', '1012'],
      'place_name': 'Invalides',
      'geo_point_2d': [48.85990100000001, 2.3142669999999725], // mêmes que celles des places
      'place_id': 12345
    },
    {
      'id': 56791,
      'name': 'Water Polo - Femme',
      'dates': ['0908', '1012'],
      'place_name': 'Invalides',
      'geo_point_2d': [48.85990100000001, 2.3142669999999725], // mêmes que celles des places
      'place_id': 12345
    }
  ]
}

const getters = {
  getEventSelected: state => state.eventSelected,
  getEventsBySchedules: state => state.eventsSchedules
}

const actions = {
  getEventsSchedules ({commit}, dates) {
    // Faire recherche sur l'api par rapport aux timestamps
    // const timestampStart = dates[0]
    // const timestampEnd = dates[1]

    // HTTP.get(`event/all?timestamp_start=${dates[0]}&timestamp_start=${dates[1]}`).then(({data}) => {

    HTTP.get('event/all').then(({data}) => {
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
