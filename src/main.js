// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from './router/index';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import axios from 'axios';
import store from './store/index';

Vue.config.productionTip = false;

/* Axios Configuration */
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* VueRouter */
Vue.use(VueRouter);

export const router = new VueRouter({
  // vue-router import
  routes,
  // HTML5 히스토리 모드 적용 - URL 해시 제거
  mode: 'history',
});

// 글로벌 네비게이션 가드
// 네비게이션이 트리거된 순간, 다음 컴포넌트로 이동하기 전에 작동하는 함수
router.beforeEach((to, from, next) => {
  // 만일 다음에 이동할 라우트 객체의 메타 필드에 requiresAuth가 있다면
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 로컬 스토리지의 토큰이 존재하는지 확인한다
    if (localStorage.getItem('token')) {
      // 있으면 통과
      next();
    } else {
      // 없으면 로그인 페이지로 강제 리다이렉트
      next({
        name: 'SignIn',
        query: { redirect: to.fullPath },
      });
    }
  //   requiresAuth가 없다면 통과
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app');
