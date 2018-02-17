import * as types from '@/store/mutationTypes.js'
// import jsonPresets from '../../../static/data/presets.js'

const state = {
  edition: false,
  presets: [],
  presetSelected: {
    id: 2,
    name: 'Natation - Femme',
    type: 'event',
    extanded: false,
    dates: [1234567899, 12345678909],
    place_id: '12345',
    eventsId: ['56790'],
    map: {
      dates: [1234567899, 12345678909]
    }
  },
  currentPreset: {},
  newPreset: {}
}

const getters = {
  getCurrentPreset: state => state.currentPreset,
  getNewPreset: state => state.newPreset,
  isEditionMode: state => state.edition
}

const actions = {
  switchEditionMode ({commit}, boolean) {
    commit(types.SWITCH_EDITION_MODE, {
      edition: boolean
    })
  },
  removeNewPreset ({commit}) {
    commit(types.REMOVE_NEW_PRESET)
  },
  saveNewPreset ({commit}, preset) {
    const presets = JSON.parse(localStorage.getItem('fluidmap-presets')) || []

    presets.unshift(preset)
    localStorage.setItem('fluidmap-presets', JSON.stringify(presets))

    commit(types.SAVE_NEW_PRESET, {
      preset: preset
    })
  },
  setNewEventPreset ({commit}, {event, dates}) {
    const name = event.name
    const newdates = [...dates]
    const placeId = event.place_id
    const eventsId = [event.id]

    const newPreset = {
      name,
      type: 'event',
      extanded: false,
      dates: newdates,
      place_id: placeId,
      eventsId,
      map: {
        dates: newdates
      }
    }

    commit(types.SET_NEW_PRESET, {
      newPreset
    })
  },
  setNewPlacePreset ({commit}, {place, dates}) { // en supprimer un des deux, refacto, rendre generique
    const propertiesPlace = place.properties

    const name = propertiesPlace.name
    const newdates = [...dates]
    const newdatesMap = `${newdates[0]}, ${newdates[0] + 7200}`.split(', ')
    const placeId = propertiesPlace.id
    const extanded = parseFloat(newdates[1]) !== parseFloat(newdatesMap[1])
    const eventsId = propertiesPlace.events.map(event => {
      return event.id
    })

    const newPreset = {
      name,
      type: 'place',
      extanded,
      dates: newdates,
      place_id: placeId,
      eventsId,
      map: {
        dates: newdatesMap
      }
    }

    commit(types.SET_NEW_PRESET, {
      newPreset
    })
  },
  removeCurrentPreset ({commit}) {
    commit(types.REMOVE_CURRENT_PRESET)
  },
  setCurrentPreset ({commit}, preset) {
    commit(types.SET_CURRENT_PRESET, {
      currentPreset: preset
    })
  },
  getPresets ({commit}) {
    const presets = JSON.parse(localStorage.getItem('fluidmap-presets')) || []

    commit(types.GET_PRESETS, {
      presets: presets
    })
  },
  deletePreset ({ commit }, preset) {
    commit(types.DELETE_PRESET, {
      presetRemoved: preset
    })
  }
}

const mutations = {
  [types.SWITCH_EDITION_MODE] (state, {edition}) {
    state.edition = edition
  },
  [types.SAVE_NEW_PRESET] (state, {preset}) {
    state.presets.unshift(preset)
  },
  [types.REMOVE_NEW_PRESET] (state) {
    state.newPreset = {}
  },
  [types.SET_NEW_PRESET] (state, {newPreset}) {
    state.newPreset = newPreset
  },
  [types.SET_CURRENT_PRESET] (state, {currentPreset}) {
    state.currentPreset = currentPreset
  },
  [types.REMOVE_CURRENT_PRESET] (state) {
    state.currentPreset = {}
  },
  [types.GET_PRESETS] (state, {presets}) {
    state.presets = presets
  },
  [types.SELECT_PRESET] (state, {presetSelected}) {
    state.presetSelected = presetSelected
  },
  [types.DELETE_PRESET] (state, {presetRemoved}) {
    const newPresets = state.presets.filter((preset) => {
      return parseFloat(preset.id) !== parseFloat(presetRemoved.id)
    })

    state.presets = newPresets
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
