const state = {
  developerId: Number,
  developerName: String,
  email: String,
  defaultProject: Number,
  defaultFolder: Number
}

const mutations = {
  FLASH_THE_INFO (state, info) {
    state.developerId = info.developerId
    state.developerName = info.developerName
    state.email = info.email
    state.defaultProject = info.defaultProject
    state.defaultFolder = info.defaultFolder
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
