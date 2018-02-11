import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'

import * as actions from './actions.js'

import events from './modules/events.js'
import places from './modules/places.js'
import planning from './modules/planning.js'
import map from './modules/map.js'
import presets from './modules/presets.js'
import modal from './modules/modal.js'

Vue.use(Vuex)

// const vuexLocalStorage = new VuexPersist({
//   storage: window.localStorage
// })

const store = new Vuex.Store({
  actions,
  modules: {
    planning,
    events,
    places,
    map,
    presets,
    modal
  }
  // plugins: [vuexLocalStorage.plugin]
})

export default store
