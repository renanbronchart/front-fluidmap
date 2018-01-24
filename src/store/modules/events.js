const state = {
  eventsSelected: {
    id: 56789,
    name: 'Escrime - homme',
    date: '0908',
    hours: '1012',
    placeName: 'Champ de mars',
    'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
    placeId: 12
  },
  eventsSchedules: [
    {
      id: 234567,
      name: 'Équitation - femme',
      date: '0908',
      hours: '1012',
      placeName: 'Champ de mars',
      'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
      placeId: 12
    }
  ]
}

const getters = {}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}