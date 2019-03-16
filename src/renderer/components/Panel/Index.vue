<template>
  <el-container>
    <el-header>
      <wa-header 
        v-on:flash:projectTree="flashProjectTree"
        v-on:create:api="pushToTable(currentTableTemplate())"
        v-on:open:accountPanel="openLoginPanel($event)"
      ></wa-header>
    </el-header>
    <el-container>
      <el-aside v-if="signed">
        <wa-aside 
        ref="aside"
        v-bind:show_modify="true"
        v-on:pushToTable="pushToTable($event)"
        v-on:removeTableByAId="removeTableByAId($event)"></wa-aside>
      </el-aside>
      <el-main>
        <main-table
        v-on:flash:projectTree="flashProjectTree"
        v-on:close:table="colseTable($event)"
        v-bind:tables="tables"
        v-model="currentTable"
        v-on:updateTable="updateTable($event)"></main-table>
      </el-main>
    </el-container>
    <el-dialog :show-close='false' width='395px' custom-class="loginPanel" :visible.sync="dialogTableVisible">
      <div class="loginPanel-body"></div>
      <account-main v-on:login:success="loginSuccess" ></account-main>
    </el-dialog>
  </el-container>
</template>
<script>
import WaHeader from './Header/WaHeader'
import WaAside from './Aside/WaAside1'
import MainTable from './Main/MainTable'
import AccountMain from '../Account/AccountMain'
import WaFooter from '../Footer/WaFooter'

import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {WaHeader, WaAside, MainTable, AccountMain, WaFooter},
  data () {
    return {
      tables: [],
      currentTable: null,
      templateIndex: 0,
      dialogTableVisible: false
    }
  },
  methods: {
    colseTable (target) {
      console.log('want remove targetName:', target)
      this.tables = this.tables.filter(tb => tb.aid !== target.remove)
      this.pushToTable(target.append)
    },
    removeTableByAId (aid) {
      console.log('want remove target aid:', aid)
      this.tables = this.tables.filter(tb => tb.aid !== aid)
      if (this.tables.length === 0) {
        this.templateIndex = 0
        this.tables.push(this.currentTableTemplate())
      }
      this.currentTable = this.tables[this.tables.length - 1].aid
    },
    updateTable (newTable) {
      this.tables = newTable
      console.log('index uptade tables', this.tables)
      if (this.tables.length === 0) {
        this.templateIndex = 0
        this.tables.push(this.currentTableTemplate())
      }
    },
    pushToTable (table) {
      table.aid = table.aid.toString()
      this.tables = this.tables.filter(t => t.aid !== table.aid)
      table.isDot = false
      table.showApiName = table.apiName
      this.tables.push(table)
      // if (this.tables.filter(t => t.aid === table.aid).length === 0) {
      //   table.isDot = false
      //   table.showApiName = table.apiName
      //   this.tables.push(table)
      // }
      this.currentTable = table.aid
      console.log(this.currentTable)
    },
    flashProjectTree () {
      this.$refs.aside.reflash()
    },
    currentTableTemplate: function () {
      this.templateIndex = this.templateIndex + 1
      return {
        isDot: false,
        aid: 'temp_api_' + this.templateIndex,
        apiName: 'API ' + this.templateIndex,
        showApiName: 'API ' + this.templateIndex,
        method: 'GET',
        bewrite: '',
        url: '',
        parameters: '',
        headers: '',
        body: '{"currentChoice":{"value":"","label":"none"},"formData":"","rawData":""}'
      }
    },
    openLoginPanel (e) {
      this.dialogTableVisible = e
    },
    loginSuccess () {
      this.dialogTableVisible = false
    }
  },
  computed: {
    ...mapState('UserInfo', ['signed']),
    ...mapState('EntitysContainer', ['projects'])
  },
  created () {
    // if (!this.signed) {
    //   this.$router.push('/')
    // }
    // this.tables = [{
    //   apiName: 'My Tab 1',
    //   aid: 'temp-1',
    //   parameters: '[{"checked":true,"key":"name","value":"Sean","description":"用户名"},{"checked":true,"key":"param","value":"456789","description":"密码"},{"checked":false,"key":"de","value":"王小虎","description":"上海市普陀区金沙江路"}]',
    //   headers: '[{"checked":true,"key":"Content-Type","value":"multipart/form-data;charset=utf-8","description":"","index":"0"}]',
    //   body: '{"currentChoice":{"value":"multipart/form-data","label":"formData"},"formData":[{"checked":false,"key":"username","type":"Text","value":"王小虎","description":"名称","index":"0"}],"rawData":""}'
    // }, {
    //   apiName: 'My Tab 2',
    //   aid: 'temp-2',
    //   headers: '[{"checked":true,"key":"Content-Type","value":"application/json;charset=utf-8","description":"","index":"0"}]',
    //   body: '{"currentChoice":{"value":"application/json","label":"raw"},"formData":[{"checked":false,"key":"username","type":"Text","value":"王小虎","description":"名称","index":"0"}],"rawData":"ccccc"}'
    // }]
    this.tables = [this.currentTableTemplate()]
    this.currentTable = this.tables[this.tables.length - 1].aid
    console.log(this)
  },
  activated () {
    this.flashProjectTree()
  }
}
</script>
<style lang="scss" type="text/css" scoped>
  .el-header {
    /* background-color: #B3C0D1; */
    padding: 0px;
    color: #333;
    /* height: 36px; */
    border-bottom: 1px solid #dcdfe6;
  }
  
  .el-aside {
    /* background-color: #D3DCE6; */
    color: #333;
    height: 100%;
    width: auto !important;
  }
  
  /* .el-main {
    background-color: #E9EEF3;
    color: #333;
  } */
  
  .el-container {
    height: 100%;
  }

  .el-footer{
    height: 21px !important;
    padding: 0px !important;
  }

  .loginPanel{
    border-radius: 5px!important;
    .loginPanel-body{
      height: 305px;
    }
  }
</style>