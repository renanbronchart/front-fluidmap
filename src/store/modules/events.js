import * as types from '@/store/mutationTypes.js'
import jsonEvents from '../../../static/data/events.js'

const state = {
  events: [
    {
      id: 56789,
      name: 'Escrime - homme',
      timestampStart: '0908',
      timestampEnd: '1012',
      placeName: 'Stade Yves-du-Manoir',
      geo_point_2d: [48.754542648932755, 1.834361843330175], // mêmes que celles des places
      placeId: 12346
    },
    {
      id: 56790,
      name: 'Natation - Femme',
      timestampStart: '0908',
      timestampEnd: '1012',
      placeName: 'Invalides',
      geo_point_2d: [48.85990100000001, 2.3142669999999725], // mêmes que celles des places
      placeId: 12345
    },
    {
      id: 56791,
      name: 'Water Polo - Femme',
      timestampStart: '0908',
      timestampEnd: '1012',
      placeName: 'Invalides',
      geo_point_2d: [48.85990100000001, 2.3142669999999725], // mêmes que celles des places
      placeId: 12345
    }
  ],
  eventSelected: {
    id: 56789,
    name: 'Escrime - homme',
    date: '0908',
    hour: '1012',
    placeName: 'Champ de mars',
    'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
    placeId: 12
  },
  eventsSchedules: [
    {
      id: 56789,
      name: 'Escrime - homme',
      step: 'Duo - Qualification',
      date: '0908',
      hour: '1012',
      placeName: 'Stade Yves-du-Manoir',
      geo_point_2d: [48.754542648932755, 1.834361843330175], // mêmes que celles des places
      placeId: 12346
    },
    {
      id: 56790,
      name: 'Natation - Femme',
      step: 'Duo - Qualification',
      date: '0908',
      hour: '1012',
      placeName: 'Invalides',
      geo_point_2d: [48.85990100000001, 2.3142669999999725], // mêmes que celles des places
      placeId: 12345
    }
  ],
  eventsCloseToPlace: [
    {
      id: 34,
      name: 'Natation synchronisé',
      step: 'Duo - Qualification',
      hour: '14h00',
      placeName: 'Champs de mars, Paris'
    },
    {
      id: 35,
      name: 'Natation synchronisé',
      step: 'Duo - Qualification',
      hour: '14h00',
      placeName: 'Champs de mars, Paris'
    },
    {
      id: 36,
      name: 'Natation synchronisé',
      step: 'Duo - Qualification',
      hour: '14h00',
      placeName: 'Champs de mars, Paris'
    },
    {
      id: 37,
      name: 'Natation synchronisé',
      step: 'Duo - Qualification',
      hour: '14h00',
      placeName: 'Champs de mars, Paris'
    }
  ]
}

const getters = {}

const actions = {
  getEventsSchedules ({commit}) {
    commit(types.GET_EVENTS_SCHEDULES, {
      events: jsonEvents
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
