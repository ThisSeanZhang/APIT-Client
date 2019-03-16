const state = {
  projects: [],
  apis: []
}

const mutations = {
  FLASH_THE_PROJECTS (state, info) {
    state.projects = info
  },
  FLASH_THE_NODES (state, info) {
    state.apis = info
  }
}

const actions = {
  setProjects ({ commit }, projects) {
    if (projects && projects instanceof Array) {
      commit('FLASH_THE_PROJECTS', projects)
    }
  },
  setTreeNodes ({ commit }, apis) {
    if (apis && apis instanceof Array) {
      commit('FLASH_THE_NODES', apis)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
