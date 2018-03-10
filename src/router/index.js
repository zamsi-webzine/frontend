import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/view/Index'
import Auth from '@/components/view/Auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Auth
    }
  ]
})
