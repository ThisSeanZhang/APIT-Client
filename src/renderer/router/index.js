import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/index',
      name: 'index',
      component: require('@/components/Index').default
    },
    {
      path: '/test',
      name: 'test',
      component: require('@/components/Test').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
