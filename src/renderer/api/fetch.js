import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'

let TIME_OUT_MAX = 5000

let ajax = (option = {url: '', data: {}, isSilence: false, method: 'GET'}) => {
  let _opts = {method: option.method || 'GET', url: option.url}
  const query = {}
  for (let _key in option.data) {
    if (option.data.hasOwnProperty(_key) && option.data[_key] !== '') {
      query[_key] = option.data[_key]
    }
  }
  _opts[_opts.method === 'GET' ? 'params' : 'data'] = query
  return new Promise((resolve, reject) => {
    const _instance = axios.create({
      timeout: TIME_OUT_MAX
    })
    _instance(_opts)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        checkSession()
        reject(error)
      })
  })
}
const checkSession = function () {
  if (!store.state.UserInfo.signed) {
    return
  }
  let request = {
    methods: 'GET',
    url: '/session/' + store.state.UserInfo.developerId
  }
  const sender = axios.create({
    timeout: TIME_OUT_MAX
  })

  sender(request)
    .then(resp => {
      store.dispatch('UserInfo/setUserInfo', resp.data.data)
    })
    .catch(error => {
      console.log(error)
      Message('登入信息已经过期了,访问非公开信息需要重新登陆哦')
      // this.$notify({
      //   title: '状态提示',
      //   dangerouslyUseHTMLString: true,
      //   message: '<a href="/">点击去登陆</a>'
      // })
      // this.delUserInfo()
      store.dispatch('UserInfo/delUserInfo')
    })
}
const handleNotHTTPError = function (error, reject) {
  if (error.request) {
    Message.error('发送失败请检查网络连接╮（╯＿╰）╭')
    reject(error)
  } else {
    Message('欸，好像出错了_(:з)∠)_，再试一次吧')
    reject(error)
  }
}
const handleAll = function (error) {
  return new Promise((resolve, reject) => {
    if (error.response) {
      switch (parseInt(error.response.status)) {
        case 504:
          Message.error('发送失败请检查网络连接╮（╯＿╰）╭')
          reject(error)
          break
      }
      resolve(error.response)
    } else {
      handleNotHTTPError(error, reject)
    }
  })
}
const just404 = function (error) {
  return new Promise((resolve, reject) => {
    if (error.response) {
      switch (parseInt(error.response.status)) {
        case 404:
          resolve(error)
          break
        case 504:
          Message.error('发送失败请检查网络连接╮（╯＿╰）╭')
          reject(error)
          break
        default:
          Message.warning(error.response.data.message + '(●ˇ∀ˇ●)')
          reject(error)
      }
    } else {
      handleNotHTTPError(error, reject)
    }
  })
}
const wantNothing = function (error) {
  if (error.response) {
    switch (parseInt(error.response.status)) {
      case 504:
        Message.error('发送失败请检查网络连接╮（╯＿╰）╭')
        break
      default:
        Message.warning(error.response.data.message + '(●ˇ∀ˇ●)')
    }
  } else {
    handleNotHTTPError(error, () => {})
  }
}

export {
  ajax,
  handleAll,
  just404,
  wantNothing
}
