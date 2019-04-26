<template>
  <div class="response_area">
    <div style="float: right;">
      <el-button v-if="currentText === textType.JSON && aid !== null"  type="success" @click.stop="respExampleDialog = true" plain>相应样例</el-button>
      <el-button v-if="currentText === textType.JSON && aid !== null"  type="info" @click.stop="jsonParamsDialog = true" plain>参数说明</el-button>
    </div>
    <div v-if="currentText === textType.OTHER">{{response}}</div>
    <json-response v-if="currentText === textType.JSON" v-model="response"></json-response>
    <response-parameter
      v-if="currentText === textType.JSON"
      v-model="jsonParamsDialog"
      v-bind:paramStr="response"
      v-bind:aid="aid"
      v-bind:pid="belongProject"
      ></response-parameter>
    <response-example
      v-model="respExampleDialog"
      v-bind:paramStr="response"
      v-bind:aid="aid"
      v-bind:pid="belongProject"
    ></response-example>
  </div>
</template>
<script>
import JsonResponse from '../../ShareSegment/JsonResponse'
import ResponseParameter from '../../ShareSegment/ResponseParameter'
import ResponseExample from '../../ShareSegment/ResponseExample'
export default {
  name: 'response-area',
  components: {JsonResponse, ResponseParameter, ResponseExample},
  props: {
    response: {
      type: String,
      default: null
    },
    aid: {
      type: Number,
      default: null
    },
    belongProject: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      textType: {OTHER: 0, JSON: 1},
      jsonParamsDialog: false,
      respExampleDialog: false
    }
  },
  computed: {
    currentText: function () {
      return this.response !== null && this.isJsonStr() ? this.textType.JSON : this.textType.OTHER
    }
  },
  created () {
  },
  methods: {
    isJsonStr () {
      try {
        JSON.parse(this.response)
      } catch (e) {
        return false
      }
      return true
    }
  }
}
</script>
<style lang="scss" scoped>
.response_area{
  width: 100%;
  min-height: 300px;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    // overflow: auto;
    // position: relative;
}
.parameter_btn{
  opacity: 0.6;
  position: absolute;
  right: 5px;
}
</style>
