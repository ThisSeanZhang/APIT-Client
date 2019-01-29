<template>
  <div>
    <el-form :model="registerForm" label-position="top" ref="register_form" :rules="rules"  label-width="80px">
      <el-form-item prop="developerName">
        <el-input v-model="registerForm.developerName" @focus="clearLogError" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="developerPass">
        <el-input v-model="registerForm.developerPass" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPass">
        <el-input v-model="registerForm.confirmPass" placeholder="确认密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="developerRegister">注册</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="forget"><span>忘记密码</span> </div> -->
  </div>
</template>

<script>
// import axios from 'axios'
import {ajax} from '../../api/fetch'
import { Loading } from 'element-ui'
export default {
  name: 'register',
  props: ['value'],
  data () {
    var developerNameValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'))
      } else if (this.developerNameExist) {
        callback(new Error('昵称已存在'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.confirmPass !== '') {
          this.$refs.register_form.validateField('confirmPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.developerPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        developerName: '',
        email: '',
        confirmPass: '',
        developerPass: ''
      },
      developerNameExist: false,
      rules: {
        developerName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' },
          {validator: developerNameValidator}
        ],
        developerPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { message: '长度在1到16个字符,只允许出现_-=!@#以及数字和字母', pattern: /^[a-zA-Z_\-!@#0-9=]{6,16}$/, trigger: 'blur' },
          {validator: validatePass, trigger: 'blur'}
        ],
        confirmPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { message: '长度在1到16个字符,只允许出现_-=!@#以及数字和字母', pattern: /^[a-zA-Z_\-!@#0-9]{6,16}$/, trigger: 'blur' },
          {validator: validatePass2, trigger: 'blur'}
        ],
        email: [
          { type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    developerRegister () {
      // this.developerNameExist = true
      this.$refs.register_form.validate(isAllPass => {
        if (isAllPass) {
          let loding = Loading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(255, 255, 255, 0.6)'
          })
          let request = {method: 'GET', url: 'http://localhost:8080/developers/developer-name/' + this.registerForm.developerName}
          ajax(request).then(resp => {
            console.log(resp)
            this.developerNameExist = true
            this.$refs.register_form.validateField('developerName')
            this.$message('当前用户名已存在(●ˇ∀ˇ●)')
            loding.close()
          }).catch(error => {
            this.whenErrorMessage(error, this.sendRegisterInfo, true)
            loding.close()
          })
        }
      })
    },
    clearLogError () {
      this.developerNameExist = false
      this.$refs.register_form.validateField('developerName')
    },
    sendRegisterInfo () {
      let request = {method: 'POST', url: 'http://localhost:8080/developers', data: this.registerForm}
      return ajax(request).then(resp => {
        console.log(resp)
        this.$message({type: 'success', message: '注册成功[]~(￣▽￣)~*'})
        this.$emit('input', true)
      }).catch(error => {
        this.whenErrorMessage(error, () => {})
      })
    },
    whenErrorMessage (error, dowhat, isSlience = false) {
      if (error.response) {
        if (error.response.status === 404) {
          dowhat()
        }
        if (!isSlience) {
          this.$message('欸，好像出错了_(:з)∠)_，再试一次吧')
        }
      } else if (error.request) {
        // console.log(error.request)
        this.$message.error('发送失败请检查网络连接╮（╯＿╰）╭')
      } else {
        // console.log('Error', error.message)
        this.$message('欸，好像出错了_(:з)∠)_，再试一次吧')
      }
      // console.log(error.config)
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

