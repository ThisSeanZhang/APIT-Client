<template>
    <div>
        Hello World!!
        <button class="alt" @click="goto('user')">user-home</button>
        <button class="alt" @click="get()">user-home</button>
        <button class="alt" @click="ajax()">user-home</button>
        <button class="alt" @click="ccc()">step1</button>
        <button class="alt" @click="editCookie()">step2</button>
        <button class="alt" @click="changeCookie()">step3</button>
        <div>{{message}}</div>
        <div>{{env}}</div>
        <div>{{response}}</div>
        <ul>
          <li v-for="(value ,key) in cookie" :key="key" :value="value">
            {{ key }}:{{ value }}
          </li>
        </ul>
    </div>
</template>
<script>

import axios from 'axios'

export default {
  name: 'user-home',
  data () {
    return {
      response: null,
      message: 'none',
      env: process.env.NODE_ENV,
      xmlhttp: null,
      cookie: {}
    }
  },
  methods: {
    goto (r) {
      this.$router.push('/')
    },
    get () {
      this.message = 'wait'
      axios.get('http://localhost:8080/test')
        .then(response => {
          this.message = 'done'
          this.response = response
          console.log(response)
          console.log(document)
        })
        .catch(error => {
          this.message = 'error'
          console.log(error)
        })
    },
    ajax () {
      this.xmlhttp = new XMLHttpRequest()
      this.xmlhttp.onreadystatechange = () => {
        if (this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200) {
          console.log(this.xmlhttp.getAllResponseHeaders())
        }
      }
      this.xmlhttp.open('POST', 'http://localhost:8080/login', true)
      this.xmlhttp.setRequestHeader('Content-type', 'application/json')
      this.xmlhttp.send('{ "userName": "Sean", "passWord": "456789", "rememberMe": true}')
    },
    ccc () {
      this.$electron.ipcRenderer.send('request_cookie')
    },
    editCookie () {
      this.$electron.ipcRenderer.removeAllListeners('response_cookie')
      this.$electron.ipcRenderer.once('response_cookie', (event, arg) => {
        this.cookie = arg[1]
        console.log(this.cookie)
      })
    },
    changeCookie () {
      this.$electron.ipcRenderer.removeAllListeners('save_cookie_result')
      this.$electron.ipcRenderer.once('save_cookie_result', (event, arg) => {
        console.log(!arg ? 'Done!' : 'Error!')
      })
      console.log(this.cookie.expirationDate)
      this.cookie.url = 'http://localhost'
      this.cookie.expirationDate += 60
      this.$electron.ipcRenderer.send('set_cookie', this.cookie)
    }
  }
}
</script>
