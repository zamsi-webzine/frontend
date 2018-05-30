import axios from 'axios/index'
import { router } from '../main'

// 회원가입
export const signUp = ({commit, state}, payload) => {
  axios({
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
}
// 로그인
export const signIn = ({commit, state, dispatch}, payload) => {
  axios({
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
    if (typeof error.response !== 'undefined') {
      commit('clearMessage')
      commit('setMessage', error.response.data.message)
    }
  })
}
// 로그아웃
export const signOut = ({commit}) => {
  commit('removeInfo')
  router.replace({
    name: 'Home'
  })
}
// 비밀번호 초기화
export const resetPassword = ({commit, state}, payload) => {
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
}

// 프로필 획득
export const getProfile = ({commit, state}) => {
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
      name: 'MyPosts'
    })
  })
}
// 프로필 수정
export const patchProfile = ({commit, state, dispatch}, payload) => {
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
    router.replace({
      name: 'MyPosts'
    })
  }).catch((error) => {
    if (typeof error.response !== 'undefined') {
      commit('clearMessage')
      commit('setMessage', error.response.data.message)
    }
  })
}
// 썸네일 수정
export const patchThumbnail = ({commit, state}, payload) => {
  axios({
    method: 'patch',
    url: state.endpoints.baseUrl + state.endpoints.profile +
    localStorage.getItem('pk') + '/' + state.endpoints.thumbnail,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data;boundary="boundary"',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    localStorage.setItem('thumbnail', response.data.thumbnail)
    router.go(router.currentRoute)
  }).catch((error) => {
    if (typeof error.response !== 'undefined') {
      commit('clearMessage')
      commit('setMessage', error.response.data)
    }
  })
}
// 회원 탈퇴
export const destroyProfile = ({commit, state, dispatch}) => {
  axios({
    method: 'delete',
    url: state.endpoints.baseUrl + state.endpoints.profile + localStorage.getItem('pk') + '/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then(() => {
    commit('removeInfo')
    router.replace({
      name: 'Home'
    })
  }).catch((error) => {
    if (typeof error.response !== 'undefined') {
      commit('clearMessage')
      commit('setMessage', error.response.data.message)
    }
  })
}

// 글쓰기
export const uploadPost = ({commit, state}, payload) => {
  axios({
    method: 'post',
    url: state.endpoints.baseUrl + state.endpoints.post + localStorage.getItem('pk') + '/',
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data;boundary="boundary"',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then(() => {
    router.push({
      name: 'MyPosts'
    })
  }).catch((error) => {
    if (typeof error.response !== 'undefined') {
      commit('clearMessage')
      commit('setMessage', error.response.data)
    }
  })
}

// 글 목록
export const getAuthorPostList = ({commit, state}) => {
  axios({
    method: 'get',
    url: state.endpoints.baseUrl + state.endpoints.post + localStorage.getItem('pk') + '/',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('updateAuthorPostList', response.data)
  }).catch((error) => {
    if (typeof error.response !== 'undefined') {
      commit('clearMessage')
      commit('setMessage', error.response.data)
    }
  })
}

// 글 디테일
export const getAuthorPostRetrieve = ({commit, state}, payload) => {
  axios({
    method: 'get',
    url: state.endpoints.baseUrl + state.endpoints.post + localStorage.getItem('pk') + '/' + payload + '/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    credentials: true
  }).then((response) => {
    commit('clearAuthorPostDetail')
    commit('updateAuthorPostDetail', response.data)
  }).catch((error) => {
    if (typeof error.response !== 'undefined') {
      commit('clearMessage')
      commit('setMessage', error.response.data.message)
    }
  })
}
