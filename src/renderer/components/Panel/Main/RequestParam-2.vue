<template>
  <el-table
    :data="parameters"
    style="width: 100%">
    <el-table-column
      width="40">
      <template slot="header" slot-scope="scope">
        <el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </template>
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.checked" ></el-checkbox>
      </template>
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
      align="right"
      width="52"
      show-overflow-tooltip>
      <template slot="header" slot-scope="scope">
        <el-button icon="el-icon-plus" size="small" @click="addParam" circle></el-button>
      </template>
      <template slot-scope="scope">
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="delParam(scope.row.index)" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'request-param',
  props: ['parameters'],
  data () {
    return {
      checkAll: false,
      isIndeterminate: false
    }
  },
  computed: {
    indeterminate: function () {
      let checkedList = this.parameters.filter(param => param.checked === true)
      let checkedCount = checkedList.length
      this.checkAll = checkedCount === this.parameters.length
      return checkedCount > 0 && checkedCount < this.parameters.length
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.parameters.forEach((param, index) => {
        param.checked = val
      })
    },
    addParam () {
      this.parameters.push({
        checked: true,
        key: '2016-05-03',
        value: '王小虎',
        description: '上海市普陀区金沙江路',
        index: this.parameters.length.toString()
      })
    },
    delParam (index) {
      this.parameters.splice(index, 1)
      this.genTheIndex()
    },
    genTheIndex () {
      this.parameters.forEach((param, index) => {
        param.index = index.toString()
      })
    }
  },
  created () {
    // console.log(this.$refs.multipleTable)
    // this.parameters.forEach(param => {
    //   console.log(param)
    //   console.log(this.$refs)
    //   this.$refs.multipleTable.toggleRowSelection(param, param.checked)
    // })
    this.genTheIndex()
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
