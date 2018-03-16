import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  // 로컬 스토리지에서 토큰을 불러들인다
  token: localStorage.getItem('token'),
  email: localStorage.getItem('email'),
  nickname: localStorage.getItem('nickname'),
  pk: localStorage.getItem('pk'),
  exp: localStorage.getItem('exp'),
  orig_iat: localStorage.getItem('orig'),
  // 여러 메소드에 사용할 URL 값을 객체화
  endpoints: {
    baseUrl: 'http://localhost:8000/',
    auth: 'auth/',
    profile: 'profile/',
    signIn: 'signin/',
    signUp: 'signup/',
    resetPassword: 'reset-password/'
  },
  // 서버에서 돌아오는 메시지
  message: null
}


export default new Vuex.Store({
  modules: {
    state,
    getters,
    actions,
    mutations
  },
  strict: debug
})
