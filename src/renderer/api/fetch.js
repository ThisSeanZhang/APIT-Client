import axios from 'axios'
// import * as config from '../config/index.js'
// let _apiHost = config.baseUrl
// let MINI_TIME = 300
let TIME_OUT_MAX = 5000
// let _request = []

// axios.defaults.baseURL = _apiHost

let ajax = (option = {url: '', data: {}, isSilence: false, method: 'GET'}) => {
  let _opts = {method: option.method || 'GET', url: option.url}
  // let _data =
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
        reject(error)
      })
  })
}
export {
  ajax
}
