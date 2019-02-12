<template>
  <div>
    {{input}}
    <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
  </div>
</template>
<script>
export default {
  name: 'param-t',
  props: ['value'],
  data () {
    return {
    }
  },
  computed: {
    input: {
      get: function () {
        return this.value.split('<o>').map(e => {
          let info = e.split('<p>')
          return {key: info[0], value: info[1], ccc: info[2]}
        })
      },
      set: function (list) {
        let value = list
          ? list.map(e => e.key + '<p>' + e.value + '<p>' + e.ccc).join('<o>')
          : ''
        this.$emit('input', value)
      }
    },
    textarea: {
      get: function () {
        return JSON.stringify(this.input)
      },
      set: function (str) {
        this.input = JSON.parse(str)
      }
    }
  },
  created () {
  }
}
</script>
