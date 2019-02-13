<template>
  <el-row type="flex" :gutter="20" justify="space-around" style="margin-top: 1%;">
    <el-col :span="4">
      <el-button @click="$router.push('/index')" type="primary">
        先不登入?<i class="el-icon-d-arrow-right"></i>
      </el-button>
    </el-col>
    <el-col :span="15">
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>
<script>
export default {
  name: 'account-header'
}
</script>
<style type="text/css" scoped>
.el-row {
  margin-left: 0px!important;
  margin-right: 0px!important;
}
</style>
