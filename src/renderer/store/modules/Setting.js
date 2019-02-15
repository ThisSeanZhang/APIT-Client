import axios from 'axios'

const state = {
  baseUrl: null
}

const mutations = {
  SET_BASE_URL (state, baseUrl) {
    state.baseUrl = baseUrl
    axios.defaults.baseURL = baseUrl
  }
}

const actions = {
  setBaseUrl ({ commit }, baseUrl) {
    if (baseUrl && baseUrl !== '') {
      commit('SET_BASE_URL', baseUrl)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
