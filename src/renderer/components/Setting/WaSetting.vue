<template>
  <div>setting
    <el-button type="primary" @click="backPanel" plain>主要按钮</el-button>
  </div>
</template>
<script>
export default {
  name: 'wa-setting',
  methods: {
    backPanel () {
      this.$router.go(-1)
    }
  }
}
</script>
