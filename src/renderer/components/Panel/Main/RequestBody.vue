<template>
  <div>
    <el-radio-group @change="updateBody" v-model="radioType">
      <el-radio :label='bodyType.none'>none</el-radio>
      <el-radio :label="bodyType.formData">form-data</el-radio>
      <!-- <el-radio :label="bodyType.urlencoded">urlencoded</el-radio> -->
      <!-- <el-radio :label="bodyType.binary">binary</el-radio> -->
      <el-radio :label="bodyType.raw">
        <template v-if="radioType !== bodyType.raw">
          raw
        </template>
        <el-select @change="updateBody"  v-else size="mini" v-model="selectType" placeholder="请选择">
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
      <form-data v-bind:formData="formData" ></form-data>
    </template>
    <template v-else-if="radioType === bodyType.raw">
      <raw-data v-model="rawData" ></raw-data>
    </template>
    <!-- <br>
    {{radioType}}
    {{selectType}}
    {{type}} -->
  </div>
</template>
<script>
import FormData from './Body/FormData'
import RawData from './Body/RawData'
export default {
  name: 'request-body',
  props: ['value'],
  components: {FormData, RawData},
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
      bodyData: {
        currentChoice: {
          label: 'none',
          value: ''
        },
        formData: [],
        rawData: ''
      }
    }
  },
  methods: {
    updateBody () {
      // this.$emit('updateHeaderType', this.contentTypeValue)
      this.bodyData.currentChoice = this.contentType
      console.log('将要更新参数', this.bodyData)
      this.$emit('input', this.bodyData)
    },
    isRawValue (value) {
      return this.bodyType.raw.value
        .map(type => type.value)
        .filter(v => value === v).length > 0
    }
  },
  watch: {
    formData: function () {
      // console.log('Watch检测到fromData的更新', this.formData)
      // this.formData[1].key = 'modify'
      // console.log(this.bodyData)
      this.updateBody()
    },
    rawData: function () {
      this.updateBody()
    }
  },
  computed: {
    contentType: function () {
      return this.radioType !== this.bodyType.raw
        ? this.radioType
        : {
          label: this.bodyType.raw.label,
          value: this.selectType
        }
    },
    contentTypeValue: function () {
      let choiceType = this.radioType !== this.bodyType.raw ? this.radioType.value : this.selectType
      return choiceType
    },
    formData: {
      get: function () {
        return this.bodyData.formData
      },
      set: function (newvalue) {
        this.bodyData.formData = newvalue
      }
    },
    rawData: {
      get: function () {
        return this.bodyData.rawData
      },
      set: function (newvalue) {
        // console.log(newvalue)
        this.bodyData.rawData = newvalue
      }
    }
  },
  created () {
    // let formData = [{
    //   checked: true,
    //   key: 'filename',
    //   type: 'File',
    //   value: null,
    //   description: '头像文件'
    // }, {
    //   checked: true,
    //   key: 'userId',
    //   type: 'Text',
    //   value: 'Sean',
    //   description: '用户名'
    // }]
    // let formDataStr = JSON.stringify(formData)
    // this.formData = JSON.parse(formDataStr)
    // this.radioType = this.bodyType.none
    this.bodyData = this.value
    this.radioType = this.bodyType[this.bodyData.currentChoice.label]
    this.selectType = this.isRawValue(this.bodyData.currentChoice.value)
      ? this.bodyData.currentChoice.value
      : ''
  }
}
</script>
<style type="text/css" lang="scss">
</style>
