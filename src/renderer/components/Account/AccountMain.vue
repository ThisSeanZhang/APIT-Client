<template>
  <div class="form_box">
    <div class="from_head">
      <div @click="changePanel('login')" :class="{ active: readyLogin }">登入</div>
      <div @click="changePanel('register')" :class="{ active: !readyLogin }">  注册</div>
    </div>
    <transition name="fade" >
      <keep-alive>
      <developer-sign-in v-on:login:success="loginSuccess" class="input_box" v-if="readyLogin" ></developer-sign-in>
      <developer-register class="input_box" v-else v-model="readyLogin" ></developer-register>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import DeveloperRegister from './DeveloperRegister'
import DeveloperSignIn from './DeveloperSignIn'

export default {
  name: 'account-main',
  components: {DeveloperRegister, DeveloperSignIn},
  data () {
    return {
      readyLogin: true
    }
  },
  methods: {
    changePanel (target) {
      this.readyLogin = target === 'login'
    },
    loginSuccess () {
      this.$emit('login:success')
    }
  }
}
</script>
<style lang="scss" type="text/css" scoped>
  .form_box{
    width: 400px;
    height: 400px;
    padding: 20px 10px;
    border: 1px solid rgba(76, 107, 107, 0.19);
    box-shadow: 10px 10px 2px #f0f0f0;
    border-radius: 5px;
    background-color: #ffffff;

    position: absolute;
    bottom: 0px;
    top: 0px;
    right: 0px;
    left: 0px;
    margin: auto;
    .from_head {
      height: 40px;
      line-height: 40px;
      font-size: 24px;
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      width: 100%;
      margin: 0 auto;
      text-align: center;
      div:first-child {
        cursor: pointer;
        flex: 1;
      }
      div:last-child{
        cursor: pointer;
        flex: 1;
      }
    }
  }
  .active{
    border-bottom: 1px solid #333;
  }
  .input_box{
    position:absolute;
    width: 96%;
    text-align: right;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease;
  }
  .fade-enter {
    transform: translateX(-400px);
    opacity: 0;
  }
  .fade-leave-to{
    transform: translateX(400px);
    opacity: 0;
   }
</style>

