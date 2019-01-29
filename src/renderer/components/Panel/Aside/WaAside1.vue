<template>
  <div class="aside">
    <div class="projects">
      <wa-project v-for="project in projects" :key="project.pid" v-bind:project="project"></wa-project>
    </div>
    <div class="dividing_line"></div>
  </div>
</template>
<script>
import WaProject from './WaProject'

export default {
  name: 'wa-aside1',
  components: {WaProject},
  data () {
    return {
      descriptionIsOpen: false,
      projects: []
    }
  },
  created () {
    this.projects = [{
      pid: 1,
      projectName: 'OTMS期末项目',
      projectOwner: 1
    }, {
      pid: 2,
      projectName: 'TMS-115项目',
      projectOwner: 1
    }, {
      pid: 3,
      projectName: 'APIT毕设',
      projectOwner: 1
    }]
  }
}
</script>
<style  type="text/css" lang="scss"  >
.aside{
  width: 300px;
  height: 100%;
  display: flex;
  .dividing_line{
    height: 100%;
    // width: 0px;
    border-right: 1px solid #dcdfe6;
    flex-direction: column;
  }
  .projects{
    width: 100%;
    flex-direction: column;
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
