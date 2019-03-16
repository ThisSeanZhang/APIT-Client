import { ajax } from '../api/fetch'
export default class Developer {
  constructor (developer) {
    this.developerId = developer.developerId
    this.developerName = developer.developerName
    this.developerPass = developer.developerPass
    this.email = developer.email
    this.salt = developer.salt
    this.admin = developer.admin
    this.defaultFolder = developer.defaultFolder
    this.defaultProject = developer.defaultProject
    console.log(this)
  }

  static convertToDeveloper (str) {
    return new Developer(JSON.parse(str))
  }

  static newEmptyDeveloper (str) {
    return new Developer({
      developerId: null,
      developerName: null,
      developerPass: null,
      email: null,
      salt: null,
      admin: null,
      defaultFolder: null,
      defaultProject: null
    })
  }

  static adminFetch (filter) {
    return ajax({
      method: 'GET',
      url: '/admin/developers',
      data: filter
    })
  }
}
