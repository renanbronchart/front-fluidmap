import moment from 'moment'

import * as types from '../mutationTypes'

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
  getSchedulesValue: state => state.map.schedules
}

const actions = {
  setNewDate ({commit}, {date, schedules}) {
    commit(types.SET_NEW_DATE, {
      date,
      schedules
    })

    commit(types.SET_EXPANDED_DATE, {
      date,
      schedules
    })
  },
  setExpandedDate ({commit}, {date, schedules}) {
    commit(types.SET_EXPANDED_DATE, {
      date,
      schedules
    })
  }
}

const mutations = {
  [types.SET_NEW_DATE] (state, {date, schedules}) {
    const dates = getdates(date, schedules)

    state.map = {
      dates,
      date,
      schedules
    }
  },
  [types.SET_EXPANDED_DATE] (state, {date, schedules}) {
    const dates = getdates(date, schedules)

    state.expanded = {
      dates,
      date,
      schedules
    }
  }
}

const getdates = function getdates (date, schedules) {
  const dateHash = {
    janvier: '01',
    fevrier: '02',
    mars: '03',
    avril: '04',
    mai: '05',
    juin: '06',
    juillet: '07',
    août: '08',
    septembre: '09',
    octobre: '10',
    novembre: '11',
    decembre: '12'
  }

  let hoursTrim = schedules.trim()
  let hourStartAt = hoursTrim.replace(/^(\d{2})H - (\d{2})H$/g, '$1:00')
  let hourEndAt = hoursTrim.replace(/^(\d{2})H - (\d{2})H$/g, '$2:00')

  hourEndAt = hourStartAt === hourEndAt ? `${parseFloat(hourEndAt) + 2}:00` : hourEndAt

  let dayTrim = date.trim()
  let newValueDate = dayTrim.replace(/^[a-z]+ (\d{0,2}) ([a-zû]+)$/i, `$1-$2-2018`)
  let arrayValue = newValueDate.split('-')
  let newValueDay = `${arrayValue[0]}-${dateHash[arrayValue[1]]}-${arrayValue[2]}`

  let startDate = `${newValueDay} ${hourStartAt}`
  let endDate = `${newValueDay} ${hourEndAt}`

  startDate = moment(startDate, 'DD-MM-YYYY HH:mm').locale('fr').unix()
  endDate = moment(endDate, 'DD-MM-YYYY HH:mm').locale('fr').unix()

  return [startDate, endDate]
}

export default {
  state,
  getters,
  actions,
  mutations
}
