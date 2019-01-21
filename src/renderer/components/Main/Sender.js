const xmlhttp = new XMLHttpRequest()

module.exports = (option = {url: '', data: {}, headers: [], method: 'GET'}, then) => {
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      then(xmlhttp)
      console.log(xmlhttp.getAllResponseHeaders())
    }
  }
  xmlhttp.open(option.method, option.url, true)
  option.headers.forEach(head => {
    xmlhttp.setRequestHeader(head.key, head.value)
  })
  xmlhttp.send(option.data)
}
