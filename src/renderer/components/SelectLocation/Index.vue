<template>
  <div class="select-location" v-loading="obtionStatus === requestStatus.FETCHING">
    <div class="select-project">
      <dir
        v-for="project in projects"
        :key="project.pid"
        class="wa_project"
        :style="project.pid === currentSelect.project.id ? 'background-color: #e4e4e4;' : ''"
        @click.stop="currentSelect = { project: {id: project.pid, name: project.projectName}, folder: { id: null, name: null } }"
      >
        <span class="project_title">{{project.projectName}}</span>
        <span class="edit" v-if="project.pid === currentSelect.pid">
          <i class="el-icon-arrow-right"></i>
        </span>
      </dir>
    </div>
    <div class="select-folder">
      <select-folder
        ref="select_folder"
        v-bind:pid="currentSelect.project.id"
        v-bind:show_modify="true"
        v-on:select:target = "currentSelect.folder = $event"
      ></select-folder>
    </div>
  </div>
</template>

<script>
import {ajax} from '../../api/fetch'
import Project from '../../entitys/Project'
import SelectFolder from './SelectFolder'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UserInfo')
export default {
  name: 'select-location',
  components: {SelectFolder},
  data () {
    return {
      show_modify: false,
      activeName: null,
      projects: [],
      requestStatus: {SUCCESS: 1, NOTFOUND: 2, REQUEST_ERROR: 3, FETCHING: 4},
      obtionStatus: null,
      currentSelect: {
        project: {
          id: null,
          name: null
        },
        folder: {
          id: null,
          name: null
        }
      }
    }
  },
  methods: {
    findAllProjectByDeveloperId () {
      if (this.developerId === null) {
        this.obtionStatus = this.requestStatus.REQUEST_ERROR
        this.$message.warning('还没有登入欸(●ˇ∀ˇ●)')
        return null
      }
      let request = {method: 'GET', url: 'developers/' + this.developerId + '/projects/'}
      this.obtionStatus = this.requestStatus.FETCHING
      ajax(request).then(resp => {
        this.projects = resp.data.data.map(p => new Project(p))
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
    choiceProject (target) {
      this.currentSelect = target
    }
  },
  computed: {
    ...mapState(['developerId'])
  },
  watch: {
    activeName: function (n, o) {
      this.$emit('select:target', {pid: n === '' ? null : n, fid: null})
    },
    currentSelect: {
      handler: function (n, o) {
        this.$emit('select:target', n)
      },
      deep: true
    }
  },
  created () {
    this.findAllProjectByDeveloperId()
  }
}
</script>
<style type="text/css" lang="scss"  scoped>
.select-location{
  width: 600px;
  height: 300px;
  background-color: #e4e4e4;
  overflow: hidden;
  display: flex;
  border:1px solid #dcdfe6;
  border-radius:5px;
  -moz-border-radius:5px; /* Old Firefox */
}
.select-project{
  width: 50%;
  overflow-y: scroll;
}
.select-folder{
  width: 50%;
  overflow-y: scroll;
  overflow: hidden;
}
.wa_project{
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid #dcdfe6;
  height: 42px;
  background-color: #ffffff;
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
}
</style>
