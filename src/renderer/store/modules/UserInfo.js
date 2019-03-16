const state = {
  developerId: null,
  developerName: null,
  email: null,
  defaultProject: null,
  defaultFolder: null,
  admin: false,
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
    state.admin = info.admin
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
      developerId: null,
      developerName: null,
      email: null,
      defaultProject: null,
      defaultFolder: null,
      signed: false,
      admin: false
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
