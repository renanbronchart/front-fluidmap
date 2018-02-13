import * as types from '@/store/mutationTypes.js'
import jsonPresets from '../../../static/data/presets.js'

const state = {
  presets: [],
  presetSelected: {
    id: 2,
    name: 'Natation - Femme',
    type: 'event',
    extanded: false,
    timestamps: [1234567899, 12345678909],
    placeId: '12345',
    eventsId: ['56790'],
    map: {
      timestamps: [1234567899, 12345678909]
    }
  },
  currentPreset: {
    name: 'Natation - Femme',
    type: 'place',
    extanded: false,
    timestamps: [1234567899, 12345678909],
    placeId: '12345',
    eventsId: ['56790'],
    map: {
      timestamps: [1234567899, 12345678909]
    }
  }
}

const getters = {
  getCurrentPreset: state => state.currentPreset
}

const actions = {
  setNewEventPreset ({commit}, {event, timestamps}) {
    const name = event.name
    const newTimestamps = [...timestamps]
    const placeId = event.placeId
    const eventsId = [event.id]

    const currentPreset = {
      name,
      type: 'event',
      extanded: false,
      timestamps: newTimestamps,
      placeId,
      eventsId,
      map: {
        timestamps: newTimestamps
      }
    }

    commit(types.SET_NEW_PRESET, {
      currentPreset
    })
  },
  setNewPlacePreset ({commit}, {place, timestamps}) {
    const propertiesPlace = place.properties

    const name = propertiesPlace.name
    const newTimestamps = [...timestamps]
    const newTimestampsMap = `${newTimestamps[0]}, ${newTimestamps[0] + 7200}`.split(', ')
    const placeId = propertiesPlace.id
    const extanded = parseFloat(newTimestamps[1]) !== parseFloat(newTimestampsMap[1])
    const eventsId = propertiesPlace.events.map(event => {
      return event.id
    })

    const currentPreset = {
      name,
      type: 'place',
      extanded,
      timestamps: newTimestamps,
      placeId,
      eventsId,
      map: {
        timestamps: newTimestampsMap
      }
    }

    commit(types.SET_NEW_PRESET, {
      currentPreset
    })
  },
  getPresets ({commit}) {
    commit(types.GET_PRESETS, {
      presets: jsonPresets
    })
  },
  deletePreset ({ commit }, preset) {
    commit(types.DELETE_PRESET, {
      presetRemoved: preset
    })
  }
}

const mutations = {
  [types.SET_NEW_PRESET] (state, {currentPreset}) {
    state.currentPreset = currentPreset
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
