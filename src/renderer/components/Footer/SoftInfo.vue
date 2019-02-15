<template>
  <div class="soft-info-body">
    <div><i class="el-icon-arrow-right"></i><el-button type="text" @click="open('https://blog.whileaway.io/')" >MyBlog</el-button></div>
    <div><i class="el-icon-share"></i><el-button type="text" @click="open('https://github.com/ThisSeanZhang/APIT-Client')" >GitHub/APIT-Client</el-button></div>
    <div><i class="el-icon-share"></i><el-button type="text" @click="open('https://github.com/ThisSeanZhang/APIT-Server')" >GitHub/APIT-Server</el-button></div>
  </div>
</template>
<script>
export default {
  name: 'soft-info',
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>
<style lang="scss" type="text/css" scoped>
.soft-info-body{
  text-align: center;
}
</style>
