import CommonError from '../../../config/CommonError'
const xmlhttp = new XMLHttpRequest()
let TIME_OUT_MAX = 5000
export default (option = {url: '', data: {}, headers: [], method: 'GET'}) => {
  return new Promise(function (resolve, reject) {
    xmlhttp.open(option.method.toUpperCase(), option.url, true)

    xmlhttp.timeout = TIME_OUT_MAX

    xmlhttp.onload = function () {
      resolve(xmlhttp)
      // if (this.status >= 200 && this.status < 300) {
      //   resolve(JSON.parse(xmlhttp.response))
      // } else {
      //   const response = JSON.parse(xmlhttp.response)
      //   reject(new CommonError(
      //     this.status,
      //     response.data ? response.data.message : response.message
      //   ))
      // }
    }

    xmlhttp.onerror = function (e) {
      reject(new CommonError(
        this.status,
        '┑(￣Д ￣)┍,请求发送失败了'
      ))
    }

    xmlhttp.ontimeout = function (e) {
      reject(new CommonError(
        this.status,
        '(ノへ￣、)请求超时了'
      ))
    }

    if (option.method.toUpperCase() === 'GET') {
      option.headers = option.headers.filter(h => h.key !== 'Content-Type')
    }
    option.headers.forEach(head => {
      xmlhttp.setRequestHeader(head.key, head.value)
    })

    xmlhttp.send(option.data)
  })
}
