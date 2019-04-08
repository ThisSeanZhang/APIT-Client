<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import {ajax} from './api/fetch'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'api',
  data () {
    return {
      allow: false
    }
  },
  computed: {
    ...mapState('Setting', ['baseUrl']),
    ...mapState('UserInfo', ['developerId'])
  },
  methods: {
    ...mapActions('Setting', ['setBaseUrl']),
    ...mapActions('UserInfo', ['setUserInfo', 'delUserInfo']),
    fetchCurrentDeveloperInfo () {
      if (!this.developerId) {
        this.allow = true
        return
      }
      let request = {
        methods: 'GET',
        url: '/session/' + this.developerId
      }
      ajax(request)
        .then(resp => {
          this.setUserInfo(resp.data.data)
          this.allow = true
        })
        .catch(error => {
          console.log(error)
          this.$message('登入信息已经过期了,访问非公开信息需要重新登陆哦')
          // this.$notify({
          //   title: '状态提示',
          //   dangerouslyUseHTMLString: true,
          //   message: '<a href="/">点击去登陆</a>'
          // })
          this.delUserInfo()
          this.allow = true
        })
    }
  },
  created () {
    const isPro = Object.is(process.env.NODE_ENV, 'development')
    const baseUrl = isPro ? 'http://localhost:8080/' : 'https://apit.whileaway.io/'
    console.log('store', this.baseUrl)
    if (!this.baseUrl && this.baseUrl === null) {
      this.setBaseUrl(baseUrl)
    }
    // this.setBaseUrl('ccc')
    axios.defaults.baseURL = this.baseUrl
    console.log('baseUrl', baseUrl)
    console.log('store', this.baseUrl)
    console.log('axios.defaults.baseURL', axios.defaults.baseURL)

    this.fetchCurrentDeveloperInfo()
  }
}
</script>

<style type='text/css' >
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

/* body { font-family: 'Source Sans Pro', sans-serif; } */

html,body,#app{
 height: 100%;
}
*::-webkit-scrollbar{
  width: 8px;
  height: 8px;
}
*::-webkit-scrollbar-thumb {
  background: #6ec5b7;
}
*::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
