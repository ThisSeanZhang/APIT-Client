<template>
  <el-dialog
    title="创建项目"
    :visible.sync="dialogVisible"
    width="50%">
    <el-form ref="form" label-position="top" :model="project" label-width="80px">
      <el-form-item>
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
      <div slot="reference" >添加些小伙伴?</div>
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
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {ajax} from '../../../api/fetch'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'create-project',
  props: ['value'],
  data () {
    return {
      project: {
        projectName: '',
        projectOwner: '',
        overt: false,
        whoJoins: []
      },
      options: [],
      loading: false
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
    ...mapState(['developerId'])
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
      this.loading = false
    }
  },
  created () {
    this.project.projectOwner = this.developerId
    this.project.whoJoins = [this.developerId]
  }
}
</script>

<style type="text/css" lang="scss"  scoped>
</style>
<style type="text/css" lang="scss">
.teammate-choise{
  width: 100%!important;
  .el-input{
    width: 100%!important;
  }
}
.teammate-choise .el-input{
  width: 100%!important;
}
</style>