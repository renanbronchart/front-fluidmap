import * as types from '@/store/mutationTypes.js'
import jsonPresets from '../../../static/data/presets.js'

const state = {
  presets: [],
  presetSelected: {
    name: 'Natation - Femme',
    timestampStart: '1234567899',
    timestampEnd: '12345678909',
    placeId: '12345',
    eventsId: ['56790'],
    schedulesMap: {
      timestampStart: '1234567899',
      timestampEnd: '12345678909'
    }
  }
}

const getters = {}

const actions = {
  getPresets ({commit}) {
    commit(types.GET_PRESETS, {
      presets: jsonPresets
    })
  }
}

const mutations = {
  [types.GET_PRESETS] (state, {presets}) {
    state.presets = presets
  },
  [types.SELECT_PRESET] (state, {presetSelected}) {
    state.presetSelected = presetSelected
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
