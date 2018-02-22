import * as types from '@/store/mutationTypes.js'

export const selectPlaces = ({ commit }, place) => {
  commit(types.SELECT_PLACE, {
    placeSelected: place
  })
}

export const selectEvent = ({ commit }, event) => {
  console.log(event)
  commit(types.SELECT_EVENT, {
    eventSelected: event
  })
}

export const selectPreset = ({ commit }, preset) => {
  commit(types.SELECT_PRESET, {
    presetSelected: preset
  })
}

export const setValueSliders = ({commit}, {valueDays, valueHours}) => {
  commit(types.SET_VALUE_SLIDERS, {
    valueDays,
    valueHours
  })

  commit(types.SET_NEW_DATE, {
    date: valueDays,
    schedules: valueHours
  })
}

export const setNewDate = ({commit}, {date, schedules}) => {
  commit(types.SET_NEW_DATE, {
    date,
    schedules
  })

  commit(types.SET_EXPANDED_DATE, {
    date,
    schedules
  })

  commit(types.OPEN_ALERT, {
    content: 'Votre contenu est en train de charger',
    autoclose: false
  })
}
