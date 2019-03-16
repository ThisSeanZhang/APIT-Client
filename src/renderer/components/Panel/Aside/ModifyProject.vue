<template>
  <el-dialog
    :title="pid === null ? '添加项目' : '修改项目'"
    :visible.sync="dialogVisible"
    width="50%">
    <div v-loading="currentStatus === requestStatus.FETCHING">
      <el-form ref="form" label-position="top" :model="project" :rules="rules">
        <el-form-item prop="projectName">
          <el-input placeholder="输入项目名称" v-model="project.projectName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-switch v-model="project.overt"></el-switch>
          <el-popover
            placement="right"
            width="400"
            trigger="hover">
            <p>公开的项目任何人都可以查看</p>
            <div slot="reference" style="display: inline-block;" >公开?</div>
          </el-popover>
        </el-form-item>
      </el-form>
      <div></div>
      <el-popover
        placement="top-start"
        title="添加的小伙伴能干啥"
        width="400"
        trigger="hover">
        <p>添加的小伙伴将有:<br>查看:项目、文件夹、API,编辑:文件夹、API的权限</p>
        <div slot="reference" style="display: inline-block" >添加些小伙伴?</div>
      </el-popover>
      <el-select @click.stop class="teammate-choise"
        multiple
        filterable
        remote
        reserve-keyword
        v-model="project.whoJoins"
        placeholder="请输入小伙伴的昵称或者Email"
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          v-if="pid !== null"
          :disabled="currentStatus === requestStatus.FETCHING"
          @click="delDialogVisible = true"
          icon="el-icon-delete" style="float: left;"></el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="currentStatus === requestStatus.FETCHING"
          @click="commitProject">确 定</el-button>
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
          @click="delProject">确 定</el-button>
      </span>
      </el-dialog>
  </el-dialog>
</template>
<script>
import { ajax, just404 } from '../../../api/fetch'
import Project from '../../../entitys/Project'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'modify-project',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    pid: {
      type: Number,
      default: null
    }
  },
  watch: {
  },
  data () {
    return {
      requestStatus: {SUCCESS: 1, NOTFOUND: 2, REQUEST_ERROR: 3, FETCHING: 4},
      currentStatus: null,
      project: Project.newEmptyProject(),
      options: [],
      loading: false,
      delDialogVisible: false,
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 4, max: 16, message: Project.nameValid().message, pattern: Project.nameValid().pattern, trigger: 'blur' }
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
    requestProject: function () {
      const whoJoins = this.project.whoJoins.filter(who => who !== this.developerId).join(',')
      const projectOwner = this.pid === null ? this.developerId : this.project.projectOwner
      return new Project({
        pid: this.project.pid,
        projectName: this.project.projectName,
        projectOwner: projectOwner,
        overt: this.project.overt,
        whoJoins: whoJoins.length === 0 ? projectOwner.toString() : projectOwner + ',' + whoJoins
      })
    },
    ...mapState(['developerId'])
  },
  methods: {
    remoteMethod (key) {
      if (key === '') {
        this.options = []
        return
      }
      this.loading = true
      let request = {
        method: 'GET',
        url: 'developers/developer-name-email-like/' + key
      }
      ajax(request).then(resp => {
        this.options = resp.data.data
        this.loading = false
      }).catch(error => {
        just404(error)
          .then(resp => {
            this.$message.warning('没有含有此关键字的用户诶(●ˇ∀ˇ●)')
          })
      })
    },
    checkCommit () {
      if (!this.requestProject.isLegalName()) {
        this.$message.warning(Project.nameValid().message)
        return false
      }
      return true
    },
    delProject () {
      const item = {
        request: {
          method: 'DELETE',
          url: 'projects/' + this.project.pid
        },
        message: '[]~(￣▽￣)~*删除成功'
      }
      this.sendRequest(item)
    },
    commitProject () {
      if (!this.checkCommit()) {
        return
      }
      const putRequest = {
        method: 'PUT',
        url: 'projects/' + this.project.pid,
        data: this.requestProject
      }
      const createRequest = {
        method: 'POST',
        url: 'developers/' + this.developerId + '/projects/',
        data: this.requestProject
      }
      const item = {
        request: this.pid === null ? createRequest : putRequest,
        message: '[]~(￣▽￣)~*修改成功'
      }
      this.sendRequest(item)
      // ajax(this.pid === null ? createRequest : putRequest).then(resp => {
      //   this.$message.success('[]~(￣▽￣)~*修改成功')
      //   this.dialogVisible = false
      //   this.$emit('flash:projects')
      // }).catch(error => {
      //   just404(error)
      //     .then(resp => {
      //       this.$message.warning('没有对应的项目欸(●ˇ∀ˇ●)')
      //     })
      // })
    },
    sendRequest (item) {
      ajax(item.request).then(resp => {
        this.$message.success(item.message)
        this.dialogVisible = false
        this.$emit('flash:projects')
      }).catch(error => {
        just404(error)
          .then(resp => {
            this.$message.warning('没有对应的项目欸(●ˇ∀ˇ●)')
          })
      })
    },
    findCurrentUser () {
      let request = {
        method: 'GET',
        url: 'projects/' + this.project.pid + '/whoJoins'
      }
      ajax(request).then(resp => {
        this.currentStatus = this.requestStatus.SUCCESS
        this.dialogVisible = true
        this.options = resp.data.data
      }).catch(error => {
        just404(error)
          .then(resp => {
            this.currentStatus = this.requestStatus.NOTFOUND
          })
          .catch(() => {
            this.currentStatus = this.requestStatus.REQUEST_ERROR
          })
        this.options = []
      })
    },
    fetchTargetProject (pid) {
      this.currentStatus = this.requestStatus.FETCHING
      ajax({
        method: 'GET',
        url: '/projects/' + pid
      })
        .then(resp => {
          this.project = new Project(resp.data.data)
          this.project.whoJoins = this.project.whoJoins.split(',').map(id => parseInt(id))
          this.findCurrentUser()
        })
        .catch(error => {
          just404(error)
            .then(resp => {
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
    if (this.pid !== null) {
      this.fetchTargetProject(this.pid)
    }
  }
}
</script>
<style type="text/css" lang="scss"  scoped>
.teammate-choise{
  width: 100%!important;
  background-color: aquamarine;
}
</style>
