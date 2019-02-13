<template>
  <div :class="projectClass">
    <div class="project_header" @click="openTheProject()">
      <span class="test"><i :class="iconClass"></i></span>
      <span class="project_title">{{project.projectName}}</span>
      <!-- <span class="edit"  >
        <i @click.stop="editProject" class="el-icon-edit-outline"></i>
      </span> -->
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
      requestUrl: {SUCCESS: 1, NOTFOUND: 2, REQUEST_ERROR: 3, FETCHING: 4},
      projectIsOpen: false,
      filterText: ''
    }
  },
  methods: {
    handleNodeClick (data) {
      if (data.leaf) {
        let request = {
          method: 'GET',
          url: 'http://localhost:8080/apis/' + data.contain
        }
        ajax(request).then(resp => {
          // TODO 获取成功后的相应操作
          // console.log(resp.data)
          this.$emit('get:api', resp.data)
        }).catch(error => {
          this.whenErrorMessage(error, () => {
            this.$message.warning('没有东西欸(●ˇ∀ˇ●)')
          })
        })
      }
      // console.log(data)
    },
    openTheProject () {
      this.projectIsOpen = !this.projectIsOpen
    },
    loadFolders (node, resolve) {
      // console.log(node)
      // console.log(this.project)
      if (node.level === 0) {
        let request = {
          method: 'GET',
          url: 'http://localhost:8080/projects/' + this.project.pid + '/content/first-layer',
          data: {
            ownerId: this.project.projectOwner
          }}
        this.getFolders(node, resolve, request)
      } else {
        let request = {
          method: 'GET',
          url: 'http://localhost:8080/nodes/content',
          data: {
            belongProject: this.project.pid,
            ownerId: this.project.projectOwner,
            parentId: node.data.nid
          }}
        this.getFolders(node, resolve, request)
      }
      // console.log(this.data)
    },
    getFolders (node, container, request) {
      ajax(request).then(resp => {
        // console.log(resp)
        // TODO 登入成功后的相应操作
        container(resp.data.data)
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
      // console.log('编辑')
    }
  },
  computed: {
    iconClass: function () {
      return this.projectIsOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-right'
    },
    projectClass: function () {
      return this.projectIsOpen ? 'wa_project_focus wa_project' : 'wa_project_close wa_project'
    }
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

