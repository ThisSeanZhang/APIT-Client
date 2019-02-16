<template>
  <div class="doc-api">
    <div class="doc-api-header">
      <span>POST</span>
      用户注册</div>
    <div class="doc-api-title">
      API的描述信息
    </div>
    <p class="doc-api-text">
      API的描述信息API的描述信息API的描述信息API的描述信息
      API的描述信息API的描述信息API的描述信息API的描述信息
      API的描述信息API的描述信息API的描述信息API的描述信息
      API的描述信息API的描述信息API的描述信息API的描述信息
      API的描述信息API的描述信息API的描述信息API的描述信息
      API的描述信息API的描述信息API的描述信息API的描述信息
      API的描述信息API的描述信息
    </p>
    <div class="doc-api-title">
      请求的URL
    </div>
    <p class="doc-api-text">
      http://apit.whileaway.io
    </p>
    <div class="doc-api-title">
      请求的方式
    </div>
    <p class="doc-api-text">
      POST
    </p>
    <div class="doc-api-title">
      请求头
    </div>
    <div class="doc-api-table">
      <el-table
        :data="tableData"
        stripe>
        <el-table-column
          align="center"
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
    <div class="doc-api-title">
      请求的查询参数
    </div>
    <div class="doc-api-table">
      <el-table
        :data="tableData"
        stripe>
        <el-table-column
          align="center"
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
    <div class="doc-api-title">
      请求体
    </div>
    <div class="doc-api-table">
      <el-table
        :data="tableData"
        stripe>
        <el-table-column
          align="center"
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'document-page',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  }
}
</script>
<style lang="scss" type="text/css" scoped>
.doc-api {
  font-weight: 400;
  .doc-api-header{
    font-size: 20px;
    font-weight: 900;
    border-bottom: 1px solid #dcdfe6;
    margin: 13px 0px 20px 0px;
  }
  .doc-api-title{
    font-size: 18px;
    margin: 15px 0px;
  }
  .doc-api-text{
    font-size: 13px;
    margin: 5px 0px;
    background-color: #e4e4e4;
    border-radius: 4px;
    padding: 10px;
    text-indent: 25px;
    letter-spacing: 0.5px; 
  }
  .doc-api-table{
    border-radius: 4px;
  }
}
</style>