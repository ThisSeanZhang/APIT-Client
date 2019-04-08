// import { ajax } from '../api/fetch'
import store from '../store'
const folderNamePatten = /^[\u4e00-\u9fa5a-zA-Z_\-0-9=]{1,8}$/
export default class Folder {
  constructor (folder) {
    this.fid = folder.fid
    this.folderName = folder.folderName
    this.parentId = folder.parentId
    this.folderOwnerId = folder.folderOwnerId
    this.belongProject = folder.belongProject
    this.status = folder.status
    console.log(this)
  }

  static convertToFolder (str) {
    return new Folder(JSON.parse(str))
  }

  static newEmptyFolder () {
    return new Folder({
      fid: null,
      folderName: null,
      parentId: null,
      folderOwnerId: store.state.UserInfo.developerId ? store.state.UserInfo.developerId : null,
      belongProject: null,
      status: null
    })
  }

  static nameValid () {
    return {
      patten: folderNamePatten,
      message: '长度在 1 到 8 个字符,且仅能出现字符\'-_\''
    }
  }
  isLegalName () {
    return this.folderName === null ? false : folderNamePatten.test(this.folderName)
  }
}
