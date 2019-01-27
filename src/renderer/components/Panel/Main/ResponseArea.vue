<template>
  <div>
    <el-input
      type="textarea"
      :rows="15"
      placeholder="请发起一个请求"
      v-model="response">
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'response-area',
  props: ['response'],
  data () {
    return {
      textarea: ''
    }
  }
}
</script>