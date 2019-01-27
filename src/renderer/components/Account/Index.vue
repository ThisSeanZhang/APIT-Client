<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-main>
        <div class="form_box">
          <div class="from_head">
            <div @click="changePanel" :class="{ active: readyLogin }">登录</div>
            <div @click="changePanel" :class="{ active: !readyLogin }">  注册</div>
          </div> 
          <transition name="fade" >
            <developer-register class="input_box" v-if="readyLogin"></developer-register>
            <developer-sign-in class="input_box" v-else></developer-sign-in>
          </transition>
          
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import DeveloperRegister from './DeveloperRegister'
import DeveloperSignIn from './DeveloperSignIn'
export default {
  name: 'account-index',
  components: {DeveloperRegister, DeveloperSignIn},
  data () {
    return {
      readyLogin: true
    }
  },
  methods: {
    changePanel () {
      this.readyLogin = !this.readyLogin
    }
  }
}
</script>
<style lang="scss" type="text/css" scoped>
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
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 160px;
    align-items: center;
    display: flex;
  }
  .el-container {
    height: 100%;
  }
  
  .form_box{
    margin: 0 auto;
    width: 400px;
    height: 400px;
    padding: 20px 10px;
    border: 1px solid rgba(76, 107, 107, 0.19);
    box-shadow: 10px 10px 2px #f0f0f0;
    border-radius: 5px;
    position: relative;
    .from_head {
      height: 40px;
      line-height: 40px;
      font-size: 24px;
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      width: 100%;
      margin: 0 auto;
      div:first-child {
        flex: 1;
      }
      div:last-child{
        flex: 1;
      }
    }
  }
  .active{
    border-bottom: 1px solid #333;
  }
  .input_box{
    position:absolute;
    width: 96%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

