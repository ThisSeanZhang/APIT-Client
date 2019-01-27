<template>
  <div>
    <el-form label-position="top" ref="form"  label-width="80px">
      <el-form-item>
        <el-input v-model="loginform.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginform.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginform.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userlogin">登录</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="forget"><span>忘记密码</span> </div> -->
  </div>
</template>

<script>
export default {
  name: 'register',
  props: ['value'],
  data () {
    return {
      loginform: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    userlogin () {
      if (!(this.loginform.username && this.loginform.password)) {
        alert('请输入没有输入账号或者密码')
      }
      // apis.LOGIN(this.loginform).then(res => {
      //   console.log(res);
      //   this.$router.push("home");
      // });
    }
  }
}
</script>
<style lang="scss" scoped>
// .el-form-item__content {
//   button {
//     width: 100%;
//     background: #409effb8;
//     border: #409effb8;
//   }
// }
// .forget {
//   font-size: 16px;
//   height: 40px;
//   margin-bottom: 22px;
//   line-height: 40px;
//   text-align: right;
//   color: #a5dce9;
//   span {
//     margin-right: 10px;
//   }
// }
.el-form {
  padding: 20px 10px;
  .el-form-item {
    .el-button{
      width: 100%;
    }
  }
}
  
</style>

