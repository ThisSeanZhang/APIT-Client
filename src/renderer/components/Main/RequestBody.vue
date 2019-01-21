<template>
  <div>
    <el-radio-group @change="emitHeaderType" v-model="radioType">
      <el-radio :label='bodyType.none'>none</el-radio>
      <el-radio :label="bodyType.formData">form-data</el-radio>
      <el-radio :label="bodyType.urlencoded">urlencoded</el-radio>
      <el-radio :label="bodyType.binary">binary</el-radio>
      <el-radio :label="bodyType.raw">
        <template v-if="radioType !== bodyType.raw">
          raw
        </template>
        <el-select @change="emitHeaderType"  v-else size="mini" v-model="selectType" placeholder="请选择">
          <el-option
            v-for="item in bodyType.raw.value"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-radio>
    </el-radio-group>
    
    <template v-if="radioType === bodyType.none">

    </template>
    <template v-else-if="radioType === bodyType.formData">
      <form-data v-bind:formData="formData"></form-data>
    </template>
    <!-- <br>
    {{radioType}}
    {{selectType}}
    {{type}} -->
  </div>
</template>
<script>
import FormData from './Body/FormData'
export default {
  name: 'request-body',
  props: ['body'],
  components: {FormData},
  data () {
    return {
      bodyType: {
        none: { value: '', label: 'none' },
        formData: { value: 'multipart/form-data', label: 'formData' },
        urlencoded: { value: 'application/x-www-form-urlencoded', label: 'urlencoded' },
        binary: { value: '', label: 'binary' },
        raw: { value: [{
          value: '',
          label: 'Text'
        }, {
          value: 'text/plain',
          label: 'Text/Plain'
        }, {
          value: 'application/json',
          label: 'JSON'
        }, {
          value: 'application/javascript',
          label: 'JavaScript'
        }],
        label: 'raw'
        }
      },
      radioType: null,
      selectType: '',
      formData: null
    }
  },
  methods: {
    IsRawType (obj) {
      this.bodyType.raw.value.forEach(raw => {
        if (obj === raw.label) return true
      })
      return false
    },
    emitHeaderType () {
      this.$emit('updateHeaderType', this.type)
    }
  },
  computed: {
    type: function () {
      let choiceType = this.radioType !== this.bodyType.raw ? this.radioType.value : this.selectType
      // this.$emit('updateType', choiceType)
      return choiceType
    }
  },
  created () {
    this.radioType = this.bodyType.none
    let formData = [{
      checked: true,
      key: 'Content-Type',
      type: 'File',
      value: 'application/json',
      description: 'Json方式'
    }, {
      checked: true,
      key: 'test',
      type: 'Text',
      value: 'test',
      description: 'test'
    }]
    let formDataStr = JSON.stringify(formData)
    this.formData = JSON.parse(formDataStr)
  }
}
</script>
<style type="text/css" lang="scss">
</style>
