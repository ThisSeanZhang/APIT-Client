<template>
  <el-dialog title="返回参数说明"
    :visible.sync="dialogVisible"
    class="json_parameter"
    width="800px"
    @open="getServerKey">
    <div style="text-align: center;">点击刷新就可将本次请求的参数自动填入,勾选可保留参数</div>
    <el-table
      class="params_table"
      :data="params"
      style="width: 100%">
      <el-table-column
        width="40">
        <template slot="header" slot-scope="scope">
          <el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked" ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        label="参数名">
        <template slot-scope="scope">
          <el-input
          size="mini"
          placeholder="key"
          v-model="scope.row.key"
          clearable>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="参数类型">
        <template slot-scope="scope">
          <el-select size="mini" v-model="scope.row.type" placeholder="请选择">
            <el-option v-for=" (value, key) in paramType" :label="key" :value="value" :key='key'></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="描述">
        <template slot-scope="scope">
          <el-input
          size="mini"
          placeholder="description"
          v-model="scope.row.description"
          clearable>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
        width="52"
        show-overflow-tooltip>
        <template slot="header" slot-scope="scope">
          <el-button icon="el-icon-plus" size="small" @click="addParam" circle></el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delParam(scope.row.index)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="warning" icon="el-icon-refresh" style="float: left;" plain @click="reflashKey" >刷新</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveToServer">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {ajax, just404, wantNothing} from '../../api/fetch'
import API from '../../entitys/API'
export default {
  name: 'response-parameter',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    paramStr: {
      type: String,
      default: null
    },
    aid: {
      type: Number,
      default: null
    },
    pid: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      checkAll: false,
      isIndeterminate: false,
      paramType: {NUMBER: 'Number', ARRAY: 'Array', STRING: 'String', OBJECT: 'Object', BOOLEAN: 'Boolean', UNKNOW: 'UnKnow'},
      params: []
    }
  },
  computed: {
    indeterminate: function () {
      let checkedList = this.params.filter(param => param.checked === true)
      let checkedCount = checkedList.length
      this.checkAll = checkedCount === this.params.length
      return checkedCount > 0 && checkedCount < this.params.length
    },
    dialogVisible: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    getAllKey () {
      if (this.paramStr === null) {
        return []
      }
      const obj = this.jsonStrToObj()
      const allkey = []
      for (let [key, value] of this.getKey(null, obj)) {
        if (key === null) continue
        allkey.push({key: key, type: value})
      }
      // console.log(obj)
      return allkey
      // return obj === null ? [] : [...new Set(this.getKey(null, obj).filter(e => e.key !== null))]
      // return obj === null ? [] : [...new Set(this.getKey(null, obj).filter(e => e !== null))].map(e => { return {checked: false, key: e, description: ''} })
    },
    getKey (key, obj) {
      const value = {
        'Number': (key, obj, type) => new Map([[key, type]]),
        'Array': (key, arr, type) => arr.map((element, i) => this.getKey(key + '.' + this.getType(element), element)).reduce((acc, val) => new Map([...acc, ...val]), new Map([[key, type]])),
        'String': (key, obj, type) => new Map([[key, type]]),
        'Object': (key, obj, type) => Object.keys(obj).map((k, i) => this.getKey((key === null ? '' : key + '.') + k, obj[k])).reduce((acc, val) => new Map([...acc, ...val]), new Map([[key, type]])),
        'Boolean': (key, obj, type) => new Map([[key, type]]),
        'UnKnow': (key, obj, type) => new Map([[key, type]])
      }
      // if (obj === null) return new Map([[key, this.paramType.UNKNOW]])
      // const patten = /\[object (\w+)\]/
      // const type = patten.exec(Object.prototype.toString.call(obj))[1]
      const type = this.getType(obj)
      // 匹配不到的话是为null 或者 长度小于2
      // if (type === null || type.length < 2) {
      //   return {key: null, type: null}
      // }
      return value[type](key, obj, type)
    },
    getType (obj) {
      if (obj === null) return this.paramType.UNKNOW
      const patten = /\[object (\w+)\]/
      const type = patten.exec(Object.prototype.toString.call(obj))[1]
      // console.log('getType' + type)
      return type === null || type === undefined || type.length < 2 ? this.paramType.UNKNOW : type
    },
    jsonStrToObj () {
      try {
        return JSON.parse(this.paramStr)
      } catch (e) {
        return null
      }
    },
    handleCheckAllChange (val) {
      this.params.forEach((param, index) => {
        param.checked = val
      })
    },
    addParam () {
      this.params.push({
        checked: true,
        key: '',
        type: '',
        description: '',
        index: this.params.length.toString()
      })
    },
    delParam (index) {
      this.params.splice(index, 1)
      this.genTheIndex()
    },
    genTheIndex () {
      this.params.forEach((param, index) => {
        param.index = index.toString()
      })
      // console.log('当前的Header', this.params)
    },
    getServerKey () {
      const request = {
        method: 'GET',
        url: 'projects/' + this.pid + '/apis/' + this.aid + '/example_params'
      }
      ajax(request).then(resp => {
        // 从服务器获取之前存储的参数信息
        this.params = API.convertToList(
          resp.data.data,
          info => { return {checked: (info[0] === 'true'), key: info[1], type: info[2], description: info[3]} })
        this.genTheIndex()
      }).catch(error => {
        just404(error)
          .then(resp => {
            this.reflashKey()
          })
      })
    },
    saveToServer () {
      const request = {
        method: 'PUT',
        url: 'projects/' + this.pid + '/apis/' + this.aid + '/example_params',
        data: {
          params: API.convertToStr(this.params, e => [e.checked, e.key, e.type, e.description])
        }
      }
      ajax(request).then(resp => {
        this.$message('成功')
      }).catch(error => {
        wantNothing(error)
      })
    },
    reflashKey () {
      const findParams = this.getAllKey()
      console.log('发现的keys', findParams)
      const findKeys = findParams.map(e => e.key)
      const remainKeys = this.params
        .filter(e => e.key !== '')
        .filter(e => e.checked || findKeys.includes(e.key))
        .map(e => e.key)
      console.log('保留的keys', remainKeys)
      const addKeys = findParams
        .filter(e => !remainKeys.includes(e.key)).map(e => Object.assign(e, {checked: false, description: ''}))
      console.log('最后增加keys', addKeys)
      this.params = this.params
        .filter(e => remainKeys.includes(e.key))
        .concat(addKeys)
      this.genTheIndex()
      console.log('最终的结果', this.params)
    }
  },
  created () {
    // this.getAllKey()
    // this.genTheIndex()
  }
}
</script>
<style type="text/css" lang="scss" scoped>
.el-table{
  td{
    padding: 5px;
  }
  th {
    padding: 0 5px;
  }
}
</style>
<style type="text/css" lang="scss">
.json_parameter {
  .el-dialog__body{
    padding: 0px 20px 8px 20px;
    margin-right: 8px;
  height: 500px;
  overflow: auto;
  }
}
</style>

