<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'api'
  }
</script>

<style type='text/css' >
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

body { font-family: 'Source Sans Pro', sans-serif; }

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
