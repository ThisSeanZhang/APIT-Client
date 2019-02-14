<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <!-- <i class="el-icon-setting setting-btn" @click="openSettingPanel"></i> -->
        <el-popover popper-class="setting-popover"
          placement="bottom"
          width="800px"
          trigger="click">
          <div class="title">设置所要连接的服务器哦(/▽＼),默认的服务器仅供测试o(*////▽////*)q<s style="opacity: 0.4;">比较懒哈哈哈哈哈哈哈哈</s></div>
          <div style="margin-top: 5px;">
            <el-input size="mini" placeholder="在此输入服务器地址哈,然后再点击右侧验证是否能接通哦" v-model="url">
              <el-button slot="append">检查一哈</el-button>
            </el-input>
          </div>
          <!-- <el-button slot="reference">click 激活</el-button> -->
          <i class="el-icon-setting setting-btn" slot="reference"></i>
        </el-popover>
      </el-col>
      <el-col :span="6"><div  class="grid-content bg-purple">{{baseUrl}}</div></el-col>
    </el-row>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('Setting')

export default {
  name: 'wa-footer',
  data () {
    return {}
  },
  methods: {
    openSettingPanel () {
      console.log('open')
      this.$router.push('/setting')
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
  }
}
</script>
<style lang="scss" type="text/css" scoped>
  .setting-btn {
    color: #f56c6c;
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
