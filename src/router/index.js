import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/view/Home'
import SignIn from '@/components/view/SignIn'
import SignUp from '@/components/view/SignUp'
import Activation from '@/components/view/Activation'
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
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/activation',
      name: 'Activation',
      component: Activation
    },
    {
      path: '/dashboard/:nickname',
      name: 'Dashboard',
      component: Dashboard,
      props: true
    }
  ]
})
