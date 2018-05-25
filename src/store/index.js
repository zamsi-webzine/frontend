import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  // 여러 메소드에 사용할 URL 값을 객체화
  endpoints: {
    baseUrl: 'http://localhost:8000/',
    auth: 'auth/',
    profile: 'profile/',
    signIn: 'signin/',
    signUp: 'signup/',
    thumbnail: 'thumbnail/',
    post: 'post/',
    resetPassword: 'reset-password/'
  },
  posts: {
    count: '',
    next: '',
    previous: '',
    results: ''
  },
  // 서버에서 돌아오는 메시지
  message: null
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
})

export default store
