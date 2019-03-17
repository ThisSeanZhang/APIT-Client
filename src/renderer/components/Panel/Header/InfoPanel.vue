<template>
  <div>
    <div class="info-panel" v-if="signIn" >
      <div class="name-info">{{developerName}}</div>
      <el-button @click="logOut" type="info">
        退出<i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
    <div class="info-panel" v-else >
      <el-button @click="$emit('open:accountPanel', true)" type="warning">
        登入<i class="el-icon-back"></i>
      </el-button>
    </div>
  </div>
</template>
<script>

import { ajax } from '../../../api/fetch'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('UserInfo')
export default {
  name: 'info-panel',
  methods: {
    ...mapActions(['delUserInfo']),
    logOut () {
      let request = {
        method: 'DELETE',
        url: '/session/' + this.developerId
      }
      ajax(request).then(resp => {
        this.$message('退出成功')
        this.delUserInfo()
        this.$router.push('/')
      }).catch(error => {
        console.log(error)
        this.$message('退出失败')
      })
    }
  },
  computed: {
    signIn: function () {
      return (typeof this.developerName === 'string') &&
      this.developerName.constructor === String
    },
    ...mapState(['developerName', 'developerId'])
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
</style>