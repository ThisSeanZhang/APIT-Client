<template>
  <div class="aside" v-if="pid !== null">
    <div v-loading="obtionStatus === requestStatus.FETCHING" class="contant">
      <div class="contant_is_empty" v-if="obtionStatus !== requestStatus.SUCCESS">
        <div v-if="obtionStatus === requestStatus.NOTFOUND">
          空空的诶(●ˇ∀ˇ●),还没有文件夹哦
        </div>
        <div v-else-if="obtionStatus === requestStatus.REQUEST_ERROR">
          请求失败了_(:з)∠)_,<el-button @click.stop="reflash" type="text">再试试</el-button>吧
        </div>
      </div>
      <div>
        <el-tree
          v-if="showTree"
          :class="treeClass"
          lazy
          node-key="nid"
          :indent = "5"
          :load="loadFolders"
          :props="nodeProps"
          ref="project_tree"
          @node-click="handleNodeClick">
          </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import { ajax, just404 } from '../../api/fetch'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'select-folder',
  props: {
    pid: {
      type: Number,
      default: null
    }
  },
  watch: {
    pid: function () {
      this.reflash()
    }
  },
  data () {
    return {
      nodeProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      requestStatus: {SUCCESS: 1, NOTFOUND: 2, REQUEST_ERROR: 3, FETCHING: 4},
      obtionStatus: null,
      showTree: true
    }
  },
  methods: {
    reflash () {
      this.showTree = false
      setTimeout(() => {
        this.showTree = true
      }, 1)
    },
    handleNodeClick (data) {
      console.log(data)
      this.$emit('select:target', {id: data.contain, name: data.label})
    },
    loadFolders (node, resolve) {
      if (node.level === 0) {
        this.fetchFirstLayer(node, resolve)
      } else {
        let request = {
          method: 'GET',
          url: 'projects/' + this.pid + '/folders/' + node.data.contain + '/sub_folders'
        }
        this.getFolders(node, resolve, request)
      }
    },
    getFolders (node, container, request) {
      ajax(request).then(resp => {
        container(resp.data.data)
      }).catch(error => {
        just404(error)
          .then(resp => {
            this.$message.warning('没有东西欸(●ˇ∀ˇ●)')
            node.loading = false
          })
          .catch(() => {
            node.loading = false
          })
      })
    },
    fetchFirstLayer (node, container) {
      this.obtionStatus = this.requestStatus.FETCHING
      let request = { method: 'GET', url: 'projects/' + this.pid + '/folders/first_layer' }
      ajax(request).then(resp => {
        container(resp.data.data)
        this.obtionStatus = this.requestStatus.SUCCESS
      }).catch(error => {
        just404(error)
          .then(resp => {
            console.log(error.request)
            this.$message.warning('没有东西欸(●ˇ∀ˇ●)')
            this.obtionStatus = this.requestStatus.NOTFOUND
          })
          .catch(() => {
            this.obtionStatus = this.requestStatus.REQUEST_ERROR
          })
      })
    }
  },
  computed: {
    treeClass: function () {
      return this.obtionStatus !== this.requestStatus.SUCCESS ? 'hidden select-folder-side-tree' : 'select-folder-side-tree'
    },
    ...mapState(['developerId'])
  },
  created () {
    // this.obtionStatus = this.requestStatus.FETCHING
    // this.modifyFolder({pid: 1, fid: 11})
    // this.fetchProjectByPid(this.pid)
    // this.$refs.aside.oncontextmenu = function (e) {
    //   return false
    // }
  }
}
</script>
<style>
  .select-folder-side-tree{
  background-color: #e4e4e4;
}
</style>

<style  type="text/css" lang="scss"  scoped>
.hidden{
  display: none;
}
.aside{
  width: 300px;
  height: 100%;
  display: flex;
  overflow: hidden;
  padding: 0px;
  .dividing_line{
    height: 100%;
    border-right: 1px solid #dcdfe6;
    flex-direction: column;
  }
  .contant{
    width: 100%;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: auto;
  }
  .contant_is_empty{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
