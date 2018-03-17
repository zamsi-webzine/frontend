import Home from '@/components/view/Home'

const Auth = resolve => {
  require.ensure(['@/components/view/Auth'], () => {
    resolve(require('@/components/view/Auth'))
  })
}

const Profile = resolve => {
  require.ensure(['@/components/view/Profile'], () => {
    resolve(require('@/components/view/Profile'))
  })
}

const SignIn = resolve => {
  require.ensure(['@/components/authentication/SignIn'], () => {
    resolve(require('@/components/authentication/SignIn'))
  })
}

const SignUp = resolve => {
  require.ensure(['@/components/authentication/SignUp'], () => {
    resolve(require('@/components/authentication/SignUp'))
  })
}

const Forgot = resolve => {
  require.ensure(['@/components/authentication/Forgot'], () => {
    resolve(require('@/components/authentication/Forgot'))
  })
}

const Activation = resolve => {
  require.ensure(['@/components/authentication/Activation'], () => {
    resolve(require('@/components/authentication/Activation'))
  })
}

const MyPosts = resolve => {
  require.ensure(['@/components/contents/MyPosts'], () => {
    resolve(require('@/components/contents/MyPosts'))
  })
}

const Settings = resolve => {
  require.ensure(['@/components/contents/Settings'], () => {
    resolve(require('@/components/contents/Settings'))
  })
}

export const routes = [
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
      {
        name: 'MyPosts',
        path: 'posts',
        component: MyPosts,
        meta: {requiresAuth: true}
      },
      {
        name: 'Settings',
        path: 'settings',
        component: Settings,
        meta: {requiresAuth: true}
      }
    ]
  }
]
