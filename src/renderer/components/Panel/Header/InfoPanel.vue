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
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('UserInfo')
export default {
  name: 'info-panel',
  methods: {
    ...mapActions(['delUserInfo']),
    logOut () {
      this.delUserInfo()
      this.$router.push('/')
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