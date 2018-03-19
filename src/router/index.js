// 지연된 로딩을 위해 라우터에 쓰이는 모든 컴포넌트를 별도의 단위로 분할
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
    // Auth 컴포넌트의 자식 컴포넌트 4가지
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
    // Profile 컴포넌터의 자식 컴포넌트 2가지
    children: [
      {
        name: 'MyPosts',
        path: 'posts',
        component: MyPosts,
        // Authentication 검사를 위해 메타 태그 추가
        meta: {requiresAuth: true}
      },
      {
        name: 'Settings',
        path: 'settings',
        component: Settings,
        // Authentication 검사를 위해 메타 태그 추가
        meta: {requiresAuth: true}
      }
    ]
  }
]
