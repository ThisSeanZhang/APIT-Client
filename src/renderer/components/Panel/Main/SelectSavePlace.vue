<template>
  <el-dialog
    title="选择存放位置"
    :visible.sync="dialogVisible"
    width="650px"
    center>
    <div v-if="target.project.id === null">从下列选择所要放置的文件夹或项目</div>
    <div v-else>当前选择的存放位置为: 
      <strong>{{target.project.name}}</strong> 项目下<span v-if="target.folder.id !== null">的
      <strong>{{target.folder.name}}</strong> 文件夹</span></div>
    <select-location v-if="dialogVisible" v-on:select:target="currentChioceLocation($event)"></select-location>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="checkAllPass()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SelectLocation from '../../SelectLocation/Index'
export default {
  name: 'select-save-place',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      target: {
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
  components: {SelectLocation},
  computed: {
    dialogVisible: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    currentChioceLocation (target) {
      console.log(target)
      this.target = target
    },
    checkAllPass () {
      if (this.target.project.id === null) {
        this.$message.warning('请选择所要放置的位置')
        this.dialogVisible = true
        return
      }
      this.$emit('update:api:belong', {pid: this.target.project.id, fid: this.target.folder.id})
      this.dialogVisible = false
    }
  }
}
</script>
<style type="text/css" lang="scss"  scoped>
</style>
