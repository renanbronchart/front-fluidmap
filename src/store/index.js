import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage
})

const state = {
  challenges: []
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [vuexLocalStorage.plugin]
})

export default store
