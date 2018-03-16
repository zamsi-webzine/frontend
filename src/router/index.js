import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/view/Home'
import Auth from '@/components/view/Auth'
import Profile from '@/components/view/Profile'
import SignIn from '@/components/authentication/SignIn'
import SignUp from '@/components/authentication/SignUp'
import Forgot from '@/components/authentication/Forgot'
import Activation from '@/components/authentication/Activation'
import MyPosts from '@/components/contents/MyPosts'
import Settings from '@/components/contents/Settings'

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
      path: '*',
      redirect: '/'
    },
    {
      path: '/auth',
      component: Auth,
      children: [
        {name: 'SignIn', path: 'signin', component: SignIn},
        {name: 'SignUp', path: 'signup', component: SignUp},
        {name: 'Forgot', path: 'forgot-password', component: Forgot},
        {name: 'Activation', path: 'activation', component: Activation}
      ]
    },
    {
      path: '/profile',
      component: Profile,
      children: [
        {name: 'MyPosts', path: ':nickname/posts', component: MyPosts, props: true},
        {name: 'Settings', path: ':nickname/settings', component: Settings, props: true}
      ],
      meta: {requiresAuth: true}
    }
  ]
})
