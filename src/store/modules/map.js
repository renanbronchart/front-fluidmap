import * as types from '@/store/mutationTypes.js'

const state = {
  placeSelected: false
}

const getters = {}

const actions = {
  deselectPlace ({commit}) {
    commit(types.DESELECT_PLACE)
  }
}

const mutations = {
  [types.SELECT_PLACE] (state, {placeSelected}) {
    state.placeSelected = true
  },
  [types.DESELECT_PLACE] (state) {
    state.placeSelected = false
  },
  [types.SELECT_EVENT] (state, {eventSelected}) {
    state.placeSelected = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
