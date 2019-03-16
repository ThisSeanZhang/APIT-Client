<template>
  <div :class="projectClass">
    <div class="project_header" @click="openTheProject()">
      <span class="test"><i :class="iconClass"></i></span>
      <span class="project_title">{{project.projectName}}</span>
      <span class="edit" v-if="show_modify" >
        <i @click.stop="editProject(project.pid)" class="el-icon-edit-outline"></i></span>
    </div>
    <div>
      <el-tree 
      v-if="projectIsOpen"
      lazy 
      node-key="nid"
      :data="data" 
      :indent = "5"
      :load="loadFolders" 
      :props="defaultProps"
      ref="project_tree"
      @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span class="folder-btn" v-if="signed">
            <el-button
              v-if="data.leaf === false"
              @click.stop="modifyFolder({pid: data.belongProject, fid: data.contain})"
              type="text" size="mini"
              slot="reference">修改</el-button>
          </span>
        </span>
      </el-tree>
      <folder-info-panel
      v-if="modifyFolderVisible"
      v-model="modifyFolderVisible" 
      v-bind:focus="focusFolder"
      v-on:flash:folders="$emit('update:list')"
      ></folder-info-panel>
      <modify-project
        v-if="modifyProjectVisible"
        v-model="modifyProjectVisible"
        v-bind:pid="focusPid"
        v-on:flash:projects="$emit('update:list')">
      </modify-project>
    </div>
  </div>
</template>
<script>
import {ajax} from '../../../api/fetch'
import DeletePopover from './DeletePopover'
import FolderInfoPanel from './FolderInfoPanel'
import ModifyProject from './ModifyProject'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'wa-project',
  props: ['project', 'show_modify'],
  components: {DeletePopover, FolderInfoPanel, ModifyProject},
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
      filterText: '',
      modifyFolderVisible: false,
      focusFolder: {
        pid: null,
        fid: null
      },
      modifyProjectVisible: false,
      focusPid: null
    }
  },
  methods: {
    modifyFolder (focus) {
      this.modifyFolderVisible = true
      this.focusFolder = focus
    },
    handleNodeClick (data) {
      if (data.leaf) {
        let request = {
          method: 'GET',
          url: 'projects/' + this.project.pid + '/apis/' + data.contain
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
          url: 'projects/' + this.project.pid + '/content/first_layer',
          data: {
            ownerId: this.project.projectOwner
          }}
        this.getFolders(node, resolve, request)
      } else {
        let request = {
          method: 'GET',
          url: 'projects/' + this.project.pid + '/folders/' + node.data.contain + '/content',
          data: {
            belongProject: this.project.pid,
            ownerId: this.project.projectOwner
          }}
        this.getFolders(node, resolve, request)
      }
      // console.log(this.data)
    },
    getFolders (node, container, request) {
      // let request = {method: 'GET', url: 'http://localhost:8080/floders'}
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
    editProject (pid) {
      this.modifyProjectVisible = true
      this.focusPid = pid
    },
    remove (node, data) {
      const list = data.nid.split('-')
      const target = { label: list[0], id: list[1] }
      let request = {
        method: 'DELETE',
        url: 'projects/' + this.project.pid + '/' + target.label + 's/' + data.contain
      }
      ajax(request).then(resp => {
        // console.log(resp)
        // TODO 登入成功后的相应操作
        // container(resp.data.data)
        this.removeNode(node, data, target)
      }).catch(error => {
        console.log(error)
        this.$message('删除失败了_(:з)∠)_，再试一次吧')
      })
    },
    removeNode (node, data, target) {
      console.log('aid = ' + target.id)
      if (target.label === 'api') {
        this.$emit('del:api', target.id)
      } else if (target.label === 'folder') {
        this.$emit('del:folder', target.id)
        console.log('folder id', target.id)
      }
      console.log(node, data)
      const parent = node.parent
      const children = parent.childNodes
      const index = children.findIndex(d => d.key === data.nid)
      children.splice(index, 1)
    }
  },
  computed: {
    iconClass: function () {
      return this.projectIsOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-right'
    },
    projectClass: function () {
      return this.projectIsOpen ? 'wa_project_focus wa_project' : 'wa_project_close wa_project'
    },
    ...mapState(['developerId', 'signed', 'admin'])
  },
  created () {
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
    padding: 15px 10px 15px 6px;
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
    padding: 10px 0px 10px 24px;
  }
  .project_header{
    cursor: pointer;
    border-bottom: 1px solid #dcdfe6;
    height: 42px;
  }
}
.custom-tree-node {
    flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .folder-btn{
    display: none;
    button {
      margin: 0px;
    }
  }
}
.custom-tree-node:hover .folder-btn {
  display: inline;
}
.delete-text{
  color: #f56c6c;
}
.delete-text:hover{
  color: #f56c6c85;
}
.folder-add-btn {
  margin-top: 2px;
  width: 100%;
}
</style>

