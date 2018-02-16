import * as types from '@/store/mutationTypes.js'
import HTTP from '@/utils/httpRequest.js'
import mapDate from '@/utils/manipulateDate.js'

const state = {
  data: [],
  allDays: [],
  allSchedules: []
}

const getters = {
  getAllTimestamps: () => state.data,
  getAllDays: () => state.allDays,
  getAllSchedules: () => state.allSchedules
}

const actions = {
  getTimestampsApi ({commit}) {
    return new Promise(resolve => {
      HTTP.get('timestamps').then(({data}) => {
        commit(types.GET_TIMESTAMPS_API, {
          timestamps: data.timestamps
        })

        const dates = data.timestamps
          .map(mapDate.getDateDisplay)
          .filter((elem, pos, arr) => arr.indexOf(elem) === pos)

        const hours = data.timestamps
          .map(mapDate.getSchedulesDisplay)
          .filter((elem, pos, arr) => arr.indexOf(elem) === pos)

        commit(types.SET_NEW_DAYS, {allDays: dates})
        commit(types.SET_NEW_HOURS, {allSchedules: hours})

        resolve()
      }).catch(error => {
        console.log(error, 'error')
      })
    })
  }
}

const mutations = {
  [types.GET_TIMESTAMPS_API] (state, {timestamps}) {
    state.data = timestamps
  },
  [types.SET_NEW_DAYS] (state, {allDays}) {
    state.allDays = allDays
  },
  [types.SET_NEW_HOURS] (state, {allSchedules}) {
    state.allSchedules = allSchedules
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
