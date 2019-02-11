<template>
  <el-container>
    <el-header><wa-header></wa-header></el-header>
    <el-container>
      <el-aside>
        <wa-aside 
        v-bind:tables="tables"
        v-on:pushToTable="pushToTable($event)"></wa-aside>
      </el-aside>
      <el-main>
        <main-table 
        v-on:removeTable="removeTable($event)" 
        v-bind:tables="tables"
        v-bind:tableIsDot="tableIsDot"
        v-model="currentTable"
        v-on:updateTable="updateTable($event)"></main-table>
      </el-main>
      <!-- <el-main><main-table v-on:updateTable="updateTable($event)"  v-bind:tables="tables"></main-table></el-main> -->
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
import WaHeader from './Header/WaHeader'
import WaAside from './Aside/WaAside1'
import MainTable from './Main/MainTable'
export default {
  name: 'index',
  components: {WaHeader, WaAside, MainTable},
  data () {
    return {
      tables: [],
      tableIsDot: [],
      currentTable: null
    }
  },
  methods: {
    removeTable (targetName) {
      console.log('want remove targetName:' + targetName)
      // let tabs = this.tables
      // let activeTab = this.currentTable
      // console.log('emit from table', index)
      // this.tables.splice(index, 1)
      // this.tables = this.tables.filter(tab => tab.name !== targetName)
    },
    updateTable (newTable) {
      this.tables = newTable
      console.log('index uptade tables', this.tables)
      if (this.tables.length === 0) {
        this.tables.push({
          apiName: 'My Tab 1',
          aid: '99',
          content: 'My Tab 1 content'
        })
      }
    },
    pushToTable (table) {
      if (this.tables.filter(t => t.aid === table.aid).length === 0) {
        this.tables.push(table)
      }
      this.currentTable = table.aid
      console.log(this.currentTable)
    }
  },
  created () {
    this.tables = [{
      apiName: 'My Tab 1',
      aid: '88',
      parameters: '[{"checked":true,"key":"name","value":"Sean","description":"用户名"},{"checked":true,"key":"param","value":"456789","description":"密码"},{"checked":false,"key":"de","value":"王小虎","description":"上海市普陀区金沙江路"}]',
      headers: '[{"checked":true,"key":"Content-Type","value":"multipart/form-data;charset=utf-8","description":"","index":"0"}]',
      body: '{"currentChoice":{"value":"multipart/form-data","label":"formData"},"formData":[{"checked":false,"key":"username","type":"Text","value":"王小虎","description":"名称","index":"0"}],"rawData":""}'
    }, {
      apiName: 'My Tab 2',
      aid: '66',
      headers: '[{"checked":true,"key":"Content-Type","value":"application/json;charset=utf-8","description":"","index":"0"}]',
      body: '{"currentChoice":{"value":"application/json","label":"raw"},"formData":[{"checked":false,"key":"username","type":"Text","value":"王小虎","description":"名称","index":"0"}],"rawData":"ccccc"}'
    }]
    this.currentTable = this.tables[this.tables.length - 1].aid
    console.log(this.currentTable)
    this.tableIsDot = Array(this.tables.length).fill(false)
  }
}
</script>
<style type='text/css'>
  .el-header {
    background-color: #B3C0D1;
    padding: 0px;
    color: #333;
    height: 36px;
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
    height: 20px !important;
  }
</style>