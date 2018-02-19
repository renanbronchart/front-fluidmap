import HTTP from '@/utils/httpRequest.js'
import * as types from '@/store/mutationTypes.js'
import mapDate from '@/utils/manipulateDate.js'

const state = {
  dataHeat: [],
  placeSelected: false,
  eventSelected: false
}

const getters = {
  isPlaceSelected: () => state.placeSelected,
  isEventSelected: () => state.eventSelected
}

const actions = {
  deselectPlace ({commit}) {
    commit(types.DESELECT_PLACE)
  },
  deselectEvent ({commit}) {
    commit(types.DESELECT_EVENT)
  }
}

const mutations = {
  [types.SET_NEW_DATE] (state, {date, schedules}) {
    const dates = mapDate.getdates(date, schedules)
    const timestampStart = parseFloat(dates[0]) + 1
    const rowsRequest = 8000
    const offsetRequest = 8000
    const countRequest = 11
    const oldHeat = JSON.parse(localStorage.getItem('fluidmap-dataHeat')) || []

    state.dataHeat = oldHeat

    heatRequest()

    function heatRequest () {
      let i = 0
      let promises = []

      for (i; i <= countRequest; i++) {
        let nextOffset = offsetRequest * i

        promises[i] = HTTP.get(`heat/${timestampStart}?rows=${rowsRequest}&offset=${nextOffset}`)
      }

      Promise.all(promises).then((values) => {
        let newHeat = []

        for (let {data} of values) {
          let features = data.features || []

          newHeat = [...newHeat, ...features]
        }

        state.dataHeat = newHeat
        localStorage.setItem('fluidmap-dataHeat', JSON.stringify(newHeat.slice(0, 10000)))
      })
    }
  },
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
  },
  [types.SELECT_PRESET] (state, {presetSelected}) {
    const lengthPresets = presetSelected.eventsId.length

    if (lengthPresets > 1) {
      state.placeSelected = true
      state.eventSelected = false
    } else if (lengthPresets === 1) {
      state.placeSelected = true
      state.eventSelected = true
    } else {
      state.placeSelected = false
      state.eventSelected = false
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
