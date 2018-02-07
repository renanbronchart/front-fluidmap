import * as types from '@/store/mutationTypes.js'

const state = {
  placeSelected: false,
  eventSelected: false
}

const getters = {}

const actions = {
  deselectPlace ({commit}) {
    commit(types.DESELECT_PLACE)
  },
  deselectEvent ({commit}) {
    commit(types.DESELECT_EVENT)
  }
}

const mutations = {
  [types.SELECT_PLACE] (state, {placeSelected}) {
    state.placeSelected = true
    state.eventSelected = false
  },
  [types.DESELECT_PLACE] (state) {
    state.placeSelected = false
    state.eventSelected = false
  },
  [types.DESELECT_EVENT] (state) {
    state.eventSelected = false
  },
  [types.SELECT_EVENT] (state, {eventSelected}) {
    state.placeSelected = true
    state.eventSelected = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
