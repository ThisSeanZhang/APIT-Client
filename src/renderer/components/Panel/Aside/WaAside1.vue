<template>
  <div class="aside">
    <div class="projects">
      <div class="projects_is_empty" v-if="projectsIsEmpty">空空的哦还没有项目,<el-button type="text">创建</el-button>一个吧</div>
      <wa-project v-else v-for="project in projects" :key="project.pid" v-bind:project="project"></wa-project>
    </div>
    <div class="dividing_line"></div>
  </div>
</template>
<script>
import WaProject from './WaProject'
import {ajax} from '../../../api/fetch'

export default {
  name: 'wa-aside1',
  components: {WaProject},
  data () {
    return {
      descriptionIsOpen: false,
      projects: []
    }
  },
  methods: {
    findAllProjectByDeveloperId (developerId) {
      let request = {method: 'GET', url: 'http://localhost:8080/projects/owner/' + this.$root.$data.userInfo.developerId}
      ajax(request).then(resp => {
        console.log(resp)
        // TODO 登入成功后的相应操作
        this.projects = resp.data.data
      }).catch(error => {
        this.whenErrorMessage(error, () => {
          this.$message.warning('还没有项目欸(●ˇ∀ˇ●)')
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
      } else {
        this.$message('欸，好像出错了_(:з)∠)_，再试一次吧')
      }
    }
  },
  computed: {
    projectsIsEmpty: function () {
      console.log(this.projects || this.projects.length === 0)
      return this.projects === null || this.projects.length === 0
    }
  },
  created () {
    this.findAllProjectByDeveloperId()
    // this.projects = [{
    //   pid: 1,
    //   projectName: 'OTMS期末项目',
    //   projectOwner: 1
    // }, {
    //   pid: 2,
    //   projectName: 'TMS-115项目',
    //   projectOwner: 1
    // }, {
    //   pid: 3,
    //   projectName: 'APIT毕设',
    //   projectOwner: 1
    // }]
  }
}
</script>
<style  type="text/css" lang="scss"  >
.aside{
  width: 300px;
  height: 100%;
  display: flex;
  overflow: hidden;
  padding: 0px 8px;
  .dividing_line{
    height: 100%;
    // width: 0px;
    border-right: 1px solid #dcdfe6;
    flex-direction: column;
  }
  .projects{
    width: 100%;
    flex-direction: column;
    overflow-y: scroll;
    
  }
  .projects_is_empty{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// .wa_project{
//   padding-top: 42px;
//   height: 42px;
//   position: relative;
//   overflow: hidden;
//   // background-color: hotpink;
//   // border-bottom: 1px solid #333;
//   border-bottom: 1px solid #dcdfe6;
//   .test{
//     position: absolute;
//     top: 0px;
//     padding: 15px;
//     i{
//       position: inherit;
//     }
//   }
//   .edit{
//     position: absolute;
//     top: 0px;
//     padding: 13px;
//     right: 0px;
//   }
//   .project_title{
//     position: absolute;
//     top: 0px;
//     padding: 10px 0px 10px 40px;
//   }
//   .project_header{
//     cursor: pointer;
//   }
// }
</style>
