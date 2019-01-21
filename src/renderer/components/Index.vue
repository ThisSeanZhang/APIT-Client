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
        v-on:updateTable="updateTable($event)"></main-table>
      </el-main>
      <!-- <el-main><main-table v-on:updateTable="updateTable($event)"  v-bind:tables="tables"></main-table></el-main> -->
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
import WaHeader from './Header/WaHeader'
import WaAside from './Aside/WaAside'
import MainTable from './Main/MainTable'
export default {
  name: 'index',
  components: {WaHeader, WaAside, MainTable},
  data () {
    return {
      tables: [],
      currentTable: 0
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
          title: 'My Tab 1',
          name: '1',
          content: 'My Tab 1 content'
        })
      }
    },
    pushToTable (table) {
      this.tables.push(table)
    }
  },
  created () {
    this.tables = [{
      title: 'My Tab 1',
      name: '1',
      content: 'My Tab 1 content'
    }, {
      title: 'My Tab 2',
      name: '2',
      content: 'My Tab 2 content'
    }]
    this.currentTable = this.tables.length - 1
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
    background-color: #D3DCE6;
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