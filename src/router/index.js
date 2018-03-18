const Home = () => import('../components/view/Home')

const Activation = () => import('../components/authentication/Activation')

const Forgot = () => import('../components/authentication/Forgot')

const SignIn = () => import('../components/authentication/SignIn')

const SignUp = () => import('../components/authentication/SignUp')

const MyPosts = () => import('../components/contents/MyPosts')

const Settings = () => import('../components/contents/Settings')

const Auth = () => import('../components/view/Auth')

const Profile = () => import('../components/view/Profile')

export const routes = [
  {
    path: '/',
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
