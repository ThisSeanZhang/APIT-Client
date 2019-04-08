import { ajax } from '../api/fetch'
const projectNamePatten = /^[\u4e00-\u9fa5a-zA-Z_\-0-9=]{1,8}$/
export default class Project {
  constructor (project) {
    this.pid = project.pid
    this.projectName = project.projectName
    this.projectOwner = project.projectOwner
    this.overt = project.overt
    this.whoJoins = project.whoJoins
    this.ownerName = project.ownerName
    this.status = project.status
    console.log(this)
  }

  static convertToProject (str) {
    return new Project(JSON.parse(str))
  }

  static newEmptyProject (str) {
    return new Project({
      pid: null,
      projectName: null,
      projectOwner: null,
      overt: null,
      ownerName: null,
      whoJoins: null,
      status: null
    })
  }

  static adminFetch (filter) {
    return ajax({
      method: 'GET',
      url: '/admin/projects',
      data: filter
    })
  }

  static nameValid () {
    return {
      patten: projectNamePatten,
      message: '文件夹名称长度在 1 到 8 个字符,且仅能出现字符\'-_\''
    }
  }
  isLegalName () {
    return this.projectName === null ? false : projectNamePatten.test(this.projectName)
  }
}
