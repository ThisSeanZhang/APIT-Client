const state = {
  developerId: Number,
  developerName: String,
  email: String
}

const mutations = {
  FLASH_THE_INFO (state, info) {
    state.developerId = info.developerId
    state.developerName = info.developerName
    state.email = info.email
  }
}

const actions = {
  setUserInfo ({ commit }, userInfo) {
    // do something async
    if (userInfo) {
      commit('FLASH_THE_INFO', userInfo)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
