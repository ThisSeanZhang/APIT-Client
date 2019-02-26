<template>
  <el-dialog
    title="创建项目"
    :visible.sync="dialogVisible"
    width="50%">
    <el-form ref="form" label-position="top" :model="project" :rules="rules">
      <el-form-item prop="projectName">
        <el-input placeholder="输入项目名称" v-model="project.projectName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-switch v-model="project.overt"></el-switch>
        <el-popover
          placement="top-start"
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="commitProject">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {ajax} from '../../../api/fetch'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'modify-project',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    inProject: {
      type: Object
    }
  },
  watch: {
    dialogVisible: function (n, o) {
      if (n) {
        this.concertToProject(this.inProject)
      }
    }
  },
  data () {
    return {
      project: {
        pid: '',
        projectName: '',
        projectOwner: '',
        overt: false,
        whoJoins: []
      },
      options: [],
      loading: false,
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 8 个字符,且仅能出现字符\'-_\'', pattern: /^[\u4e00-\u9fa5a-zA-Z_\-0-9=]{4,8}$/, trigger: 'blur' }
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
      // console.log(whoJoins, whoJoins.length)
      return {
        pid: this.project.pid,
        projectName: this.project.projectName,
        projectOwner: this.developerId,
        overt: this.project.overt,
        whoJoins: whoJoins.length === 0 ? this.developerId.toString() : this.developerId + ',' + whoJoins
      }
    },
    ...mapState(['developerId', 'developerName'])
  },
  methods: {
    remoteMethod (key) {
      if (key !== '') {
        this.loading = true
        let request = {
          method: 'GET',
          url: 'developers/developer-name-email-like/' + key
        }
        ajax(request).then(resp => {
          console.log(resp)
          // TODO 登入成功后的相应操作
          this.options = resp.data.data
          this.loading = false
        }).catch(error => {
          this.whenErrorMessage(error, () => {
            this.$message.warning('还没有项目欸(●ˇ∀ˇ●)')
          })
        })
      } else {
        this.options = []
      }
    },
    whenErrorMessage (error) {
      if (error.response) {
        this.$message.warning(error.response.data.message + '(●ˇ∀ˇ●)')
      } else if (error.request) {
        this.$message.error('发送失败请检查网络连接╮（╯＿╰）╭')
      } else {
        this.$message('欸，好像出错了_(:з)∠)_，再试一次吧')
      }
      this.loading = false
    },
    checkCommit () {
      let patten = /^[\u4e00-\u9fa5a-zA-Z_\-0-9=]{4,16}$/
      if (!patten.test(this.project.projectName)) {
        this.$message.warning('文件名长度必须小于16且大于4位,且仅能含有特殊字符_-')
        return false
      }
      return true
    },
    commitProject () {
      if (!this.checkCommit()) {
        return
      }
      let request = {
        method: 'PUT',
        url: 'projects/' + this.project.pid,
        data: this.requestProject
      }
      ajax(request).then(resp => {
        this.$message.success('[]~(￣▽￣)~*添加成功')
        this.dialogVisible = false
        this.$emit('flash:projectTree')
      }).catch(error => {
        this.whenErrorMessage(error)
      })
    },
    findCurrentUser () {
      let request = {
        method: 'GET',
        url: 'projects/' + this.project.pid + '/whoJoins'
      }
      ajax(request).then(resp => {
        this.options = resp.data.data
        this.loading = false
      }).catch(error => {
        this.whenErrorMessage(error)
        this.options = []
      })
    },
    concertToProject (inProject) {
      this.project = inProject
      this.project.whoJoins = inProject.whoJoins instanceof Array ? inProject.whoJoins : inProject.whoJoins.split(',').map(id => parseInt(id))
      this.findCurrentUser()
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