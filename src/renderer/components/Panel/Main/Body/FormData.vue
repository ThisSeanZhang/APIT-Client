<template>
  <el-table
    :data="formData"
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
        <el-input placeholder="key" v-model="scope.row.key" clearable>
          <el-select class="table-select" v-model="scope.row.type" slot="append" placeholder="请选择">
            <el-option label="Text" value="Text" ></el-option>
            <el-option label="File" value="File"></el-option>
          </el-select>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="值">
      <template slot-scope="scope">
        <el-input v-if="scope.row.type === 'Text'" placeholder="value" 
        v-model="scope.row.value"
        clearable>
        </el-input>
        <template v-else><input v-bind:data-index="scope.row.index" @change="fileBlur" type="file"></template>
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
  name: 'form-data',
  props: ['formData'],
  data () {
    return {
      checkAll: false,
      isIndeterminate: false,
      select: 'Text'
    }
  },
  computed: {
    indeterminate: function () {
      let checkedList = this.formData.filter(param => param.checked === true)
      let checkedCount = checkedList.length
      this.checkAll = checkedCount === this.formData.length
      return checkedCount > 0 && checkedCount < this.formData.length
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.formData.forEach((param, index) => {
        param.checked = val
      })
    },
    addParam () {
      this.formData.push({
        checked: true,
        key: 'username',
        type: 'Text',
        value: '王小虎',
        description: '名称',
        index: this.formData.length.toString()
      })
    },
    delParam (index) {
      this.formData.splice(index, 1)
      this.genTheIndex()
    },
    genTheIndex () {
      this.formData.forEach((param, index) => {
        param.index = index.toString()
      })
    },
    fileBlur (param) {
      // console.log('Blur File Target')
      // console.log('this param', param)
      // console.log('target', param.target)
      // console.log('files', param.target.files)
      // console.log('data', param.target.dataset.index)
      // console.log('变更后的formData', this.formData)
      let changeFile = this.formData[param.target.dataset.index]
      changeFile.value = param.target.files.length !== 0 ? param.target.files[0] : ''
      this.formData.splice(param.target.dataset.index, 1, changeFile)
      // console.log('Blur File Target End!')
    }
  },
  created () {
    // console.log(this.$refs.multipleTable)
    // this.formData.forEach(param => {
    //   console.log(param)
    //   console.log(this.$refs)
    //   this.$refs.multipleTable.toggleRowSelection(param, param.checked)
    // })
    this.genTheIndex()
    console.log(this.formData)
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
.table-select .el-input {
  width: 73px !important;
}
</style>
