<template>
<el-dialog
  title="变更API存放位置"
  :visible.sync="dialogVisible"
  width="640px"
  >
  <div v-loading="currentStatus === requestStatus.FETCHING">
    <div v-if="currentSelect.pName === null">从下列选择所要放置的位置</div>
    <div v-else>当前选择的存放位置为: <strong>{{currentSelect.pName}}</strong> 项目下<span v-if="currentSelect.fName !== null">的 <strong>{{currentSelect.fName ? currentSelect.fName : ''}}</strong> 文件夹</span></div>
    <select-location v-if="dialogVisible" v-on:select:target="currentChioceLocation($event)"></select-location>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button
      :disabled="currentStatus === requestStatus.FETCHING || currentSelect.pName === null"
      type="primary"
      @click="moveAPI">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import {ajax, just404} from '../../api/fetch'
import SelectLocation from '../SelectLocation/Index'
// import { createNamespacedHelpers } from 'vuex'
// const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'modify-folder',
  components: {SelectLocation},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      requestStatus: {SUCCESS: 1, NOTFOUND: 2, REQUEST_ERROR: 3, FETCHING: 4},
      currentStatus: null,
      delDialogVisible: false,
      currentSelect: {
        pName: null,
        belongProject: null,
        fName: null,
        belongFolder: null
      }
    }
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    currentChioceLocation (target) {
      this.currentSelect.belongProject = target.project.id
      this.currentSelect.pName = target.project.name
      this.currentSelect.belongFolder = target.folder.id
      this.currentSelect.fName = target.folder.name
      console.log(target)
    },
    checkAllPass () {
      if (this.currentSelect.belongProject === null) {
        this.$message.warning('请选择所要移动到的位置')
        return false
      }
      return true
    },
    moveAPI () {
      if (!this.checkAllPass()) {
        return
      }
      this.sendRequest({
        request: {
          method: 'PUT',
          url: 'projects/' + this.focus.pid + '/apis/' + this.focus.aid + '/location',
          data: this.currentSelect
        },
        message: '[]~(￣▽￣)~*移动成功'
      })
    },
    sendRequest (item) {
      ajax(item.request).then(resp => {
        this.$message.success(item.message)
        this.dialogVisible = false
        this.$emit('flash:folders')
      }).catch(error => {
        just404(error)
          .then(resp => {
            this.$message.warning('诶!这个API接口不存在(●ˇ∀ˇ●)')
          })
      })
    }
  },
  created () {
    console.log(this.focus)
  }
}
</script>

<style type="text/css" lang="scss"  scoped>
</style>
