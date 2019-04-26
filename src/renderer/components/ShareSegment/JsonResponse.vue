<template>
  <div>
    <span v-html="showResponse"></span>
  </div>
</template>
<script>
export default {
  name: 'json-response',
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      colorType: {
        NORMAL: null,
        KEY: '#909399',
        NUMBER: '#67C23A',
        STRING: '#409EFF',
        BOOLEAN: '#E6A23C',
        NULL: '#F56C6C'
      }
    }
  },
  computed: {
    showResponse: function () {
      if (this.value === null) {
        return ''
      }
      try {
        return this.obj2HTML(0, null, JSON.parse(this.value))
      } catch (e) {
        return ''
      }
    }
  },
  methods: {
    obj2HTML (span, key, obj, last = true) {
      const value = {
        '[object Number]': v => this.pStr(span, key, v, last, this.colorType.NUMBER),
        '[object Array]': arr => this.pStr(span, key, '[') +
        arr.map((element, i) => this.obj2HTML(span + 1, null, element, i + 1 === arr.length)).join('') + this.pStr(span, null, ']', last),
        '[object String]': str => this.pStr(span, key, '"' + str + '"', last, this.colorType.STRING),
        '[object Object]': obj => {
          const params = Object.keys(obj)
          return this.pStr(span, key, '{') +
          params.map((k, i) =>
            this.obj2HTML(span + 1, k, obj[k], i + 1 === params.length)).join('') + this.pStr(span, null, '}', last)
        },
        '[object Boolean]': bol => this.pStr(span, key, bol, last, this.colorType.BOOLEAN)
      }
      if (obj === null) return this.pStr(span, key, obj, last, this.colorType.NULL)
      // console.log('方法的类型' + Object.prototype.toString.call(obj), obj)
      // console.log(value[Object.prototype.toString.call(obj)](obj))
      return value[Object.prototype.toString.call(obj)](obj)
    },
    pStr (span, key, value, last = true, color = this.colorType.NORMAL) {
      const pTagStart = '<p style="text-indent:' + span * 20 + 'px">'
      const spanKey = key === null ? '' : '<span style="color: ' + this.colorType.KEY + ';">"' + key + '"</span>: '
      const patten = /\]|}/
      const spanValue = patten.test(value) ? value : '<span style="color: ' + color + ';">' + value + '</span>'
      const separator = last ? '' : ','
      return pTagStart + spanKey + spanValue + separator + '</p>'
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
