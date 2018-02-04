const state = {
  places: [
    {
      id: 12345,
      name: 'Champ de mars',
      capacity: 123467, // nombre de places
      'geo_point_2d': [48.754542648932755, 1.834361843330175],
      stationsClosest: [
        {
          id: 234567,
          name: 'Gare de Lyon',
          hint: 4,
          'geo_pont_2d': [48.754542648932755, 1.834361843330175]
        }
      ],
      events: [
        {
          id: 56789,
          name: 'Escrime - homme',
          date: '0908',
          hours: '1012',
          placeName: 'Champ de mars',
          'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
          placeId: 12
        }
      ],
      totalHints: [
        {
          timestamp: 23456100,
          hint: 0.3
        }
      ]
    }
  ],
  placeSelected: {
    id: 12345,
    name: 'Champ de mars',
    capacity: 123467, // nombre de places
    startTime: 1722600000,
    endTime: 1722607200,
    'geo_point_2d': [48.754542648932755, 1.834361843330175],
    stationsClosest: [
      {
        id: 234567,
        name: 'Gare de Lyon',
        hint: 4,
        'geo_pont_2d': [48.754542648932755, 1.834361843330175]
      }
    ],
    events: [
      {
        id: 56789,
        name: 'Escrime',
        step: 'Demi-finales - Hommes',
        date: 'Vendredi 4 août',
        hour: '12H - 14H',
        placeName: 'Champ de mars',
        'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
        placeId: 12
      },
      {
        id: 56789,
        name: 'Escrime',
        step: 'Demi-finales - Hommes',
        date: 'Vendredi 4 août',
        hour: '12H - 14H',
        placeName: 'Champ de mars',
        'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
        placeId: 12
      },
      {
        id: 56789,
        name: 'Escrime',
        step: 'Demi-finales - Hommes',
        date: 'Vendredi 4 août',
        hour: '12H - 14H',
        placeName: 'Champ de mars',
        'geo_point_2d': [48.754542648932755, 1.834361843330175], // mêmes que celles des places
        placeId: 12
      }
    ],
    totalHints: [
      {
        timestamp: 23456100,
        hint: 0.3
      }
    ]
  }
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
