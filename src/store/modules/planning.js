import * as types from '../mutationTypes'

const state = {
  date: '0908',
  schedules: '0608'
}

const getters = {}

const actions = {
  setNewDate ({commit}, date) {
    commit(types.SET_NEW_DATE, {date})
  },
  setNewHours ({commit}, hours) {
    commit(types.SET_NEW_SCHEDULES, {hours})
  }
}

const mutations = {
  [types.SET_NEW_DATE] (state, {date}) {
    state.date = date
  },
  [types.SET_NEW_SCHEDULES] (state, {hours}) {
    state.schedules = hours
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
