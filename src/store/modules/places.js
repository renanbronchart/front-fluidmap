import * as types from '@/store/mutationTypes.js'
import HTTP from '@/utils/httpRequest.js'

const state = {
  places: [],
  placeSelected: {
    'id': '',
    'name': '',
    'capacity': '',
    'stationsClosest': [
      {
        'id': 0,
        'name': '',
        'hint': 0
      }
    ],
    'events': [],
    'totalHints': [
      {
        'timestamp': 0,
        'hint': 0
      }
    ]
  }
}

const getters = {
  getPlaceSelected: state => state.placeSelected
}

const actions = {
  getPlaces ({commit}) {
    HTTP.get('event/places').then(({data}) => {
      console.log(data, 'data')

      commit(types.GET_PLACES, {
        places: data
      })
    }).catch(error => {
      console.log(error, 'error')
    })
  }
}

const mutations = {
  [types.GET_PLACES] (state, {places}) {
    state.places = places
  },
  [types.SELECT_PLACE] (state, {placeSelected}) {
    state.placeSelected = placeSelected
  },
  [types.SELECT_EVENT] (state, {eventSelected}) {
    const placeId = eventSelected.place_id

    console.log(placeId, 'place_id')

    state.placeSelected = findPlaceSelected(placeId, state.places.features)
  },
  [types.SELECT_PRESET] (state, {presetSelected}) {
    const lengthPresets = presetSelected.eventsId.length
    const placeId = presetSelected.place_id

    if (lengthPresets > 0) {
      state.placeSelected = findPlaceSelected(placeId, state.places.features)
    }
  }
}

const findPlaceSelected = function findPlaceSelected (placeId, places) {
  const placeSelected = places.find((place) => {
    return parseFloat(place.properties.id) === parseFloat(placeId)
  })

  return placeSelected.properties
}

export default {
  state,
  getters,
  actions,
  mutations
}
