import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'

import planning from './modules/planning'

Vue.use(Vuex)

// const vuexLocalStorage = new VuexPersist({
//   storage: window.localStorage
// })

const store = new Vuex.Store({
  modules: {
    planning
  }
  // plugins: [vuexLocalStorage.plugin]
})

export default store
