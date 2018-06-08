// 지연된 로딩을 위해 라우터에 쓰이는 모든 컴포넌트를 별도의 단위로 분할
export const Home = () => import('../components/view/Home');

export const Auth = () => import('../components/view/Auth');

export const Profile = () => import('../components/view/Profile');

export const Post = () => import('../components/view/Post');

export const Category = () => import('../components/view/Category');

export const Activation = () => import('../components/authentication/Activation');

export const Forgot = () => import('../components/authentication/Forgot');

export const SignIn = () => import('../components/authentication/SignIn');

export const SignUp = () => import('../components/authentication/SignUp');

export const MyPosts = () => import('../components/contents/admin/MyPosts');

export const Settings = () => import('../components/contents/admin/Settings');

export const PostCreate = () => import('../components/contents/post/PostCreate');

export const PostDetail = () => import('../components/contents/post/PostDetail');

export const PostUpdate = () => import('../components/contents/post/PostUpdate');

export const ClientPostDetail = () => import('../components/contents/client/ClientPostDetail');

export const EnterViewQuery = () => import('../components/contents/client/ClientEnterViewQuery');

export const ReViewQuery = () => import('../components/contents/client/ClientReViewQuery');

export const OverViewQuery = () => import('../components/contents/client/ClientOverViewQuery');

export const About = () => import('../components/contents/client/About');
