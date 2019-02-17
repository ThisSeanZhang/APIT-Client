<template>
  <el-container>
    <keep-alive>
      <develop-panel v-if="panelChangeBar.current === 'dev'"></develop-panel>
      <document-panel v-if="panelChangeBar.current === 'doc'"></document-panel>
    </keep-alive>
    <el-footer><wa-footer v-on:change:currentBar="changeCurrentPanel($event)" v-bind:changeBar="panelChangeBar"></wa-footer></el-footer>
  </el-container>
</template>
<script>
import WaFooter from './Footer/WaFooter'
import DevelopPanel from './Panel/Index'
import DocumentPanel from './DocumentPanel/Index'
export default {
  name: 'panel-page',
  components: {WaFooter, DevelopPanel, DocumentPanel},
  data () {
    return {
      panelChangeBar: { current: 'dev', allType: [{label: 'dev', value: '开发面板'}, {label: 'doc', value: '文档面板'}] }
    }
  },
  methods: {
    changeCurrentPanel (value) {
      this.panelChangeBar.current = value
      console.log('currentChange', value)
    }
  }
}
</script>
<style lang="scss" type="text/css" scoped>
  .el-container {
    height: 100%;
  }

  .el-footer{
    height: 21px !important;
    padding: 0px !important;
  }
</style>