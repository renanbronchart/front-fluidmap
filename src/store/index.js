import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'

import events from './modules/events.js'
import places from './modules/places.js'
import planning from './modules/planning.js'

Vue.use(Vuex)

// const vuexLocalStorage = new VuexPersist({
//   storage: window.localStorage
// })

const store = new Vuex.Store({
  modules: {
    planning,
    events,
    places
  }
  // plugins: [vuexLocalStorage.plugin]
})

export default store
