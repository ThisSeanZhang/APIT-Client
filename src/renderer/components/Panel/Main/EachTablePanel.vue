<template>
  <div v-loading="panelLodong">
    <span class="test"  @click="showDescription" ><i :class="iconClass"></i></span>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="apiName"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">{{testRequest.apiName}}</el-button>
    <el-button v-if="signed" class="button-save" type="primary" size="small" @click="commitCurrent" icon="el-icon-document">保存</el-button>
    <div :class="descriptionDivClass" >
      <el-input
        type="textarea"
        :rows="4"
        resize="none"
        placeholder="请输入描述"
        v-model="testRequest.bewrite">
      </el-input>
    </div>
    <div style="margin-top: 10px;">
      <el-form >
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="testRequest.url" @blur="checkeUrlStartWithHTTP" class="input-with-select">
            <el-select v-model="testRequest.method" slot="prepend" placeholder="请选择">
              <el-option v-for="method in httpMethod" :key="method" :label="method" :value="method"></el-option>
            </el-select>
            <el-button slot="append" @click="sendRequest" icon="el-icon-sort" :disabled="isSending">发送</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-tabs type="border-card" style="line-height: normal;">
            <el-tab-pane label="请求参数"><request-param v-bind:parameters="testRequest.parameters"></request-param></el-tab-pane>
            <el-tab-pane label="请求头"><request-headers v-bind:headers="testRequest.headers"></request-headers></el-tab-pane>
            <el-tab-pane label="请求体"><request-body v-model="buildBody"></request-body></el-tab-pane>
            <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
          </el-tabs>
          
        </el-form-item>
      </el-form>
    </div>
    <response-area v-bind:response="response"></response-area>


    <!-- <el-button-group slot="append" >
          <el-button type="primary" @click="checkeUrlStartWithHTTP" icon="el-icon-edit"></el-button>
          <el-button type="primary" icon="el-icon-share"></el-button>
        </el-button-group> -->
    <!-- <div>{{item.content}}</div>
    <div>{{testRequest}}</div>
    <div>{{requestUrl}}</div>
    <div>{{saveReqest}}</div> -->
  </div>
</template>
<script>
import Sender from './Sender.js'
import RequestParam from './RequestParam-2'
import RequestHeaders from './RequestHeaders'
import RequestBody from './RequestBody'
import ResponseArea from './ResponseArea'
import {ajax} from '../../../api/fetch'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')

