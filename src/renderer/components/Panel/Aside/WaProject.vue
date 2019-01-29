<template>
  <div :class="projectClass">
    <div class="project_header" @click="openTheProject()">
      <span class="test"><i :class="iconClass"></i></span>
      <span class="project_title">{{project.projectName}}</span>
      <span class="edit" ><i class="el-icon-edit-outline"></i></span>
    </div>
    <el-tree  :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
export default {
  name: 'wa-project',
  props: ['project'],
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      descriptionIsOpen: false,
      projectIsOpen: false
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    openTheProject () {
      this.projectIsOpen = !this.projectIsOpen
      this.descriptionIsOpen = !this.descriptionIsOpen
    }
  },
  computed: {
    iconClass: function () {
      return this.descriptionIsOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-right'
    },
    projectClass: function () {
      return this.projectIsOpen ? 'wa_project_focus wa_project' : 'wa_project_close wa_project'
    }
  },
  created () {
    this.data = [{
      label: '一级 1',
      children: [{label: '二级 1-1', children: []}]
    }, {
      label: '一级 2',
      children: [{label: '二级 2-1', children: []}]
    }, {
      label: '一级 3',
      children: [{label: '二级 3-1', children: []}]
    }]
  }
}
</script>
<style  type="text/css" lang="scss"  scoped>

.wa_project_close{
  height: 42px;
  overflow: hidden;
  transition: height 0.6s;
}
.wa_project_focus{
  height: auto;
}
.wa_project{
  // margin-left: 10px;
  position: relative;
  // background-color: hotpink;
  // border-bottom: 1px solid #333;
  border-bottom: 1px solid #dcdfe6;
  .test{
    position: absolute;
    top: 0px;
    padding: 15px;
    i{
      position: inherit;
    }
  }
  .edit{
    position: absolute;
    top: 0px;
    padding: 13px;
    right: 0px;
  }
  .project_title{
    position: absolute;
    top: 0px;
    padding: 10px 0px 10px 40px;
  }
  .project_header{
    cursor: pointer;
    border-bottom: 1px solid #dcdfe6;
    height: 42px;
  }
}
</style>

