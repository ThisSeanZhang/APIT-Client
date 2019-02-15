<template>
  <el-container>
    <el-header>
      <account-header></account-header>
    </el-header>
    <el-container>
      <el-main>
        <account-main v-on:login:success="loginSuccess" ></account-main>
      </el-main>
    </el-container>
    <el-footer><wa-footer></wa-footer></el-footer>
  </el-container>
</template>
<script>
import AccountHeader from './AccountHeader'
import AccountMain from './AccountMain'
import WaFooter from '../Footer/WaFooter'
export default {
  name: 'account-index',
  components: {AccountMain, AccountHeader, WaFooter},
  methods: {
    loginSuccess () {
      this.$router.push('/index')
    }
  }
}
</script>
<style lang="scss" type="text/css" scoped>
  .el-header {
    padding: 0px;
    color: #333;
    border-bottom: 1px solid #dcdfe6;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    height: 100%;
    width: auto !important;
  }
  .el-main {
    background-color: #ffffff;
    color: #333;
    // line-height: 160px;
    // align-items: center;
    // display: flex;
    position: relative;
    overflow: hidden;
  }
  .el-container {
    height: 100%;
  }
  .el-footer{
    height: 20px !important;
  }
</style>

