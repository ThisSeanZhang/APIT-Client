<template>
  <div class="api_contant" v-loading="currentStatus == requestStatus.FETCHING">
    <div class="fetching_fail" v-if="currentStatus !== requestStatus.SUCCESS">
      点击左侧选择新的API<el-button v-if="currentAid !== null" type="text" @click.stop="fetchApiInfo()">,或者刷新</el-button>试试
    </div>
    <div v-else class="doc-api">
      <div class="doc-api-header">
        <span>{{testRequest.method}}</span>
        {{testRequest.apiName}}
        <div style="float: right;">
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button size="small" type="info" icon="el-icon-refresh" circle @click.stop="fetchApiInfo()" plain></el-button>
          </el-tooltip>
        </div>
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
      <div class="doc-api-title" v-if="testRequest.headers.length > 1">
        请求头
      </div>
      <div class="doc-api-table" v-if="testRequest.headers.length > 1">
        <el-table :data="testRequest.headers" stripe>
          <el-table-column align="center" prop="key" label="键"></el-table-column>
          <el-table-column align="center" prop="value" label="值"></el-table-column>
          <el-table-column align="center" prop="description" label="描述"></el-table-column>
        </el-table>
      </div>
      <div class="doc-api-title" v-if="testRequest.parameters.length > 1">
        请求的查询参数
      </div>
      <div class="doc-api-table" v-if="testRequest.parameters.length > 1">
        <el-table :data="testRequest.parameters" stripe>
          <el-table-column align="center" prop="key" label="键"></el-table-column>
          <el-table-column align="center" prop="value" label="值"></el-table-column>
          <el-table-column align="center" prop="description" label="描述"></el-table-column>
        </el-table>
      </div>
      <div class="doc-api-title" v-if="testRequest.body.currentChoice.label.toLowerCase() !== 'none'">
        请求体 ({{testRequest.body.currentChoice.label.toLowerCase()}}){{testRequest.body.currentChoice.value}}
      </div>
      <div class="doc-api-table">
        <div v-if="testRequest.body.currentChoice.label === 'raw'">
          <div v-if=" testRequest.body.currentChoice.value === 'application/json'" class="doc-api-text">
            <json-response v-model="testRequest.body.rawData"></json-response>
          </div>
          <p v-else class="doc-api-text">
            {{testRequest.body.rawData}}
          </p>
        </div>
        <el-table v-else-if="testRequest.body.currentChoice.label === 'formData'" :data="testRequest.body.formData" stripe>
          <el-table-column align="center" prop="key" label="键"></el-table-column>
          <el-table-column align="center" prop="value" label="值"></el-table-column>
          <el-table-column align="center" prop="type" label="类型"></el-table-column>
          <el-table-column align="center" prop="description" label="描述"></el-table-column>
        </el-table>
      </div>

      <div class="doc-api-title" v-if="testRequest.responseExample !== null">
        请求响应
      </div>
      <el-input
        v-if="testRequest.responseExample !== null"
        type="textarea"
        :rows="15"
        resize='none'
        readonly
        v-model="testRequest.responseExample">
      </el-input>
      <div class="doc-api-title" v-if="testRequest.exampleParams.length > 1">
        响应参数说明
      </div>
      <div class="doc-api-table" v-if="testRequest.exampleParams.length > 1">
        <el-table :data="testRequest.exampleParams" stripe>
          <el-table-column align="center" prop="key" label="键"></el-table-column>
          <el-table-column align="center" prop="type" label="类型"></el-table-column>
          <el-table-column align="center" prop="description" label="描述"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <api-location-change
      v-if="modifyVisible"
      v-model="modifyVisible"
      v-on:flash:folders="$router.go(0)"
      v-bind:focus="{ aid: currentAid, pid: currentPid} "
    >
    </api-location-change> -->
    <!-- <el-dialog
      center
      width="210px"
      title="确定删除？"
      :visible.sync="delVisible">
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button
          type="danger"
          @click="delApi">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import { ajax, just404 } from '../../api/fetch'
import API from '../../entitys/API'
import ApiLocationChange from './ApiLocationChange'
import JsonResponse from '../ShareSegment/JsonResponse'
export default {
  name: 'document-page',
  props: ['apiId', 'projectId'],
  components: {ApiLocationChange, JsonResponse},
  data () {
    return {
      requestStatus: {SUCCESS: 1, NOTFOUND: 2, REQUEST_ERROR: 3, FETCHING: 4},
      currentStatus: null,
      modifyVisible: false,
      delVisible: false,
      testRequest: API.newEmptyAPI(),
      currentAid: null,
      currentPid: null
    }
  },
  watch: {
    apiId: function (newV, oldV) {
      this.fetchApiInfo()
    }
  },
  methods: {
    fetchApiInfo () {
      this.currentStatus = this.requestStatus.FETCHING
      let request = {
        method: 'GET',
        url: 'projects/' + this.projectId + '/apis/' + this.apiId
      }
      const h = this.$createElement
      ajax(request).then(resp => {
        this.testRequest = API.convertToAPI(resp.data.data)
        this.currentStatus = this.requestStatus.SUCCESS
      }).catch(error => {
        just404(error).then(resp => {
          this.currentStatus = this.requestStatus.NOTFOUND
          this.$notify({
            title: '获取相应的API信息',
            message: h('i', { style: 'color: #f56c6c' }, '〒▽〒找不到相应的API信息了')
          })
        }).catch(() => {
          this.$notify({
            title: '获取相应的API信息',
            message: h('i', { style: 'color: #f56c6c' }, '请求失败了〒▽〒,页面上的信息可能已经失效')
          })
          this.currentStatus = this.requestStatus.REQUEST_ERROR
        })
        this.testRequest = API.newEmptyAPI()
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
    padding: 13px 0px 20px 0px;
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
.api_contant{
  height: 100%;
}
.fetching_fail {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
