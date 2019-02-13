<template>
  <!-- <el-menu :default-active="activeIndex" type="flex" justify="end" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1"><p @click="$router.push('/')">处理中心</p></el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>
  </el-menu> -->
  <el-row type="flex" :gutter="20" justify="space-around" style="margin-top: 1%;">
    <el-col :span="4">
      <el-button @click="handleCommand(createWhat.API)" type="primary">
        <i class="el-icon-plus"></i>新建个API
      </el-button>
      <!-- <el-dropdown  @command="handleCommand" trigger="click">
        <el-button type="primary">
          新建些什么呢<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu  slot="dropdown" >
          <el-dropdown-item :command='createWhat.API' class="el-icon-plus">&nbsp;API &nbsp; </el-dropdown-item>
          <el-dropdown-item :command='createWhat.FOLDER' class="el-icon-document">&nbsp;文件夹 &nbsp; </el-dropdown-item>
          <el-dropdown-item :command='createWhat.PROJECT' class="el-icon-date">&nbsp;项目 &nbsp;</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </el-col>
    <el-col :span="15">
    </el-col>
    <el-col :span="4"><info-panel v-on:open:accountPanel="openLoginPanel" ></info-panel></el-col>
  </el-row>
</template>
<script>
import InfoPanel from './InfoPanel'
export default {
  name: 'wa-header',
  components: {InfoPanel},
  data () {
    return {
      createWhat: {API: 'API', FOLDER: 'FOLDER', PROJECT: 'PROJECT'}
    }
  },
  methods: {
    // handleClick () {
    //   this.$message('_(:з)∠)_, 还没有来得及写哦，试试旁边的按钮吧')
    // },
    handleCommand (command) {
      var action = {
        'API': () => { this.$emit('create:api', 'ccc') },
        'FOLDER': () => { this.$message('暂未编写') },
        'PROJECT': () => { this.$message('暂未编写') }
      }
      return action[command]()
    },
    openLoginPanel (target) {
      this.$emit('open:accountPanel', target)
    }
  }
}
</script>
<style type="text/css">
/* .el-menu-demo{
  float: right;
  
} */
.el-row {
  margin-left: 0px!important;
  margin-right: 0px!important;
}
</style>
