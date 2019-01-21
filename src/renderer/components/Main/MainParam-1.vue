<template>
  <el-table
    ref="multipleTable"
    :data="parameters"
    tooltip-effect="dark"
    :row-key="getRowKey"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      reserve-selection=true
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="参数名">
      <template slot-scope="scope">
        <el-input
        placeholder="key"
        v-model="scope.row.key"
        clearable>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="值">
      <template slot-scope="scope">
        <el-input
        placeholder="value"
        v-model="scope.row.value"
        clearable>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="描述">
      <template slot-scope="scope">
        <el-input
        placeholder="description"
        v-model="scope.row.description"
        clearable>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      width="52"
      align="right"
      show-overflow-tooltip>
      <template slot="header" slot-scope="scope">
        <el-button icon="el-icon-plus" size="small" circle></el-button>
      </template>
      <template slot-scope="scope">
        <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'main-param',
  props: ['parameters'],
  data () {
    return {
      ParamTable: [],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    getRowKey (row) {
      return row.rowkey
    }
  },
  created () {
    // console.log(this.$refs.multipleTable)
    // this.parameters.forEach(param => {
    //   console.log(param)
    //   console.log(this.$refs)
    //   this.$refs.multipleTable.toggleRowSelection(param, param.checked)
    // })
    this.parameters.forEach((param, index) => {
      param.rowkey = index.toString()
    })
    console.log(this.parameters)
  }
}
</script>
<style type="text/css" lang="scss">
.el-table{
  td{
    padding: 5px;
  }
  th {
    padding: 0 5px;
  }
}
</style>
