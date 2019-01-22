<template>
  <div>
    <span class="test"  @click="showDescription" ><i :class="iconClass"></i></span>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="item.title"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">{{item.title}}</el-button>
    <el-button class="button-save" type="primary" size="small" @click="log('baocun')" icon="el-icon-document">保存</el-button>
    <div :class="descriptionDivClass" >
      <el-input
        type="textarea"
        :rows="4"
        resize="none"
        placeholder="请输入描述"
        v-model="textarea">
      </el-input>
    </div>
    <div style="margin-top: 10px;">
      <el-form >
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="testRequest.url" class="input-with-select">
            <el-select v-model="testRequest.method" slot="prepend" placeholder="请选择">
              <el-option v-for="method in httpMethod" :key="method" :label="method" :value="method"></el-option>
            </el-select>
            <el-button slot="append" @click="sendRequest" icon="el-icon-sort">发送</el-button>
            <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-tabs type="border-card">
            <el-tab-pane label="请求参数"><request-param v-bind:parameters="testRequest.parameters"></request-param></el-tab-pane>
            <el-tab-pane label="请求头"><request-headers v-bind:headers="testRequest.headers"></request-headers></el-tab-pane>
            <el-tab-pane label="请求体"><request-body v-on:updateHeaderType="updateType($event)" v-bind:body="testRequest.body"></request-body></el-tab-pane>
            <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
          </el-tabs>
          
        </el-form-item>
      </el-form>
    </div>
    <response-area v-bind:response="response"></response-area>


    <el-button-group slot="append" >
          <el-button type="primary" @click="testModifyInPraents" icon="el-icon-edit"></el-button>
          <el-button type="primary" icon="el-icon-share"></el-button>
        </el-button-group>
    <div>{{item.content}}</div>
    <div>{{testRequest}}</div>
    <div>{{requestUrl}}</div>
  </div>
</template>
<script>
import Sender from './Sender.js'
import RequestParam from './RequestParam-2'
import RequestHeaders from './RequestHeaders'
import RequestBody from './RequestBody'
import ResponseArea from './ResponseArea'
export default {
  name: 'each-table-panel',
  props: ['item'],
  components: {RequestParam, RequestHeaders, RequestBody, ResponseArea},
  watch: {
    testRequest: function (newR, oldR) {
      console.log('发现变化')
      console.log(newR.parameters)
      console.log(oldR.parameters)
    }
  },
  data () {
    return {
      inputVisible: false,
      inputValue: null,
      descriptionIsOpen: false,
      textarea: 'asdadasdadjaikhjfakhfahskjfhak',
      httpMethod: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      testRequest: {
        method: 'GET',
        url: 'http://localhost/file',
        parameters: [],
        headers: [],
        body: {}
      },
      response: null
    }
  },
  methods: {
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
      if (!this.descriptionIsOpen) this.showDescription()
    },
    handleInputConfirm () {
      // let inputValue = this.inputValue
      // if (inputValue) {
      //   this.dynamicTags.push(inputValue)
      // }
      this.inputVisible = false
      // this.inputValue = ''
    },
    showDescription () {
      this.descriptionIsOpen = !this.descriptionIsOpen
    },
    log (message) {
      console.log(message)
    },
    updateType (requestBody) {
      // this.testRequest.body = requestBody
      // console.log(requestBody[requestBody.currentChoice.label])
      let requestHeader = requestBody.currentChoice.value
      this.testRequest.headers = this.testRequest.headers.filter(head => head.key !== 'Content-Type')
      if (requestHeader === '') {
        return null
      }
      this.testRequest.headers.unshift({
        checked: true,
        key: 'Content-Type',
        value: requestHeader,
        description: ''
      })
      this.genTheIndex(this.testRequest.headers)
    },
    sendRequest () {
      console.log(this.finalContentType)
      Sender({
        method: this.testRequest.method,
        url: this.requestUrl,
        headers: this.testRequest.headers
      }, (xmlhttp) => {
        this.response = xmlhttp.response
        console.log(this.response)
      })
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
    },
    testModifyInPraents () {
      // this.testRequest.body.formData[0].key = 'waht'
      console.log(this.testRequest.body)
    }
  },
  computed: {
    iconClass: function () {
      return this.descriptionIsOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-right'
    },
    descriptionDivClass: function () {
      return this.descriptionIsOpen ? 'title-div-close title-div-focus' : 'title-div-close'
    },
    finalContentType: function () {
      let contentType = ''
      this.testRequest.headers.forEach(perParam => {
        contentType += perParam.value
      })
      return contentType === '' ? 'charset=utf-8' : contentType + '; charset=utf-8'
    },
    requestUrl: function () {
      if (this.testRequest.method !== 'GET') return this.testRequest.url

      return this.testRequest.url + '?' + this.testRequest.parameters
        .filter(param => param.checked === true)
        .map(param => param.key + '=' + param.value)
        .join('&')
    }
  },
  created () {
    let params = [{
      checked: true,
      key: 'name',
      value: 'Sean',
      description: '用户名'
    }, {
      checked: true,
      key: 'param',
      value: '456789',
      description: '密码'
    }, {
      checked: false,
      key: 'de',
      value: '王小虎',
      description: '上海市普陀区金沙江路'
    }]
    let paramStr = JSON.stringify(params)
    let parameters = JSON.parse(paramStr)
    parameters.forEach(param => {
      this.testRequest.parameters.push(param)
    })

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
