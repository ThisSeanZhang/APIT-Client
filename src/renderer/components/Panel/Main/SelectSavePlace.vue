<template>
  <el-dialog
    title="选择存放位置"
    :visible.sync="dialogVisible"
    width="50%"
    center>
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
        pid: null,
        fid: null
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
      this.target = target
    },
    checkAllPass () {
      if (this.target.pid === null || this.target.fid === null) {
        this.$message.warning('请选择所要放置的位置')
        this.dialogVisible = true
        return
      }
      this.$emit('update:api:belong', this.target)
      this.dialogVisible = false
    }
  }
}
</script>
<style type="text/css" lang="scss"  scoped>
</style>
