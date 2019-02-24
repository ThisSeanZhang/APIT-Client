<template>
  <div class="select-location" v-loading="obtionStatus === requestStatus.FETCHING">
    <el-button v-if="projects.length === 0" type="text" @click.stop="findAllProjectByDeveloperId">重新获取</el-button>
    <el-collapse  v-model="activeName" accordion>
      <el-collapse-item
        v-for="project in projects" 
        :key="project.pid"
        :title="project.projectName"
        :name="project.pid.toString()">
        <select-folder v-on:select:folder="emitCurrentChioce(project.pid, $event)" v-if="activeName === project.pid.toString()" v-bind:project="project"></select-folder>
      </el-collapse-item>
    </el-collapse>
    
  </div>
</template>

<script>
import {ajax} from '../../api/fetch'
import SelectFolder from './SelectFolder'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'select-location',
  components: {SelectFolder},
  data () {
    return {
      activeName: null,
      projects: [],
      requestStatus: {SUCCESS: 1, NOTFOUND: 2, REQUEST_ERROR: 3, FETCHING: 4},
      obtionStatus: null
    }
  },
  methods: {
    findAllProjectByDeveloperId () {
      if (this.developerId === null) {
        this.obtionStatus = this.requestStatus.REQUEST_ERROR
        this.$message.warning('还没有登入欸(●ˇ∀ˇ●)')
        return null
      }
      let request = {method: 'GET', url: 'projects/owner/' + this.developerId}
      this.obtionStatus = this.requestStatus.FETCHING
      ajax(request).then(resp => {
        console.log(resp)
        // TODO 登入成功后的相应操作
        this.projects = resp.data.data
        // this.activeName = this.projects[0].pid.toString()
        this.obtionStatus = this.requestStatus.SUCCESS
      }).catch(error => {
        this.whenErrorMessage(error, () => {
          this.$message.warning('还没有项目欸(●ˇ∀ˇ●)')
          this.obtionStatus = this.requestStatus.NOTFOUND
        })
      })
    },
    whenErrorMessage (error, dowhat) {
      if (error.response) {
        if (error.response.status === 404) {
          dowhat()
        }
      } else if (error.request) {
        this.$message.error('发送失败请检查网络连接╮（╯＿╰）╭')
        this.obtionStatus = this.requestStatus.REQUEST_ERROR
      } else {
        this.$message('欸，好像出错了_(:з)∠)_，再试一次吧')
        this.obtionStatus = this.requestStatus.REQUEST_ERROR
      }
    },
    emitCurrentChioce (pid, fid) {
      this.$emit('select:target', {pid: pid, fid: fid})
    }
  },
  computed: {
    ...mapState(['developerId'])
  },
  watch: {
    activeName: function (n, o) {
      this.$emit('select:target', {pid: n === '' ? null : n, fid: null})
    }
  },
  created () {
    this.obtionStatus = this.requestStatus.FETCHING
    this.findAllProjectByDeveloperId()
  }
}
</script>
<style type="text/css" lang="scss"  scoped>
.select-location{
  width: 100%;
  height: 300px;
  // background-color: bisque;
  overflow: scroll;
  padding-left: 8px;
}
</style>
