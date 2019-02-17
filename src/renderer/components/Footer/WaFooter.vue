<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <el-popover popper-class="setting-popover"
          width="800px"
          trigger="click">
          <div class="title">设置所要连接的服务器哦(/▽＼),默认的服务器仅供测试o(*////▽////*)q<s style="opacity: 0.4;">比较懒哈哈哈哈哈哈哈哈</s></div>
          <div style="margin-top: 5px;">
            <el-input size="mini" placeholder="在此输入服务器地址哈,然后再点击右侧验证是否能接通哦" v-model="url">
              <el-button slot="append" @click="checkConnection">检查一哈</el-button>
            </el-input>
          </div>
          <i class="el-icon-setting setting-btn" slot="reference"></i>
        </el-popover>
        <i class="el-icon-info about-btn" style="font-size: 14px;" @click="infoDialogVisible = true"></i>
      </el-col>
      <el-col :span="6">
        <el-radio-group v-model="current" size="mini"  v-if="changeBar.current !== '' && signed" @change="changeBarhandel">
          <el-radio-button v-for="r in changeBar.allType" :key="r.label" class="model-choice" :label="r.label">{{r.value}}</el-radio-button>
        </el-radio-group>
        {{current}}
      </el-col>
    </el-row>
    <el-dialog
      title="关于"
      :visible.sync="infoDialogVisible"
      width="40%"
      center>
      <soft-info></soft-info>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="infoDialogVisible = false" plain>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import SoftInfo from './SoftInfo'
import { ajax } from '../../api/fetch'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'wa-footer',
  props: {
    changeBar: {
      type: Object,
      default: function () { return { current: '', allType: [{label: '', value: ''}] } },
      validator: function (value) {
        return value.allType.filter(t => t.label === value.current).length > 0
      }
    }
  },
  components: {SoftInfo},
  data () {
    return {
      infoDialogVisible: false,
      current: ''
    }
  },
  methods: {
    changeBarhandel (value) {
      this.$emit('change:currentBar', value)
    },
    checkConnection () {
      let request = {
        method: 'GET',
        url: '/checks/connection'
      }
      const h = this.$createElement
      ajax(request).then(resp => {
        this.$notify({
          title: '测试服务器连接',
          message: h('i', { style: 'color: teal' }, '连接成功啦<(￣︶￣)↗[GO!]')
        })
      }).catch(error => {
        console.log(error)
        this.$notify({
          title: '测试服务器连接',
          message: h('i', { style: 'color: #f56c6c' }, '失败了〒▽〒')
        })
      })
    },
    ...mapActions('Setting', ['setBaseUrl']),
    ...mapActions('UserInfo', ['setUserInfo'])
  },
  computed: {
    url: {
      get: function () {
        console.log(this.baseUrl)
        return this.baseUrl
      },
      set: function (url) {
        this.setBaseUrl(url)
      }
    },
    ...mapState('Setting', ['baseUrl']),
    ...mapState('UserInfo', ['signed'])
  },
  created () {
    this.current = this.changeBar.current
  }
}
</script>
<style lang="scss" type="text/css" scoped>
.item {
      margin: 4px;
    }
  .setting-btn {
    padding-top: 2px;
    margin-left: 5px;
    color: #f56c6c;
  }
  .about-btn {
    padding-top: 2px;
    margin-left: 5px;
    color: #66b1ff;
  }
  .row-bg {
    border-top: 1px solid #dcdfe6;
    height: 20px;
    // background-color: #f9fafc;
  }
  .setting-popover {
    font-size: 18px;
    .title {
      color: #3a8ee6;
      font-size: 12px;
    }
  }

</style>
<style  lang="scss" type="text/css">
  .model-choice{
    .el-radio-button__inner{
      padding: 2px 13px;
    }
  }
</style>
