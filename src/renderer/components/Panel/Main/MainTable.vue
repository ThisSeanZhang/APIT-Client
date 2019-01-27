<template>
  <el-tabs v-model="currentTable" type="card" closable @tab-remove="removeTab">
    <el-tab-pane
      v-for="(item , index) in tables"
      :key="item.name"
      :name="item.name">
      <span slot="label"><el-badge :is-dot="idDot" class="item"></el-badge>{{item.title}}</span>
      <!-- {{index}}-{{item.content}} -->
      <each-table-panel v-bind:item="item"></each-table-panel>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import EachTablePanel from './EachTablePanel'
  export default {
    name: 'main-table',
    props: ['tables'],
    components: {EachTablePanel},
    data () {
      return {
        currentTable: null,
        idDot: true
      }
    },
    watch: {
      tables: function (newTables, oldTables) {
        console.log('new tables', newTables)
        console.log('old tables', oldTables)
        if (newTables.length === oldTables.length) {
          this.currentTable = this.tables[this.tables.length - 1].name
          console.log('update the current tables', this.currentTable)
        }
      }
    },
    methods: {
      removeTab (targetName) {
        let tabs = this.tables.concat()
        if (targetName === this.currentTable) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                this.currentTable = nextTab.name
              }
            }
          })
        }
        this.$emit('updateTable', tabs.filter(tab => tab.name !== targetName))
      }
    },
    created () {
      this.currentTable = (this.tables.length - 1).toString()
      console.log('created components MainTable init value', this.tables, this.currentTable)
    }
  }
</script>