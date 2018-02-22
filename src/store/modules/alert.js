import * as types from '@/store/mutationTypes.js'

const state = {
  content: '',
  iconName: false,
  active: false
}

const actions = {
  openAlert ({commit}, {content, autoclose, iconName}) {
    commit(types.OPEN_ALERT, {
      content,
      autoclose,
      iconName
    })
  },
  closeAlert ({commit}) {
    commit(types.CLOSE_ALERT)
  }
}

const mutations = {
  [types.OPEN_ALERT] (state, {content, autoclose, iconName}) {
    state.content = content
    state.iconName = iconName
    state.active = true

    setTimeout(function () {
      state.active = true
    }, 300)

    if (autoclose) {
      setTimeout(function () {
        state.active = false
      }, 4500)
    }
  },
  [types.CLOSE_ALERT] (state) {
    setTimeout(function () {
      state.active = false
    }, 400)
  }
}

export default {
  state,
  actions,
  mutations
}
