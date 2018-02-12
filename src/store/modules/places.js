import * as types from '@/store/mutationTypes.js'
import jsonPlaces from '../../../static/data/places.js'

const state = {
  places: [],
  placeSelected: {
    'type': 'Feature',
    'properties': {
      'id': '12345',
      'name': 'Stade Yves-du-Manoir',
      'capacity': '49977513',
      'stationsClosest': [
        {
          'id': 234567,
          'name': 'Gare de Lyon',
          'hint': 4
        }
      ],
      'events': [
        {
          'id': 56789,
          'name': 'Escrime - homme',
          'date': '0908',
          'hour': '1012',
          'placeName': 'Champ de mars',
          'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
          'placeId': 12
        }
      ],
      'totalHints': [
        {
          'timestamp': 23456100,
          'hint': 0.3
        }
      ]
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [
        48.9292771,
        2.24777169999993
      ]
    }
  }
}

const getters = {
  getPlaceSelected: state => state.placeSelected
}

const actions = {
  getPlaces ({commit}) {
    commit(types.GET_PLACES, {
      places: jsonPlaces
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
    const placeId = eventSelected.placeId

    state.placeSelected = findPlaceSelected(placeId, state.places.features)
  },
  [types.SELECT_PRESET] (state, {presetSelected}) {
    const lengthPresets = presetSelected.eventsId.length
    const placeId = presetSelected.placeId

    if (lengthPresets > 0) {
      state.placeSelected = findPlaceSelected(placeId, state.places.features)
    }
  }
}

const findPlaceSelected = function findPlaceSelected (placeId, places) {
  const placeSelected = places.find((place) => {
    return parseFloat(place.properties.id) === parseFloat(placeId)
  })

  return placeSelected
}

export default {
  state,
  getters,
  actions,
  mutations
}
