<template>
  <div>
    <el-input
    type="textarea"
    :rows="15"
    placeholder="请输入请求体"
    v-model="context">
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'raw-data',
  props: ['value'],
  data () {
    return {
      context: ''
    }
  },
  watch: {
    context: function () {
      this.$emit('input', this.context)
    }
  },
  created () {
    // console.log(this.value)
    this.context = this.value
  }
}
</script>
