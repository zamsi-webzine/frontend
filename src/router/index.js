import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/view/Home'
import Login from '@/components/view/Login'
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
      component: Login
    },
    {
      path: '/dashboard/:nickname',
      name: 'Dashboard',
      component: Dashboard,
      props: true
    }
  ]
})
