import * as types from '@/store/mutationTypes.js'

const state = {
  placeSelected: false
}

const getters = {}

const actions = {
  selectPlace ({commit}) {
    commit(types.SELECT_PLACE)
  },
  deselectPlace ({commit}) {
    commit(types.DESELECT_PLACE)
  }
}

const mutations = {
  [types.SELECT_PLACE] (state) {
    state.placeSelected = true
  },
  [types.DESELECT_PLACE] (state) {
    state.placeSelected = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
