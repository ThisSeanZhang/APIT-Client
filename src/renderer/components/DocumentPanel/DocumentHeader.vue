<template>
  <el-row type="flex" :gutter="20" justify="space-around" style="margin-top: 10px;">
    <el-col :span="7">
    </el-col>
    <el-col :span="9">
      <div class="doc-title">{{inputTitle}}</div>
    </el-col>
    <el-col :span="7">
      <info-panel >
      </info-panel>
    </el-col>
  </el-row>
</template>
<script>
import InfoPanel from './InfoPanel'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'document-panel-header',
  components: {InfoPanel},
  props: {
    inputTitle: {
      type: String,
      default: ''
    },
    btn: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['admin', 'developerId', 'signed'])
  }
}
</script>
<style type="text/css" lang="scss" scoped>
.el-row {
  margin-left: 0px!important;
  margin-right: 0px!important;
}
.doc-title{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 25px;
}
.doc-back{
  font-size: 30px;
  font-weight: 700;
  display: flex;
  align-items: center;
  height: 100%;
  i {
    cursor: pointer;
  }
}
</style>
