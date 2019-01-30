<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'api',
    data () {
      return {
        userInfo: null
      }
    }
  }
</script>

<style type='text/css' >
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
