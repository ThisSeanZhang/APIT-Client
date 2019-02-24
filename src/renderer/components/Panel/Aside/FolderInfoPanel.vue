<template>
  <div style="display: inline-block" @click.stop>
    <el-button type="text"  size="mini"  @click.stop="requestFolderInfo()" slot="reference">修改</el-button>
    <el-dialog
      title="文件夹信息"
      :visible.sync="dialogVisible"
      width="50%"
      center>
    <el-form ref="form" :model="folderForm" :rules="rules">
      <el-form-item prop="folderName">
        <el-input v-model="folderForm.folderName" placeholder="文件夹名称"></el-input>
      </el-form-item>
    </el-form>
    从下列选择所要放置的文件夹或项目
      <select-location v-if="dialogVisible" v-on:select:target="currentChioceLocation($event)"></select-location>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateFolder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {ajax} from '../../../api/fetch'
import SelectLocation from '../../SelectLocation/Index'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'delete-popover',
  props: ['nid', 'pid'],
  components: {SelectLocation},
  data () {
    return {
      dialogVisible: false,
      folderForm: {
        folderName: '',
        parentId: null,
        folderOwnerId: null,
        belongProject: null
      },
      rules: {
        folderName: [
          { required: true, message: '请输入文件名', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', pattern: /^[\u4e00-\u9fa5a-zA-Z_\-0-9=]{4,16}$/, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    currentChioceLocation (target) {
      this.folderForm.belongProject = target.pid
      this.folderForm.parentId = target.fid
      console.log(target)
    },
    requestFolderInfo () {
      let request = {
        method: 'GET',
        url: 'projects/' + this.pid + '/folders/' + this.nid.split('-')[1]
      }
      ajax(request).then(resp => {
        // console.log(resp)
        // TODO 登入成功后的相应操作
        // console.log(resp.data.data)
        this.responseToFolder(resp.data.data)
        this.dialogVisible = true
      }).catch(error => {
        this.whenErrorMessage(error, () => {
          this.$message.warning('没有东西欸(●ˇ∀ˇ●)')
        })
      })
    },
    whenErrorMessage (error) {
      if (error.response) {
        console.log(error.response)
        this.$message('欸，好像出错了_(:з)∠)_，再试一次吧')
      } else if (error.request) {
        // console.log(error.request)
        this.$message.error('发送失败请检查网络连接╮（╯＿╰）╭')
      } else {
        // console.log('Error', error.message)
        this.$message('欸，好像出错了_(:з)∠)_，再试一次吧')
      }
      // console.log(error.config)
    },
    responseToFolder (folder) {
      this.folderForm.fid = folder.fid
      this.folderForm.folderName = folder.folderName
      this.folderForm.parentId = folder.parentId
      this.folderForm.folderOwnerId = folder.folderOwnerId
      this.folderForm.belongProject = folder.belongProject
    },
    checkAllPass () {
      if (this.folderForm.belongProject === null) {
        this.$message.warning('请选择所要移动到的位置')
        return false
      }
      let patten = /^[\u4e00-\u9fa5a-zA-Z_\-0-9=]{4,16}$/
      if (!patten.test(this.folderForm.folderName)) {
        this.$message.warning('文件名长度必须小于16且大于4位,且仅能含有特殊字符_-')
        return false
      }
      return true
    },
    updateFolder () {
      if (!this.checkAllPass()) {
        return
      }
      let request = {
        method: 'PUT',
        url: 'projects/' + this.folderForm.belongProject + '/folders/' + this.folderForm.fid,
        data: this.folderForm}
      ajax(request).then(resp => {
        // TODO 登入成功后的相应操作
        this.$message.success('[]~(￣▽￣)~*修改成功')
        this.dialogVisible = false
        this.$emit('update:list')
      }).catch(error => {
        this.whenErrorMessage(error)
      })
    }
  },
  computed: {
    ...mapState(['developerId'])
  }
}
</script>


<style type="text/css" lang="scss"  scoped>
</style>
