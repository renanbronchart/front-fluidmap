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
  isEditionMode: state => state.edition,
  getLengthPreset: state => state.presets.length,
  getAllPresets: state => state.presets
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
    const presets = JSON.parse(localStorage.getItem('fluidmap-all-presets')) || []

    preset.id = parseFloat(presets.length)
    presets.push(preset)
    localStorage.setItem('fluidmap-all-presets', JSON.stringify(presets))

    commit(types.SAVE_NEW_PRESET, {
      preset: preset
    })
  },
  setNewEventPreset ({commit}, {event, dates}) {
    const name = event.name
    const newdates = [...dates]
    const placeId = event.place_id
    const eventsId = [event.id]
    const mapImage = event.mapImage

    console.log(mapImage, 'mapImage')

    const newPreset = {
      name,
      type: 'event',
      extanded: false,
      dates: newdates,
      place_id: placeId,
      eventsId,
      mapImage,
      map: {
        dates: newdates
      }
    }

    commit(types.SET_NEW_PRESET, {
      newPreset
    })
  },
  setNewPlacePreset ({commit}, {place, dates}) { // en supprimer un des deux, refacto, rendre generique
    const propertiesPlace = place

    const name = propertiesPlace.name
    const newdates = [...dates]
    const newdatesMap = `${newdates[0]}, ${newdates[0] + 7200}`.split(', ')
    const placeId = propertiesPlace.id
    const extanded = parseFloat(newdates[1]) !== parseFloat(newdatesMap[1])
    const mapImage = place.mapImage
    let eventsId

    console.log(mapImage, 'mapImage')

    if (propertiesPlace.events.length === 0) {
      eventsId = []
    } else {
      eventsId = propertiesPlace.events
        .filter(event => {
          const eventStart = event.dates[0]

          return eventStart >= newdates[0] && eventStart <= newdates[1]
        })
        .map(event => {
          return event.id
        })
    }

    const newPreset = {
      name,
      type: 'place',
      extanded,
      dates: newdates,
      place_id: placeId,
      eventsId,
      mapImage,
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
    const presets = JSON.parse(localStorage.getItem('fluidmap-all-presets')) || []

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
