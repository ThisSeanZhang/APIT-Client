const state = {
  developerId: Number,
  developerName: String,
  email: String,
  defaultProject: Number,
  defaultFolder: Number,
  signed: false
}

const mutations = {
  FLASH_THE_INFO (state, info) {
    state.developerId = info.developerId
    state.developerName = info.developerName
    state.email = info.email
    state.defaultProject = info.defaultProject
    state.defaultFolder = info.defaultFolder
    state.signed = info.signed
  }
}

const actions = {
  setUserInfo ({ commit }, userInfo) {
    // do something async
    if (userInfo) {
      commit('FLASH_THE_INFO', {...userInfo, signed: true})
    }
  },
  delUserInfo ({ commit }) {
    // do something async
    commit('FLASH_THE_INFO', {
      developerId: Number,
      developerName: String,
      email: String,
      defaultProject: Number,
      defaultFolder: Number,
      signed: false
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