export default {
  name: 'each-table-panel',
  props: ['item'],
  components: {RequestParam, RequestHeaders, RequestBody, ResponseArea},
  watch: {
    testRequest: {
      handler: function (val, oldVal) {
        // console.log('testRequest深度检查', val, oldVal)
        // console.log(this.objectComper(this.saveReqest.data, this.item))
        this.item.isDot = !this.objectComper(this.saveReqest.data, this.item)
      },
      deep: true
    }
  },
  data () {
    return {
      isSending: false,
      changedName: false,
      panelLodong: false,
      inputVisible: false,
      inputValue: null,
      descriptionIsOpen: false,
      httpMethod: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      testRequest: {
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
        }
      },
      response: null
    }
  },
  methods: {
    objectComper (o1, o2) {
      const notCheck = ['aid', 'apiOwner', 'belongFolder', 'belongProject']
      for (const [key, value] of Object.entries(o1)) {
        // console.log(key, o2[key], value, o2[key] !== value)
        if (!notCheck.includes(key) && o2[key] !== value && !(o2[key] === null && value === '')) {
          return false
        }
      }
      // Object.entries(o1).forEach(e => {
      //   const [key, value] = e
      //   console.log(key, value, o2[key] === value)
      //   if (o2[key] !== value) return false
      // })
      return true
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
      if (!this.descriptionIsOpen) this.showDescription()
    },
    handleInputConfirm () {
      this.inputVisible = false
    },
    showDescription () {
      this.descriptionIsOpen = !this.descriptionIsOpen
    },
    commitCurrent () {
      this.panelLodong = true
      ajax(this.saveReqest).then(resp => {
        // console.log(resp)
        // TODO 登入成功后的相应操作
        this.$message.success('成功o(￣▽￣)ｄ')
        this.$emit('commit:api', {remove: this.item.aid, append: resp.data.data})
        this.panelLodong = false
      }).catch(error => {
        this.whenErrorMessage(error, () => {
          this.$message.warning('还没有项目欸(●ˇ∀ˇ●)')
        })
      })
    },
    updateType (requestHeader) {
      this.testRequest.headers = this.testRequest.headers.filter(head => head.key !== 'Content-Type')
      if (requestHeader === '') {
        return null
      }
      this.testRequest.headers.unshift({
        checked: true,
        key: 'Content-Type',
        value: requestHeader + ';charset=utf-8',
        description: ''
      })
      this.genTheIndex(this.testRequest.headers)
      // console.log(JSON.stringify(this.testRequest.headers))
      // console.log(JSON.stringify(this.testRequest.body))
    },
    checkTheRequestLegal (perRequest) {
      if (perRequest.url === '' || perRequest.url === null || perRequest.url === 'http://') {
        return '(●ˇ∀ˇ●)请求的URL不能为空哦'
      }
      return null
    },
    sendRequest () {
      const checkResult = this.checkTheRequestLegal(this.request)
      if (checkResult) {
        this.$message.warning(checkResult)
        return null
      }
      this.isSending = true
      Sender(this.request).then((xmlhttp) => {
        this.response = xmlhttp.response
        this.isSending = false
      }).catch(error => {
        console.log(error)
        this.$message.error(error.message)
        this.isSending = false
      })

      // Sender(this.request, (xmlhttp) => {
      //   this.response = xmlhttp.response
      //   this.isSending = false
      //   // console.log(this.response)
      // })
      // this.ajaxSender.defaults.headers.post['Content-Type'] = this.finalContentType
      // axios({
      //   method: this.testRequest.method,
      //   url: this.testRequest.url,
      //   headers: {'Content-Type': this.finalContentType}
      // }).then(function (response) {
      //   console.log(response.data)
      //   console.log(response.status)
      //   console.log(response.statusText)
      //   console.log(response.headers)
      //   console.log(response.config)
      // })
    },
    genTheIndex (list) {
      list.forEach((param, index) => {
        param.index = index.toString()
      })
      return list
    },
    checkeUrlStartWithHTTP () {
      let http = /^http:\/\/|https:\/\//i
      this.testRequest.url = this.testRequest.url.trim()
      this.testRequest.url = this.testRequest.url.search(http) !== -1 ? this.testRequest.url : 'http://' + this.testRequest.url
    },
    convertToTestRequest (item) {
      this.testRequest.aid = item.aid
      this.testRequest.apiName = item.apiName
      this.testRequest.method = item.method ? item.method : 'GET'
      this.testRequest.bewrite = item.bewrite ? item.bewrite : ''
      this.testRequest.url = item.url ? item.url : ''
      // this.testRequest.parameters = item.parameters ? JSON.parse(item.parameters) : []
      this.testRequest.parameters = item.parameters
        ? this.convertToList(item.parameters, info => { return {checked: (info[0] === 'true'), key: info[1], value: info[2], description: info[3]} })
        : []
      this.testRequest.headers = item.headers
        ? this.convertToList(item.headers, info => { return {checked: (info[0] === 'true'), key: info[1], value: info[2], description: info[3]} })
        : []
      const body = item.body
        ? JSON.parse(item.body)
        : {
          currentChoice: {
            label: 'none',
            value: ''
          },
          formData: '',
          rawData: ''
        }
      // console.log('转换后的Body', body)
      this.testRequest.body.formData = body.formData
        ? this.convertToList(body.formData, info => { return {checked: (info[0] === 'true'), key: info[1], type: info[2], value: info[3], description: info[4]} })
        : []
      this.testRequest.body.rawData = body.rawData ? body.rawData : ''
      // console.log(body.currentChoice)
      this.testRequest.body.currentChoice = body.currentChoice
      this.testRequest.apiOwner = item.apiOwner
      this.testRequest.belongFolder = item.belongFolder
      this.testRequest.belongProject = item.belongProject
      // console.log('加载完的testRequest', this.testRequest)
    },
    whenErrorMessage (error, dowhat) {
      if (error.response) {
        if (error.response.status === 404) {
          dowhat()
        }
        this.$message.warning('_(:з)∠)_' + error.response.data.message)
      } else if (error.request) {
        this.$message.error('发送失败请检查网络连接╮（╯＿╰）╭')
      } else {
        this.$message('欸，好像出错了_(:з)∠)_，再试一次吧')
      }
      this.panelLodong = false
    },
    convertToList (value, doWhat) {
      return value.split('<a_o>').map(e => {
        // let info = e.split('<a_p>')
        // return {checked: (info[0] === 'true'), key: info[1], value: info[2], description: info[3]}
        return doWhat(e.split('<a_p>'))
      })
    },
    convertToStr (list, doWhat) {
      return list
        ? list.map(e => doWhat(e).join('<a_p>')).join('<a_o>')
        : ''
    }
  },
  computed: {
    iconClass: function () {
      return this.descriptionIsOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-right'
    },
    descriptionDivClass: function () {
      return this.descriptionIsOpen ? 'title-div-close title-div-focus' : 'title-div-close'
    },
    requestUrl: function () {
      // if (this.testRequest.method !== 'GET') return this.testRequest.url
      let temp = this.testRequest.parameters.filter(param => param.checked === true)
      return this.testRequest.url + (temp.length > 0 ? '?' : '') + temp
        .map(param => param.key + '=' + param.value)
        .join('&')
    },
    buildBody: {
      get: function () {
        return this.testRequest.body
      },
      set: function (body) {
        this.updateType(body.currentChoice.value)
        this.testRequest.body = body
        // console.log(this.testRequest)
      }
    },
    requestBody: function () {
      let body = {
        'none': () => '',
        'formData': () => {
          let formData = new FormData()
          this.testRequest.body.formData.forEach(param => {
            formData.append(param.key, param.value)
          })
          return formData
        },
        'urlencoded': () => '',
        'binary': () => '',
        'raw': () => this.testRequest.body.rawData
      }
      return body[this.testRequest.body.currentChoice.label]()
    },
    Requestheaders: function () {
      return this.testRequest.headers.filter(header => header.checked === true)
    },
    request: function () {
      let result = {}
      result.method = this.testRequest.method
      result.url = this.requestUrl
      result.headers = this.Requestheaders
      result.data = this.testRequest.method !== 'GET'
        ? this.requestBody
        : null
      return result
    },
    saveReqest: function () {
      const aid = this.testRequest.aid
      let request = {
        method: isNaN(aid) ? 'POST' : 'PUT',
        url: 'http://localhost:8080/apis/' + (isNaN(aid) ? '' : aid),
        data: {
          aid: isNaN(aid) ? null : aid,
          apiName: this.testRequest.apiName,
          method: this.testRequest.method,
          bewrite: this.testRequest.bewrite,
          url: this.testRequest.url,
          parameters: this.convertToStr(this.testRequest.parameters, e => [e.checked, e.key, e.value, e.description]),
          headers: this.convertToStr(this.testRequest.headers, e => [e.checked, e.key, e.value, e.description]),
          body: JSON.stringify({
            currentChoice: this.testRequest.body.currentChoice,
            formData: this.convertToStr(this.testRequest.body.formData, e => [e.checked, e.key, e.type, e.type === 'Text' ? e.value : '', e.description]),
            rawData: this.testRequest.body.rawData
          }),
          apiOwner: this.developerId,
          belongFolder: this.defaultFolder,
          belongProject: this.defaultProject
        }
      }
      return request
    },
    apiName: {
      get: function () {
        return this.testRequest.apiName
      },
      set: function (value) {
        this.testRequest.apiName = value
        this.item.showApiName = value
      }
    },
    ...mapState(['developerId', 'defaultProject', 'defaultFolder', 'signed'])
  },
  created () {
    // let params = [{
    //   checked: true,
    //   key: 'name',
    //   value: 'Sean',
    //   description: '用户名'
    // }, {
    //   checked: true,
    //   key: 'param',
    //   value: '456789',
    //   description: '密码'
    // }, {
    //   checked: false,
    //   key: 'de',
    //   value: '王小虎',
    //   description: '上海市普陀区金沙江路'
    // }]
    // let paramStr = JSON.stringify(params)
    // console.log(paramStr)
    // let parameters = JSON.parse(paramStr)
    // parameters.forEach(param => {
    //   this.testRequest.parameters.push(param)
    // })
    this.convertToTestRequest(this.item)
    // let headers = [{
    //   checked: true,
    //   key: 'Content-Type',
    //   value: 'application/json',
    //   description: 'Json方式'
    // }]
    // let headerStr = JSON.stringify(headers)
    // this.testRequest.headers = JSON.parse(headerStr)

    // let aaa = JSON.stringify(this.testRequest.parameters)
    // console.log(JSON.parse('{"AAA":"BBB","json":' + aaa + '}'))
    // let bbb = {
    //   name: 'name',
    //   param: aaa,
    //   de: 'de'
    // }
    // let ddd = JSON.stringify(bbb)
    // console.log(ddd)
    // console.log(JSON.parse(JSON.parse(ddd).param))
  }
}
</script>
<style type="text/css">
  .title-div-close{
    height: 0px;
    overflow: hidden;
    transition: height 0.6s;
    margin-top: 3px;
  }
  .title-div-focus{
    height: 100px;
  }
  .button-new-tag {
    margin-left: 10px;
    width: 60%;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .button-save {
    /* margin-left: 24%!important; */
    float: right;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    margin-left: 10px;
    width: 60%;
    height: 32px;
    vertical-align: bottom;
  }
  .test{
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
  }
  .el-select .el-input {
    width: 120px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  /* .el-form-item{
    margin-bottom: 0px;
  } */
</style>
