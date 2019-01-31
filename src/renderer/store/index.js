import Vue from 'vue'
import Vuex from 'vuex'
// createSharedMutations
import { createPersistedState } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState()
    // createSharedMutations() // 用于进程间共享
  ],
  strict: process.env.NODE_ENV !== 'production'
})
