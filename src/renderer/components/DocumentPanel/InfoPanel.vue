<template>
  <div>
    <div class="info-panel" v-if="signed" >
      <el-tooltip class="item" effect="dark" :content="message" placement="top">
        <div class="name-info" style="cursor: pointer;" @click.stop="clickName">{{developerName}}</div>
      </el-tooltip>
      <el-button @click="logOut" type="info" >
        退出<i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
    <div class="info-panel" v-else >
      <el-button @click.stop="SignInVisible = true" type="warning">
        登入<i class="el-icon-back"></i>
      </el-button>
      <el-dialog :show-close='false' width='395px' custom-class="loginPanel" :visible.sync="SignInVisible">
        <div class="loginPanel-body"></div>
        <account-main v-on:login:success="$emit('login:success')" ></account-main>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import AccountMain from '../Account/AccountMain'
import { createNamespacedHelpers } from 'vuex'
import { ajax } from '../../api/fetch'
const { mapState, mapActions } = createNamespacedHelpers('UserInfo')
export default {
  name: 'info-panel',
  components: {AccountMain},
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      SignInVisible: false
    }
  },
  methods: {
    ...mapActions(['delUserInfo']),
    logOut () {
      let request = {
        method: 'DELETE',
        url: '/session/' + this.developerId
      }
      ajax(request)
        .then(resp => {
          this.$message('退出成功')
          this.delUserInfo()
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
          this.$message('退出失败')
        })
    },
    clickName () {
      this.$emit('click:name')
    }
  },
  computed: {
    ...mapState(['signed', 'developerName', 'developerId'])
  }
}
</script>
<style lang="scss" type="text/css" scoped>
.info-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  .name-info {
    margin: 0px 10px;
  }
}
.loginPanel{
    border-radius: 5px!important;
    .loginPanel-body{
      height: 305px;
    }
  }
</style>
