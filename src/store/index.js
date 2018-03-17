import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

import {router} from '../main'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
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
  },
  getters: {
    // 메시지 존재 여부 체크
    checkoutMsg: state => state.message,
    // 주요 정보 불러오기
    getInfo: state => {
      return {
        email: localStorage.getItem('email'),
        nickname: localStorage.getItem('nickname')
      }
    }
  },
  mutations: {
    // 유저 정보 업데이트
    updateInfo (state, response) {
      const base64 = response.token.split('.')[1]
      const result = JSON.parse(window.atob(base64))

      localStorage.setItem('email', result.email)
      localStorage.setItem('nickname', response.user.nickname)
      localStorage.setItem('pk', result.user_id)
      localStorage.setItem('exp', result.exp)
      localStorage.setItem('orig', result.orig_iat)
      localStorage.setItem('token', response.token)
    },
    // 유저 정보 삭제
    removeInfo () {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('nickname')
      localStorage.removeItem('pk')
      localStorage.removeItem('exp')
      localStorage.removeItem('orig')
    },
    // 서버 메시지 세팅
    setMessage (state, message) {
      state.message = message
    },
    // 서버 메시지 비움
    clearMessage (state) {
      state.message = null
    }
  },
  actions: {
    // 회원가입
    signUp: ({commit, state}, payload) => {
      return axios({
        method: 'post',
        url: state.endpoints.baseUrl + state.endpoints.auth + state.endpoints.signUp,
        data: {
          email: payload.email,
          nickname: payload.nickname,
          password1: payload.password1,
          password2: payload.password2
        },
        headers: {
          'Content-Type': 'application/json'
        },
        xsrfHeaderName: 'X-XSRF-TOKEN',
        credentials: true
      }).then((response) => {
        commit('clearMessage')
        router.replace({
          name: 'Activation'
        })
        commit('setMessage', response.data.message)
        commit('updateInfo', response.data)
      }).catch((error) => {
        if (typeof error.response !== 'undefined') {
          commit('clearMessage')
          commit('setMessage', error.response.data.message)
        }
      })
    },
    // 로그인
    signIn: ({commit, state, dispatch}, payload) => {
      return axios({
        method: 'post',
        url: state.endpoints.baseUrl + state.endpoints.auth + state.endpoints.signIn,
        data: {
          email: payload.email,
          password: payload.password
        },
        headers: {
          'Content-Type': 'application/json'
        },
        xsrfHeaderName: 'X-XSRF-TOKEN',
        credentials: true
      }).then((response) => {
        commit('clearMessage')
        commit('updateInfo', response.data)
        dispatch('getProfile')
      }).catch((error) => {
        console.log(error)
        if (typeof error.response !== 'undefined') {
          commit('clearMessage')
          commit('setMessage', error.response.data.message)
        }
      })
    },
    // 로그아웃
    signOut: ({commit}) => {
      commit('removeInfo')
      router.replace({
        name: 'Home'
      })
    },
    // 비밀번호 초기화
    resetPassword: ({commit, state}, payload) => {
      axios({
        method: 'post',
        url: state.endpoints.baseUrl + state.endpoints.auth + state.endpoints.resetPassword,
        data: {
          email: payload.email
        },
        headers: {
          'Content-Type': 'application/json'
        },
        xsrfHeaderName: 'X-XSRF-TOKEN',
        credentials: true
      }).then((response) => {
        commit('clearMessage')
        router.replace({
          name: 'Activation'
        })
        commit('setMessage', response.data.message)
      }).catch((error) => {
        if (typeof error.response !== 'undefined') {
          commit('clearMessage')
          commit('setMessage', error.response.data.message)
        }
      })
    },
    // 프로필 획득
    getProfile: ({commit, state}) => {
      axios({
        method: 'get',
        url: state.endpoints.baseUrl + state.endpoints.profile + localStorage.getItem('pk') + '/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + localStorage.getItem('token')
        },
        xsrfHeaderName: 'X-XSRF-TOKEN',
        credentials: true
      }).then(() => {
        router.replace({
          name: 'MyPosts',
          params: {nickname: localStorage.getItem('nickname')}
        })
      })
    },
    // 프로필 수정
    patchProfile: ({commit, state, dispatch}, payload) => {
      axios({
        method: 'patch',
        url: state.endpoints.baseUrl + state.endpoints.profile + localStorage.getItem('pk') + '/',
        data: {
          nickname: payload.nickname,
          password1: payload.password1,
          password2: payload.password2
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + localStorage.getItem('token')
        },
        xsrfHeaderName: 'X-XSRF-TOKEN',
        credentials: true
      }).then((response) => {
        commit('clearMessage')
        commit('updateInfo', response.data)
        dispatch('getProfile')
      }).catch((error) => {
        if (typeof error.response !== 'undefined') {
          commit('clearMessage')
          commit('setMessage', error.response.data.message)
        }
      })
    },
    // 회원 탈퇴
    destroyProfile: () => {

    }
  },
  strict: debug
})
