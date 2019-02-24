<template>
  <!-- <el-popover placement="top" width="160" v-model="visiblePopover" trigger="manual" @blur="console.log('on blur')">
    <p>确定删除吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visiblePopover = false">取消</el-button>
      <el-button type="primary" size="mini" @click.stop="() => {$emit('confirm:del'); visiblePopover = false}">确定</el-button>
    </div>
    <el-button type="text"  size="mini" @blur.stop="console.log('on blur')"  @click.stop class="delete-text" slot="reference">删除</el-button>
  </el-popover> -->
  <div style="display: inline-block" @click.stop>
    <el-button type="text"  size="mini"  @click.stop="centerDialogVisible = true" class="delete-text" slot="reference">删除</el-button>
    <el-dialog
      title="确认删除？"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="() => {$emit('confirm:del'); centerDialogVisible = false}">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'delete-popover',
  data () {
    return {
      visiblePopover: false,
      centerDialogVisible: false
    }
  }
}
</script>


<style type="text/css" lang="scss"  scoped>
.delete-text{
  color: #f56c6c;
}
</style>
