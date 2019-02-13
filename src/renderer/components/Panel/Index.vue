<template>
  <el-container>
    <el-header>
      <wa-header 
        v-on:create:api="pushToTable(currentTableTemplate())"
        v-on:open:accountPanel="openLoginPanel($event)"
      ></wa-header>
    </el-header>
    <el-container>
      <el-aside v-if="signed">
        <wa-aside 
        ref="aside"
        v-bind:tables="tables"
        v-on:pushToTable="pushToTable($event)"></wa-aside>
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
    <el-footer>Footer</el-footer>
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

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')

export default {
  name: 'index',
  components: {WaHeader, WaAside, MainTable, AccountMain},
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
      // console.log('want remove targetName:', target)
      this.tables = this.tables.filter(tb => tb.aid !== target.remove)
      this.pushToTable(target.append)
    },
    updateTable (newTable) {
      this.tables = newTable
      // console.log('index uptade tables', this.tables)
      if (this.tables.length === 0) {
        this.templateIndex = 0
        this.tables.push(this.currentTableTemplate())
      }
    },
    pushToTable (table) {
      table.aid = table.aid.toString()
      if (this.tables.filter(t => t.aid === table.aid).length === 0) {
        table.isDot = false
        table.showApiName = table.apiName
        this.tables.push(table)
      }
      this.currentTable = table.aid
      // console.log(this.currentTable)
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
    ...mapState(['signed'])
  },
  created () {
    // if (!this.signed) {
    //   this.$router.push('/')
    // }
    this.tables = [this.currentTableTemplate()]
    this.currentTable = this.tables[this.tables.length - 1].aid
    // console.log(this)
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
  
  .el-container {
    height: 100%;
  }

  .el-footer{
    height: 20px !important;
  }

  .loginPanel{
    border-radius: 5px!important;
    .loginPanel-body{
      height: 305px;
    }
  }
</style>