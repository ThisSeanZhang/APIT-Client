<template>
  <div>
    <div v-if="apiId === null"></div>
    <div v-else class="doc-api">
      <div class="doc-api-header">
        <span>{{testRequest.method}}</span>
        {{testRequest.apiName}}
      </div>
      <div class="doc-api-title">
        API的描述信息
      </div>
      <p class="doc-api-text">
        {{testRequest.bewrite === '' ? '无' : testRequest.bewrite}}
      </p>
      <div class="doc-api-title">
        请求的URL
      </div>
      <p class="doc-api-text">
        {{testRequest.url}}
      </p>
      <div class="doc-api-title">
        请求的方式
      </div>
      <p class="doc-api-text">
        {{testRequest.method}}
      </p>
      <div class="doc-api-title">
        请求头
      </div>
      <div class="doc-api-table">
        <el-table :data="testRequest.headers" stripe>
          <el-table-column align="center" prop="key" label="键"></el-table-column>
          <el-table-column align="center" prop="value" label="值"></el-table-column>
          <el-table-column align="center" prop="description" label="描述"></el-table-column>
        </el-table>
      </div>
      <div class="doc-api-title">
        请求的查询参数
      </div>
      <div class="doc-api-table">
        <el-table :data="testRequest.parameters" stripe>
          <el-table-column align="center" prop="key" label="键"></el-table-column>
          <el-table-column align="center" prop="value" label="值"></el-table-column>
          <el-table-column align="center" prop="description" label="描述"></el-table-column>
        </el-table>
      </div>
      <div class="doc-api-title">
        请求体 ({{testRequest.body.currentChoice.label.toLowerCase()}}){{testRequest.body.currentChoice.value}}
      </div>
      <div class="doc-api-table">
        <p v-if="testRequest.body.currentChoice.label === 'raw'" class="doc-api-text">
          {{testRequest.body.rawData}}
        </p>
        <el-table v-else-if="testRequest.body.currentChoice.label === 'formData'" :data="testRequest.body.formData" stripe>
          <el-table-column align="center" prop="key" label="键"></el-table-column>
          <el-table-column align="center" prop="value" label="值"></el-table-column>
          <el-table-column align="center" prop="type" label="类型"></el-table-column>
          <el-table-column align="center" prop="description" label="描述"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { ajax } from '../../api/fetch'
export default {
  name: 'document-page',
  props: ['apiId'],
  data () {
    return {
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
      }
    }
  },
  watch: {
    apiId: function (newV, oldV) {
      this.fetchApiInfo()
    }
  },
  methods: {
    fetchApiInfo () {
      let request = {
        method: 'GET',
        url: '/apis/' + this.apiId
      }
      const h = this.$createElement
      ajax(request).then(resp => {
        this.convertToTestRequest(resp.data.data)
      }).catch(error => {
        console.log(error)
        this.$notify({
          title: '获取相应的API信息',
          message: h('i', { style: 'color: #f56c6c' }, '失败了〒▽〒')
        })
      })
    },
    convertToTestRequest (item) {
      this.testRequest.aid = item.aid
      this.testRequest.apiName = item.apiName
      this.testRequest.method = item.method ? item.method : 'GET'
      this.testRequest.bewrite = item.bewrite ? item.bewrite : ''
      this.testRequest.url = item.url ? item.url : ''
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
      this.testRequest.body.formData = body.formData
        ? this.convertToList(body.formData, info => { return {checked: (info[0] === 'true'), key: info[1], type: info[2], value: info[3], description: info[4]} })
        : []
      this.testRequest.body.rawData = body.rawData ? body.rawData : ''
      this.testRequest.body.currentChoice = body.currentChoice
      this.testRequest.apiOwner = item.apiOwner
      this.testRequest.belongFolder = item.belongFolder
      this.testRequest.belongProject = item.belongProject
    },
    convertToList (value, doWhat) {
      return value.split('<a_o>').map(e => {
        // let info = e.split('<a_p>')
        // return {checked: (info[0] === 'true'), key: info[1], value: info[2], description: info[3]}
        return doWhat(e.split('<a_p>'))
      })
    }
  },
  created () {
    console.log(this.apiId)
    if (this.apiId !== null) {
      this.fetchApiInfo()
    }
  },
  activated () {
    if (this.apiId !== null) {
      this.fetchApiInfo()
    }
  }
}
</script>
<style lang="scss" type="text/css" scoped>
.doc-api {
  font-weight: 400;
  .doc-api-header{
    font-size: 20px;
    font-weight: 900;
    border-bottom: 1px solid #dcdfe6;
    margin: 13px 0px 20px 0px;
  }
  .doc-api-title{
    font-size: 18px;
    margin: 15px 0px;
  }
  .doc-api-text{
    font-size: 13px;
    margin: 5px 0px;
    background-color: #e4e4e4;
    border-radius: 4px;
    padding: 10px;
    text-indent: 25px;
    letter-spacing: 0.5px; 
  }
  .doc-api-table{
    border-radius: 4px;
  }
}
</style>