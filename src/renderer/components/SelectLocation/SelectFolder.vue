<template>
  <el-tree
    lazy 
    node-key="nid"
    :data="data" 
    :indent = "5"
    accordion
    :load="loadFolders" 
    :props="defaultProps"
    :show-checkbox="false"
    highlight-current
    ref="project_tree"
    @node-click="handleNodeClick">
  </el-tree>
</template>
<script>
import {ajax} from '../../api/fetch'
export default {
  name: 'select-folder',
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
      console.log(data)
      this.$refs.project_tree.setCheckedKeys([data.nid])
      this.$emit('select:folder', parseInt(data.nid.split('-')[1]))
    },
    loadFolders (node, resolve) {
      // console.log(node)
      // console.log(this.project)
      if (node.level === 0) {
        let request = {
          method: 'GET',
          url: 'projects/' + this.project.pid + '/folders/first-layer',
          data: {
            ownerId: this.project.projectOwner
          }}
        this.getFolders(node, resolve, request)
      } else {
        let request = {
          method: 'GET',
          url: 'projects/' + this.project.pid + '/folders/' + node.data.contain + '/sub-folder',
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

