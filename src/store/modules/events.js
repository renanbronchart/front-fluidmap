import * as types from '@/store/mutationTypes.js'
import jsonEvents from '../../../static/data/events.js'

const state = {
  eventsSelected: {
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
      placeId: 234567
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
  [types.SELECT_EVENT] (state, {placeSelected}) {
    state.placeSelected = placeSelected
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
