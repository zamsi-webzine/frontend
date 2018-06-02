import {
  Home,
  Auth,
  SignIn,
  SignUp,
  Forgot,
  Activation,
  Profile,
  MyPosts,
  Settings,
  Post,
  PostCreate,
  PostDetail,
  PostUpdate
} from './lazy'

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
    path: '/post',
    component: Post,
    // Authentication 검사를 위해 메타 태그 추가
    meta: {requiresAuth: true},
    children: [
      {
        name: 'NewPost',
        path: 'new',
        component: PostCreate
      },
      {
        name: 'AuthorPostDetail',
        path: 'author-only/:pk',
        component: PostDetail
      },
      {
        name: 'UpdatePost',
        path: 'update/:pk',
        component: PostUpdate
      }
    ]
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
