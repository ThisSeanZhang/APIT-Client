<template>
  <el-dialog
    title="新建文件夹"
    :visible.sync="dialogVisible"
    width="50%"
    center>
    <el-form ref="form" :model="folderForm" :rules="rules">
      <el-form-item prop="folderName">
        <el-input v-model="folderForm.folderName" placeholder="文件夹名称"></el-input>
      </el-form-item>
    </el-form>
    <select-location v-if="dialogVisible" v-on:select:target="currentChioceLocation($event)"></select-location>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="createFolder()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SelectLocation from '../../SelectLocation/Index'
import {ajax} from '../../../api/fetch'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'create-folder',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  components: {SelectLocation},
  data () {
    return {
      folderForm: {
        folderName: '',
        parentId: null,
        folderOwnerId: null,
        belongProject: null
      },
      rules: {
        folderName: [
          { required: true, message: '请输入文件名', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符,且仅能含有特殊字符_-', pattern: /^[\u4e00-\u9fa5a-zA-Z_\-0-9=]{4,16}$/, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    },
    requestFolder: function () {
      return {
        folderName: this.folderForm.folderName,
        parentId: this.folderForm.parentId,
        folderOwnerId: this.developerId,
        belongProject: this.folderForm.belongProject
      }
    },
    ...mapState(['developerId'])
  },
  methods: {
    currentChioceLocation (target) {
      this.folderForm.belongProject = target.pid
      this.folderForm.parentId = target.fid
      console.log(target)
    },
    checkAllPass () {
      if (this.folderForm.parentId === null || this.folderForm.belongProject === null) {
        this.$message.warning('请选择所要放置的位置')
        return false
      }
      let patten = /^[\u4e00-\u9fa5a-zA-Z_\-0-9=]{4,16}$/
      if (!patten.test(this.folderForm.folderName)) {
        this.$message.warning('文件名长度必须小于16且大于4位,且仅能含有特殊字符_-')
        return false
      }
      return true
    },
    whenErrorMessage (error) {
      if (error.response) {
        this.$message.warning(error.response.data.message + '(●ˇ∀ˇ●)')
      } else if (error.request) {
        this.$message.error('发送失败请检查网络连接╮（╯＿╰）╭')
      } else {
        this.$message('欸，好像出错了_(:з)∠)_，再试一次吧')
      }
    },
    cleanFolderFrom () {
      this.folderForm = {
        folderName: '',
        parentId: null,
        folderOwnerId: null,
        belongProject: null
      }
    },
    createFolder () {
      if (!this.checkAllPass()) {
        return
      }
      let request = {
        method: 'POST',
        url: 'projects/' + this.folderForm.belongProject + '/folders',
        data: this.requestFolder}
      ajax(request).then(resp => {
        this.$message.success('[]~(￣▽￣)~*添加成功')
        this.dialogVisible = false
        this.cleanFolderFrom()
        this.$emit('flash:projectTree')
      }).catch(error => {
        this.whenErrorMessage(error)
      })
    }
  }
}
</script>


<style type="text/css" lang="scss"  scoped>
</style>
