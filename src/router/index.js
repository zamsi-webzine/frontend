import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/view/Home'
import Signin from '@/components/view/Signin'
import Dashboard from '@/components/view/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Signin
    },
    {
      path: '/dashboard/:nickname',
      name: 'Dashboard',
      component: Dashboard,
      props: true
    }
  ]
})
