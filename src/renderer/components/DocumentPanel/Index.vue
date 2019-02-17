<template>
  <el-container>
    <el-aside>
      <wa-aside 
      ref="aside"
      v-on:pushToTable="pushToTable($event)"></wa-aside>
    </el-aside>
    <el-main>
      <document-page v-bind:apiId="currentApiId"></document-page>
    </el-main>
    <!-- <el-dialog :show-close='false' width='395px' custom-class="loginPanel" :visible.sync="dialogTableVisible">
      <div class="loginPanel-body"></div>
      <account-main v-on:login:success="loginSuccess" ></account-main>
    </el-dialog> -->
  </el-container>
</template>
<script>
import WaHeader from '../Panel/Header/WaHeader'
import WaAside from '../Panel/Aside/WaAside1'
import AccountMain from '../Account/AccountMain'
import DocumentPage from './DocumentPage'

export default {
  name: 'index',
  components: {WaHeader, WaAside, AccountMain, DocumentPage},
  data () {
    return {
      currentTable: null,
      templateIndex: 0,
      dialogTableVisible: false,
      panelChangeBar: { current: 'dev', allType: [{label: 'dev', value: '开发面板'}, {label: 'doc', value: '文档面板'}] },
      currentApiId: null
    }
  },
  methods: {
    pushToTable (table) {
      console.log('Document-PANEL', table.aid)
      this.currentApiId = table.aid
    }
  }
}
</script>
<style lang="scss" type="text/css" scoped>
  .el-aside {
    /* background-color: #D3DCE6; */
    color: #333;
    height: 100%;
    width: auto !important;
  }
  
  .el-main {
    padding-top: 0px!important;
  }
  
  .el-container {
    height: 100%;
  }

  .el-footer{
    height: 21px !important;
  }

  .loginPanel{
    border-radius: 5px!important;
    .loginPanel-body{
      height: 305px;
    }
  }
</style>