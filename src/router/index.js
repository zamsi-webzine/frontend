import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/view/Home'
import SignIn from '@/components/authentication/SignIn'
import SignUp from '@/components/authentication/SignUp'
import Activation from '@/components/authentication/Activation'
import Forgot from '@/components/authentication/Forgot'
import Dashboard from '@/components/view/Dashboard'
import ProfileSetting from '@/components/view/ProfileSetting'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
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
      path: '/forgot-password',
      name: Forgot,
      component: Forgot
    },
    {
      path: '/dashboard/:nickname',
      name: 'Dashboard',
      component: Dashboard,
      props: true,
      meta: {requiresAuth: true}
    },
    {
      path: '/profile/:nickname',
      name: 'Profile',
      component: ProfileSetting,
      props: true,
      meta: {requiresAuth: true}
    }
  ]
})
