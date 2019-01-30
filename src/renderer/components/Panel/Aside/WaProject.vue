<template>
  <div :class="projectClass">
    <div class="project_header" @click="openTheProject()">
      <span class="test"><i :class="iconClass"></i></span>
      <span class="project_title">{{project.projectName}}</span>
      <span class="edit"  >
        <i @click.stop="editProject" class="el-icon-edit-outline"></i></span>
    </div>
    <div>
      <el-tree 
      v-if="projectIsOpen"
      lazy 
      node-key="nid"
      :data="data" 
      :load="loadFolders" 
      :props="defaultProps"
      ref="project_tree"
      @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
</template>
<script>
import {ajax} from '../../../api/fetch'
export default {
  name: 'wa-project',
  props: ['project'],
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      projectIsOpen: false,
      filterText: ''
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    openTheProject () {
      this.projectIsOpen = !this.projectIsOpen
    },
    loadFolders (node, resolve) {
      console.log(node)
      if (node.level === 0) {
        return resolve([{
          label: '一级 1',
          nid: 1,
          leaf: true
        }, {
          label: '一级 1',
          nid: 2,
          leaf: false
        }])
      }
      if (node.data.nid === 2) {
        resolve([{
          label: '二级 1',
          nid: 3,
          leaf: false
        }])
      } else {
        this.getFolders(node, resolve)
      }
      console.log(this.data)
    },
    getFolders (node, container) {
      let request = {method: 'GET', url: 'http://localhost:8080/floders'}
      ajax(request).then(resp => {
        console.log(resp)
        // TODO 登入成功后的相应操作
        container(resp.data)
      }).catch(error => {
        this.whenErrorMessage(error, () => {
          this.$message.warning('没有东西欸(●ˇ∀ˇ●)')
        })
        node.loading = false
      })
    },
    whenErrorMessage (error, dowhat) {
      if (error.response) {
        if (error.response.status === 404) {
          dowhat()
        }
      } else if (error.request) {
        this.$message.error('发送失败请检查网络连接╮（╯＿╰）╭')
      } else {
        this.$message('欸，好像出错了_(:з)∠)_，再试一次吧')
      }
    },
    editProject () {
      console.log('编辑')
    }
  },
  computed: {
    iconClass: function () {
      return this.projectIsOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-right'
    },
    projectClass: function () {
      return this.projectIsOpen ? 'wa_project_focus wa_project' : 'wa_project_close wa_project'
    }
  },
  created () {
    console.log('创建了一个Project目录结构')
    // this.data = [{
    //   label: '一级 1',
    //   leaf: false,
    //   children: [{label: '二级 1-1', children: []}]
    // }, {
    //   label: '一级 2',
    //   leaf: false,
    //   children: [{label: '二级 2-1', children: []}]
    // }, {
    //   label: '一级 3',
    //   leaf: false,
    //   children: [{label: '二级 3-1', children: []}]
    // }]
  }
}
</script>
<style  type="text/css" lang="scss"  scoped>

.wa_project_close{
  height: 42px;
  overflow: hidden;
}
.wa_project_focus{
  height: auto;
}
.wa_project{
  // margin-left: 10px;
  position: relative;
  transition: height 0.6s;
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

