import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwtDecode from 'jwt-decode'
import Vuex from 'vuex'

import router from '@/router/index'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    // 로컬 스토리지에서 토큰을 불러들인다
    jwt: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
    pk: localStorage.getItem('pk'),
    exp: localStorage.getItem('exp'),
    orig_iat: localStorage.getItem('orig'),
    // 여러 메소드에 사용할 URL 값을 객체화
    endpoints: {
      obtainJWT: 'http://localhost:8000/auth/obtain_token/',
      refreshJWT: 'http://localhost:8000/auth/refresh_token/'
    },
    msg: ''
  },
  mutations: {
    // 토큰 업데이트
    updateInfo (state, resData) {
      // localStorage 업데이트 & state 업데이트
      // 토큰
      localStorage.setItem('token', resData.token)
      state.jwt = resData.token

      // 토큰 decode
      const base64 = resData.token.split('.')[1]
      const result = JSON.parse(window.atob(base64))

      // 이메일
      localStorage.setItem('email', result.email)
      state.email = result.email
      // pk
      localStorage.setItem('pk', result.user_id)
      state.pk = result.user_id
      // 만료시간
      localStorage.setItem('exp', result.exp)
      state.exp = result.exp
      // 생성시간
      localStorage.setItem('orig_iat', result.orig_iat)
      state.orig_iat = result.orig_iat
    },
    // 토큰 삭제
    removeUserInfo (state) {
      localStorage.removeItem('token')
      state.jwt = null
      localStorage.removeItem('pk')
      state.pk = null
      localStorage.removeItem('email')
      state.orig_iat = null
      localStorage.removeItem('exp')
      state.exp = null
      localStorage.removeItem('orig_iat')
      state.orig_iat = null
    },
    // 로그인에 실패했을 경우 Store에 에러 메시지를 보낸다
    displayError (state, error) {
      state.msg = error
    }
  },
  actions: {
    // 토큰 얻기
    // parameters:
    // commit: 상태 변경을 위한 콜백 함수
    // formData: 사용자가 입력하는 이메일, 비밀번호 값
    obtainInfo ({commit}, formData) {
      // axios를 통해 POST 요청을 보낸다
      axios({
        method: 'post',
        url: this.state.endpoints.obtainJWT,
        data: {
          email: formData.email,
          password: formData.password
        },
        // django를 위해 CSRF 토큰을 헤더에 실어 보낸다
        headers: {
          'X-CSRFToken': 'csrfToken',
          'Content-Type': 'application/json'
        },
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRFTOKEN',
        // 인증도 true 값으로 보낸다
        credentials: true
        // 전송에 성공할 경우
      }).then((response) => {
        // 응답으로 날아온 토큰 값을 updateInfo mutations로 보낸다
        this.commit('updateInfo', response.data)
        router.replace({
          name: 'Dashboard',
          params: {pk: this.state.pk}
        })
        // 전송에 실패할 경우
      }).catch((error) => {
        // 응답으로 날아온 에러 메시지를 displayError mutations로 보낸다
        if (typeof error.response !== 'undefined') {
          this.commit('displayError', error.response.data.message)
        }
      })
    },
    refreshToken () {
      const payload = {
        token: this.state.jwt
      }

      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response) => {
          this.commit('updateInfo', response.data.token)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    inspectToken () {
      const token = this.state.jwt
      if (token) {
        const decoded = jwtDecode(token)
        const exp = decoded.exp
        const origIat = decoded.orig_iat

        if ((Date.now() / 1000) - exp < 1800 && (Date.now() / 1000) - origIat < 628200) {
          this.dispatch('refreshToken')
        } else if ((Date.now() / 1000) - exp < 1800) {

        } else {

        }
      }
    }
  }
})
