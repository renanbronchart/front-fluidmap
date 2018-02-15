import moment from 'moment'

import * as types from '@/store/mutationTypes.js'
import HTTP from '@/utils/httpRequest.js'

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
          .map(time => moment.unix(time).locale('fr').format('dddd Do MMMM'))
          .filter((elem, pos, arr) => arr.indexOf(elem) === pos)

        const hours = data.timestamps
          .map((time) => {
            const hour = moment.unix(time).locale('fr').format('HH')
            const hourEnd = moment.unix(time).add(2, 'h').locale('fr').format('HH')

            return `${hour}H - ${hourEnd}H`
          })
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
