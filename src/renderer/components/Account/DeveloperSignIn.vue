<template>
  <div>
    <el-form :model="loginform" label-position="top" :rules="rules" ref="loginForm"  label-width="80px">
      <el-form-item prop="developerName" >
        <el-input v-model="loginform.developerName" @focus="clearLogError" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="developerPass" >
        <el-input v-model="loginform.developerPass" @focus="clearLogError" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        记住我 &nbsp;&nbsp;&nbsp;<el-switch v-model="loginform.remeberme"></el-switch>
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
    var chepass = (rule, value, callback) => {
      if (!this.loginPass) {
        callback(new Error('用户名或密码错误'))
      } else {
        callback()
      }
    }
    return {
      loginform: {
        developerName: '',
        developerPass: '',
        remeberme: false
      },
      loginPass: true,
      rules: {
        developerName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' },
          {validator: chepass}
        ],
        developerPass: [
          { required: true, message: '请选择活动区域', trigger: 'blur' },
          {validator: chepass}
        ]
      }
    }
  },
  methods: {
    userlogin () {
      // apis.LOGIN(this.loginform).then(res => {
      //   console.log(res);
      //   this.$router.push("home");
      // });
      this.loginPass = false
      this.$refs['loginForm'].validateField(['developerName', 'developerPass'])
    },
    clearLogError () {
      this.loginPass = true
      this.$refs['loginForm'].validateField(['developerName', 'developerPass'])
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

