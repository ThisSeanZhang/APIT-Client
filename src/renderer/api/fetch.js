import axios from 'axios'
import config from '@/config'

let _apiHost = config.baseURL
// let MINI_TIME = 300
// let TIME_OUT_MAX = 5000
// let _request = []

axios.defaults.baseURL = _apiHost

module.exports = (option = {url: '', data: {}, isSilence: false, method: 'GET'}) => {
  // let _opts = { method: option.method, url: option.url}
  // let _data =
}
