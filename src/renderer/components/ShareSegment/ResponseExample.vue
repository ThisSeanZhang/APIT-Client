<template>
  <el-dialog title="返回参数样板"
    :visible.sync="dialogVisible"
    class="json_parameter"
    width="800px"
    @open="getServerResponseExample">
    <el-input
    type="textarea"
    :rows="22"
    placeholder="请发起一个请求"
    resize='none'
    v-model="showResponse">
    </el-input>
    <div slot="footer" class="dialog-footer">
      <el-button type="warning" icon="el-icon-refresh" style="float: left;" plain @click="reflashKey" >重置</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveToServer">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {ajax, just404, wantNothing} from '../../api/fetch'
// import API from '../../entitys/API'
export default {
  name: 'response-example',
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
      showResponse: ''
    }
  },
  computed: {
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
    obj2HTML (span, key, obj, last = true) {
      const value = {
        '[object Number]': v => this.pStr(span, key, v, last),
        '[object Array]': arr => this.pStr(span, key, '[') +
        arr.map((element, i) => this.obj2HTML(span + 1, null, element, i + 1 === arr.length)).join('') + this.pStr(span, null, ']', last),
        '[object String]': str => this.pStr(span, key, '"' + str + '"', last),
        '[object Object]': obj => {
          const params = Object.keys(obj)
          return this.pStr(span, key, '{') +
          params.map((k, i) =>
            this.obj2HTML(span + 1, k, obj[k], i + 1 === params.length)).join('') + this.pStr(span, null, '}', last)
        },
        '[object Boolean]': bol => this.pStr(span, key, bol, last)
      }
      if (obj === null) return this.pStr(span, key, obj, last)
      return value[Object.prototype.toString.call(obj)](obj)
    },
    pStr (span, key, value, last = true) {
      const pTagStart = ' '.repeat(span)
      const spanKey = key === null ? '' : '"' + key + '": '
      const patten = /\]|}/
      const spanValue = patten.test(value) ? value : value
      const separator = last ? '' : ','
      return pTagStart + spanKey + spanValue + separator + '\n'
    },
    getServerResponseExample () {
      const request = {
        method: 'GET',
        url: 'projects/' + this.pid + '/apis/' + this.aid + '/response_example'
      }
      ajax(request).then(resp => {
        // 从服务器获取之前存储的参数信息
        this.showResponse = resp.data.data
        // this.params = API.convertToList(
        //   resp.data.data,
        //   info => { return {checked: (info[0] === 'true'), key: info[1], type: info[2], description: info[3]} })
        // this.genTheIndex()
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
        url: 'projects/' + this.pid + '/apis/' + this.aid + '/response_example',
        data: {
          responseExample: this.showResponse
        }
      }
      ajax(request).then(resp => {
        this.$message('成功')
      }).catch(error => {
        wantNothing(error)
      })
    },
    reflashKey () {
      this.showResponse = this.obj2HTML(0, null, JSON.parse(this.paramStr))
    }
  },
  created () {
  }
}
</script>
<style type="text/css" lang="scss" scoped>

</style>

