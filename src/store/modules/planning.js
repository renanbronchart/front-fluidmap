import store from '@/store'
import * as types from '../mutationTypes'
import mapDate from '@/utils/manipulateDate.js'

const state = {
  dates: [
  ],
  expanded: {
    dates: [1234567899, 12345678909],
    date: 'Vendredi 8 août',
    schedules: '08H - 10H'
  },
  map: {
    dates: [1234567899, 12345678909],
    date: 'Vendredi 8 août',
    schedules: '08H - 10H'
  }
}

const getters = {
  getDayValue: state => state.map.date,
  getSchedulesValue: state => state.map.schedules,
  getTimestampsMap: state => state.map.dates
}

const actions = {
  setExpandedDate ({commit}, {date, schedules}) {
    commit(types.SET_EXPANDED_DATE, {
      date,
      schedules
    })
  }
}

const mutations = {
  [types.SET_NEW_DATE] (state, {date, schedules}) {
    const dates = mapDate.getdates(date, schedules)

    store.dispatch('getEventsSchedules', dates)

    state.map = {
      dates,
      date,
      schedules
    }
  },
  [types.SET_EXPANDED_DATE] (state, {date, schedules}) {
    const dates = mapDate.getdates(date, schedules)

    state.expanded = {
      dates,
      date,
      schedules
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
