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
const isPro = Object.is(process.env.NODE_ENV, 'development')
const baseUrl = isPro ? 'http://localhost:8080/' : 'https://apit.whileaway.io/'
if (!state.baseUrl && state.baseUrl === null) {
  state.baseUrl = baseUrl
  axios.defaults.baseURL = baseUrl
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
