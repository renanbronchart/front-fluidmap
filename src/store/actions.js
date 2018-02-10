import * as types from '@/store/mutationTypes.js'

export const selectPlaces = ({ commit }, place) => {
  commit(types.SELECT_PLACE, {
    placeSelected: place
  })
}

export const selectEvent = ({ commit }, event) => {
  commit(types.SELECT_EVENT, {
    eventSelected: event
  })
}

export const selectPreset = ({ commit }, preset) => {
  commit(types.SELECT_PRESET, {
    presetSelected: preset
  })
}
