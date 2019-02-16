<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('Setting')

export default {
  name: 'api',
  computed: {
    ...mapState(['baseUrl'])
  },
  methods: {
    ...mapActions(['setBaseUrl'])
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
