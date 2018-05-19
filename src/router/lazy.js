// 지연된 로딩을 위해 라우터에 쓰이는 모든 컴포넌트를 별도의 단위로 분할
export const Home = () => import('../components/view/Home')

export const Activation = () => import('../components/authentication/Activation')

export const Forgot = () => import('../components/authentication/Forgot')

export const SignIn = () => import('../components/authentication/SignIn')

export const SignUp = () => import('../components/authentication/SignUp')

export const MyPosts = () => import('../components/contents/admin/MyPosts')

export const Settings = () => import('../components/contents/admin/Settings')

export const Auth = () => import('../components/view/Auth')

export const Profile = () => import('../components/view/Profile')

export const PostCreate = () => import('../components/contents/post/PostCreate')
