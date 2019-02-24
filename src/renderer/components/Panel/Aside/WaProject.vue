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
      @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <!-- <el-button v-if="!node.isLeaf"
              type="text"
              size="mini"
              @click="() => append(data)">
              Info
            </el-button> -->
            <folder-info-panel v-on:update:list="$emit('update:list')" v-bind:nid="data.nid" v-bind:pid="data.belongProject" v-if="!node.isLeaf" ></folder-info-panel>
            <!-- <el-popover placement="top" width="160" v-model="visible2">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                <el-button type="primary" size="mini" @click.stop="() => {remove(node, data); visible2 = false}">确定</el-button>
              </div>
              <el-button type="text" size="mini" @click.stop class="delete-text" slot="reference">删除</el-button>
            </el-popover> -->
            <delete-popover v-on:confirm:del="() => remove(node, data)" ></delete-popover>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
import {ajax} from '../../../api/fetch'
import DeletePopover from './DeletePopover'
import FolderInfoPanel from './FolderInfoPanel'
export default {
  name: 'wa-project',
  props: ['project'],
  components: {DeletePopover, FolderInfoPanel},
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
          url: 'projects/' + this.project.pid + '/content/first-layer',
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
    editProject () {
      // console.log('编辑')
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
        this.$message('删除失败了')
      })
    },
    removeNode (node, data, target) {
      console.log('aid = ' + target.id)
      if (target.label === 'api') {
        this.$emit('del:api', target.id)
      } else if (target.label === 'folder') {
        console.log('folder id', target.id)
      }
      console.log(node, data)
      const parent = node.parent
      const children = parent.childNodes
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
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
  }
  
</style>

