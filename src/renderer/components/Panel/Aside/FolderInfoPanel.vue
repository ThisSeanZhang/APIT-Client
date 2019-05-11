<template>
<el-dialog
  :title="focus === null ? '添加文件夹' : '修改文件夹'"
  :visible.sync="dialogVisible"
  width="640px"
  >
  <div v-loading="currentStatus === requestStatus.FETCHING">
    <el-form ref="form" :model="folder" :rules="rules">
      <el-form-item prop="folderName">
        <el-input v-model="folder.folderName" placeholder="文件夹名称"></el-input>
      </el-form-item>
    </el-form>
    <div v-if="currentSelect.pName === null">从下列选择所要放置的文件夹或项目</div>
    <div v-else>当前选择的存放位置为: <strong>{{currentSelect.pName}}</strong> 项目下<span v-if="currentSelect.fName !== null">的 <strong>{{currentSelect.fName}}</strong> 文件夹</span></div>
    <select-location v-if="dialogVisible" v-on:select:target="currentChioceLocation($event)"></select-location>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button
      type="danger"
      v-if="focus !== null"
      :disabled="currentStatus === requestStatus.FETCHING"
      @click="delDialogVisible = true"
      icon="el-icon-delete" style="float: left;"></el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button
      :disabled="currentStatus === requestStatus.FETCHING"
      type="primary"
      @click="commitFolder">确 定</el-button>
  </span>
  <el-dialog
    center
    width="210px"
    title="确定删除？"
    :visible.sync="delDialogVisible"
    append-to-body>
    <span slot="footer" class="dialog-footer">
      <el-button @click="delDialogVisible = false">取 消</el-button>
      <el-button
        type="danger"
        @click="delFolder">确 定</el-button>
    </span>
  </el-dialog>
</el-dialog>
</template>

<script>
import {ajax, just404} from '../../../api/fetch'
import Folder from '../../../entitys/Folder'
import SelectLocation from '../../SelectLocation/Index'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
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
      default: function () {
        return null
      }
    }
  },
  data () {
    return {
      folder: Folder.newEmptyFolder(),
      requestStatus: {SUCCESS: 1, NOTFOUND: 2, REQUEST_ERROR: 3, FETCHING: 4},
      currentStatus: null,
      delDialogVisible: false,
      currentSelect: {
        pName: null,
        fName: null
      },
      rules: {
        folderName: [
          { required: true, message: '请输入文件名', trigger: 'blur' },
          { min: 1, max: 16, message: Folder.nameValid().message, pattern: Folder.nameValid().pattern, trigger: 'blur' }
        ]
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
    },
    folderRequest: function () {
      if (this.focus === null) {
        const createFolder = this.folder.parentId
          ? this.folder.parentId + '/sub_folders/'
          : ''
        return {
          request: {
            method: 'POST',
            url: 'projects/' + this.folder.belongProject + '/folders/' + createFolder,
            data: this.folder
          },
          message: '[]~(￣▽￣)~*添加成功'
        }
      } else {
        return {
          request: {
            method: 'PUT',
            url: 'projects/' + this.focus.pid + '/folders/' + this.focus.fid,
            data: this.folder
          },
          message: '[]~(￣▽￣)~*修改成功'
        }
      }
    },
    ...mapState(['developerId'])
  },
  methods: {
    currentChioceLocation (target) {
      this.folder.belongProject = target.project.id
      this.currentSelect.pName = target.project.name
      this.folder.parentId = target.folder.id
      this.currentSelect.fName = target.folder.name
      console.log(target)
    },
    checkAllPass () {
      if (this.folder.belongProject === null) {
        this.$message.warning('请选择所要放置的位置')
        return false
      }
      console.log('测试过了', this.folder)
      if (!this.folder.isLegalName()) {
        this.$message.warning(Folder.nameValid().message)
        return false
      }
      return true
    },
    delFolder () {
      this.sendRequest({
        request: {
          method: 'DELETE',
          url: 'projects/' + this.focus.pid + '/folders/' + this.focus.fid
        },
        message: '[]~(￣▽￣)~*删除成功'
      })
    },
    commitFolder () {
      if (!this.checkAllPass()) {
        return
      }
      this.sendRequest(this.folderRequest)
    },
    sendRequest (item) {
      ajax(item.request).then(resp => {
        this.$message.success(item.message)
        this.dialogVisible = false
        this.$emit('flash:folders')
      }).catch(error => {
        just404(error)
          .then(resp => {
            this.$message.warning('诶!对应文件夹不存在(●ˇ∀ˇ●)')
          })
      })
    },
    requestFolderInfo () {
      this.currentStatus = this.requestStatus.FETCHING
      let request = {
        method: 'GET',
        url: 'projects/' + this.focus.pid + '/folders/' + this.focus.fid
      }
      ajax(request).then(resp => {
        this.folder = new Folder(resp.data.data)
        this.currentStatus = this.requestStatus.SUCCESS
      }).catch(error => {
        just404(error)
          .then(resp => {
            this.$message.warning('请求的文件夹不存在诶(●ˇ∀ˇ●)')
            this.currentStatus = this.requestStatus.NOTFOUND
          })
          .catch(() => {
            this.currentStatus = this.requestStatus.REQUEST_ERROR
          })
        this.dialogVisible = false
      })
    }
  },
  created () {
    if (this.focus !== null) {
      this.requestFolderInfo()
    }
  }
}
</script>

<style type="text/css" lang="scss"  scoped>
</style>
