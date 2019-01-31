<template>
  <div>
    <div>{{count}}</div>
    <div @click="cccc()">{{countAlias}}</div>
    <div>{{countPlusLocalState}}</div>
    <el-button @click="todo">ccc</el-button>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('Counter')
export default {
  name: 'test',
  data () {
    return {
      localCount: 2
    }
  },
  computed: {
    ...mapState({
      count: state => state.main,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'main',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.main + this.localCount
      }
    })
  },
  methods: {
    ...mapActions({todo: 'someAsyncTask'}),
    cccc () {
      console.log('ccccc')
      this.todo()
      this.$store.dispatch('someAsyncTask')
    }
  }
}
</script>
