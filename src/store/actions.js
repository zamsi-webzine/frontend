import axios from 'axios'

export const actions = {
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
        'X-CSRFToken': 'csrfToken',
        'Content-Type': 'application/json'
      },
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      withCredentials: true
    }).then((response) => {
      commit('clearMessage')
      commit('setMessage', response.data.message)
      commit('updateInfo', response.data)
      this.$router.replace({
        name: 'Activation'
      })
    }).catch((error) => {
      if (typeof error.response !== 'undefined') {
        commit('clearMessage')
        commit('setMessage', error.response.data.message)
      }
    })
  },
  // 로그인
  login: ({commit, state, dispatch}, payload) => {
    return axios({
      method: 'post',
      url: state.endpoints.baseUrl + state.endpoints.auth + state.endpoints.signIn,
      data: {
        email: payload.email,
        password: payload.password
      },
      headers: {
        'X-CSRFToken': 'csrfToken',
        'Content-Type': 'application/json'
      },
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      withCredentials: true
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
  // 로그아웃
  signOut: ({commit}) => {
    commit('removeInfo')
    this.$router.replace({
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
        'X-CSRFToken': 'csrfToken',
        'Content-Type': 'application/json'
      },
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      withCredentials: true
    }).then((response) => {
      commit('clearMessage')
      commit('setMessage', response.data.message)
      this.$router.replace({
        name: 'Activation'
      })
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
      url: state.endpoints.baseUrl + state.endpoints.profile + state.pk.toString() + '/',
      headers: {
        'X-CSRFToken': 'csrfToken',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + state.token
      },
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      withCredentials: true
    }).then(() => {
      this.$router.replace({
        name: 'MyPosts',
        params: {nickname: state.nickname}
      })
    })
  },
  // 프로필 수정
  patchProfile: ({commit, state, dispatch}, payload) => {
    axios({
      method: 'patch',
      url: state.endpoints.baseUrl + state.endpoints.profile + state.pk.toString() + '/',
      data: {
        nickname: payload.nickname,
        password1: payload.password1,
        password2: payload.password2
      },
      headers: {
        'X-CSRFToken': 'csrfToken',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + state.token
      },
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      withCredentials: true
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
}
