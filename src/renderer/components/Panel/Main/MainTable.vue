<template>
  <el-tabs v-model="currentTable" type="card" closable @tab-remove="removeTab">
    <el-tab-pane
      v-for="item in tables"
      :key="item.aid"
      :name="item.aid">
      <span slot="label"><el-badge :is-dot="item.isDot" class="item"></el-badge>{{item.showApiName}}</span>
      <each-table-panel v-bind:item="item" v-on:commit:api="commitTable($event)"></each-table-panel>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import EachTablePanel from './EachTablePanel'
  export default {
    name: 'main-table',
    props: ['tables', 'value'],
    components: {EachTablePanel},
    data () {
      return {
      }
    },
    watch: {
      tables: function (newTables, oldTables) {
        // console.log('new tables', newTables)
        // console.log('old tables', oldTables)
        if (newTables.length === oldTables.length) {
          this.currentTable = this.tables[this.tables.length - 1].aid
          // console.log('update the current tables', this.currentTable)
        }
      }
    },
    methods: {
      removeTab (targetName) {
        let tabs = this.tables.concat()
        if (targetName === this.currentTable) {
          tabs.forEach((tab, index) => {
            if (tab.aid === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                this.currentTable = nextTab.aid
              }
            }
          })
        }
        this.$emit('updateTable', tabs.filter(tab => tab.aid !== targetName))
      },
      commitTable (target) {
        this.$emit('close:table', target)
        this.$emit('flash:projectTree')
      }
    },
    computed: {
      currentTable: {
        get: function () {
          return this.value
        },
        set: function (current) {
          this.$emit('input', current)
        }
      }
    },
    created () {
      // console.log('created components MainTable init value', this.tables, this.currentTable)
    }
  }
</script>