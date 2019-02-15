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
      <el-col :span="6"><div  class="grid-content bg-purple"></div></el-col>
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
import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('Setting')

export default {
  name: 'wa-footer',
  components: {SoftInfo},
  data () {
    return {
      infoDialogVisible: false
    }
  },
  methods: {
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
    ...mapActions(['setBaseUrl'])
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
    ...mapState(['baseUrl'])
  },
  created () {
    const isPro = Object.is(process.env.NODE_ENV, 'development')
    const baseUrl = isPro ? 'http://localhost:8080/' : 'https://apit.whileaway.io/'
    if (!this.baseUrl && this.baseUrl === null) {
      this.setBaseUrl(baseUrl)
    }
    axios.defaults.baseURL = this.baseUrl
    console.log('baseUrl', baseUrl)
    console.log('store', this.baseUrl)
    console.log('axios.defaults.baseURL', axios.defaults.baseURL)
  }
}
</script>
<style lang="scss" type="text/css" scoped>
.item {
      margin: 4px;
    }
  .setting-btn {
    color: #f56c6c;
  }
  .about-btn {
    margin-left: 5px;
    color: #66b1ff;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .row-bg {
    height: 20px;
    background-color: #f9fafc;
  }
  .setting-popover {
    font-size: 18px;
    .title {
      color: #3a8ee6;
      font-size: 12px;
    }
  }
</style>
