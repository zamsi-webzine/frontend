import jwtDecode from 'jwt-decode'
import axios from 'axios/index'

import router from '@/router/index'
import * as types from '../types'

// state
const state = {
  // 로컬 스토리지에서 토큰을 불러들인다
  jwt: localStorage.getItem('token'),
  email: localStorage.getItem('email'),
  nickname: localStorage.getItem('nickname'),
  pk: localStorage.getItem('pk'),
  exp: localStorage.getItem('exp'),
  orig_iat: localStorage.getItem('orig'),
  // 여러 메소드에 사용할 URL 값을 객체화
  endpoints: {
    obtainJWT: 'http://localhost:8000/auth/obtain_token/',
    refreshJWT: 'http://localhost:8000/auth/refresh_token/',
    signUp: 'http://localhost:8000/auth/signup/',
    resetPWD: 'http://localhost:8000/auth/reset-password/',
    dashboard: 'http://localhost:8000/profile/'
  },
  msg: null
}

// getters
const getters = {
  [types.CHECKOUT_MSG]: state => state.msg,
  [types.GET_INFO]: state => {
    return {
      email: state.email,
      nickname: state.nickname
    }
  }
}

// actions
const actions = {
  // 토큰 얻기
  // parameters:
  // commit: 상태 변경을 위한 콜백 함수
  // formData: 사용자가 입력하는 이메일, 비밀번호 값
  [types.OBTAIN_INFO]: ({commit, state, dispatch}, formData) => {
    // axios를 통해 POST 요청을 보낸다
    axios({
      method: 'post',
      url: state.endpoints.obtainJWT,
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
      commit(types.CLEAR_MSG)
      // 응답으로 날아온 토큰 값을 updateInfo mutations로 보낸다
      commit(types.UPDATE_INFO, response.data)
      console.log('woo')
      dispatch(types.GET_DASHBOARD, state)
      // 전송에 실패할 경우
    }).catch((error) => {
      // 응답으로 날아온 에러 메시지를 setMessage mutations로 보낸다
      if (typeof error.response !== 'undefined') {
        commit(types.CLEAR_MSG)
        commit(types.SET_MSG, error.response.data.message)
      }
    })
  },
  [types.REFRESH_TOKEN]: ({commit, state}) => {
    const payload = {
      token: state.jwt
    }

    axios.post(state.endpoints.refreshJWT, payload)
      .then((response) => {
        commit(types.UPDATE_INFO, response.data.token)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  inspectToken: state => {
    const token = state.jwt
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
  },
  [types.SIGNUP_DATA]: ({commit, state}, formData) => {
    axios({
      method: 'post',
      url: state.endpoints.signUp,
      data: {
        email: formData.email,
        nickname: formData.nickname,
        password1: formData.password1,
        password2: formData.password2
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
    }).then((response) => {
      commit(types.CLEAR_MSG)
      commit(types.SET_MSG, response.data.message)
      router.replace({
        name: 'Activation'
      })
    }).catch((error) => {
      if (typeof error.response !== 'undefined') {
        commit(types.CLEAR_MSG)
        commit(types.SET_MSG, error.response.data.message)
      }
    })
  },
  [types.RESET_PW]: ({commit, state}, formData) => {
    axios({
      method: 'post',
      url: state.endpoints.resetPWD,
      data: {
        email: formData.email
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
    }).then((response) => {
      commit('clearMessage')
      commit('setMessage', response.data.message)
      router.replace({
        name: 'Activation'
      })
    }).catch((error) => {
      if (typeof error.response !== 'undefined') {
        commit('clearMessage')
        commit('setMessage', error.response.data.message)
      }
    })
  }
}

// mutations
const mutations = {
  // 토큰 업데이트
  [types.UPDATE_INFO]: (state, resData) => {
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
    // 닉네임
    localStorage.setItem('nickname', resData.user.nickname)
    state.nickname = resData.user.nickname
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
  [types.REMOVE_INFO]: state => {
    localStorage.removeItem('token')
    state.jwt = null
    localStorage.removeItem('pk')
    state.pk = null
    localStorage.removeItem('email')
    state.orig_iat = null
    localStorage.removeItem('nickname')
    state.nickname = null
    localStorage.removeItem('exp')
    state.exp = null
    localStorage.removeItem('orig_iat')
    state.orig_iat = null
  },
  // 상태 메시지 삭제
  [types.CLEAR_MSG]: state => {
    state.msg = null
  },
  // 상태 메시지 설정
  [types.SET_MSG]: (state, msg) => {
    state.msg = msg
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
