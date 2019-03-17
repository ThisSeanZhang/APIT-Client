export default class API {
  constructor (api) {
    this.aid = api.aid
    this.apiName = api.apiName
    this.method = api.method
    this.bewrite = api.bewrite
    this.url = api.url
    this.parameters = api.parameters
    this.headers = api.headers
    this.body = api.body
    this.formData = api.formData
    this.rawData = api.rawData
    this.apiOwner = api.apiOwner
    this.belongFolder = api.belongFolder
    this.belongProject = api.belongProject
    console.log(this)
  }

  static convertToList (value, doWhat) {
    return value.split('<a_o>').map(e => {
      return doWhat(e.split('<a_p>'))
    })
  }

  static convertToAPI (api) {
    const testRequest = API.newEmptyAPI()
    testRequest.aid = api.aid
    testRequest.apiName = api.apiName
    testRequest.method = api.method ? api.method : 'GET'
    testRequest.bewrite = api.bewrite ? api.bewrite : ''
    testRequest.url = api.url ? api.url : ''
    testRequest.parameters = api.parameters
      ? this.convertToList(api.parameters, info => { return {checked: (info[0] === 'true'), key: info[1], value: info[2], description: info[3]} })
      : []
    testRequest.headers = api.headers
      ? this.convertToList(api.headers, info => { return {checked: (info[0] === 'true'), key: info[1], value: info[2], description: info[3]} })
      : []
    const body = api.body
      ? JSON.parse(api.body)
      : {
        currentChoice: {
          label: 'none',
          value: ''
        },
        formData: '',
        rawData: ''
      }
    testRequest.body.formData = body.formData
      ? this.convertToList(body.formData, info => { return {checked: (info[0] === 'true'), key: info[1], type: info[2], value: info[3], description: info[4]} })
      : []
    testRequest.body.rawData = body.rawData ? body.rawData : ''
    testRequest.body.currentChoice = body.currentChoice
    testRequest.apiOwner = api.apiOwner
    testRequest.belongFolder = api.belongFolder
    testRequest.belongProject = api.belongProject
    return testRequest
  }

  static newEmptyAPI () {
    return new API({
      aid: null,
      apiName: '',
      method: '',
      bewrite: '',
      url: '',
      parameters: [],
      headers: [],
      body: {
        currentChoice: {
          label: 'none',
          value: ''
        },
        formData: [],
        rawData: ''
      },
      apiOwner: null,
      belongFolder: null,
      belongProject: null
    })
  }
}
