<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item v-on:click="addTable" index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
    <el-menu-item index="5" v-on:click ="isCollapse = !isCollapse">
      <i class="el-icon-setting"></i>
    </el-menu-item>
  </el-menu>
</template>
<script type="text/javascript">
export default {
  name: 'wa-aside',
  props: ['tables'],
  data () {
    return {
      isCollapse: true,
      currentName: null
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    addTable (index) {
      console.log('before add table', this.tables)
      this.currentName = parseInt(this.tables[this.tables.length - 1].name) + 1
      console.log('after add table', this.currentName)
      this.$emit('pushToTable', {
        title: 'Aside new Table',
        name: this.currentName.toString(),
        content: 'My Tab ' + this.currentName + ' content'
      })
    }
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
  .el-menu-vertical-demo {
    height: 100%;
  }
  .el-menu--collapse{
    width: 64px;
  }
</style>
