import * as types from '@/store/mutationTypes.js'

const state = {
  open: false,
  noClose: false,
  component: null
}

const actions = {
  openModal ({commit}, {component, noClose = false}) {
    commit(types.OPEN_MODAL, {
      component,
      noClose
    })
  },
  closeModal ({commit}) {
    commit(types.CLOSE_MODAL)
  }
}

const mutations = {
  [types.OPEN_MODAL] (state, {component, noClose}) {
    state.open = true
    state.component = component
    state.noClose = noClose
  },
  [types.CLOSE_MODAL] (state) {
    state.open = false
    state.component = ``
    state.noClose = false
  }
}

export default {
  state,
  actions,
  mutations
}
