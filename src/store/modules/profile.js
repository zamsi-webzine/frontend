import axios from 'axios/index'

import {router} from '../../main'
import * as types from '../types'

const actions = {
  [types.GET_DASHBOARD] ({commit}, state) {
    axios({
      method: 'get',
      url: state.endpoints.dashboard + state.pk.toString() + '/',
      // django를 위해 CSRF 토큰을 헤더에 실어 보낸다
      headers: {
        'X-CSRFToken': 'csrfToken',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + state.jwt
      },
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRFTOKEN',
      // 인증도 true 값으로 보낸다
      credentials: true
    }).then(() => {
      router.replace({
        name: 'MyPosts',
        params: {nickname: state.nickname}
      })
    }).catch((error) => {
      // 응답으로 날아온 에러 메시지를 displayMessage mutations로 보낸다
      if (typeof error.response !== 'undefined') {
        commit(types.CLEAR_MSG)
        commit(types.SET_MSG, error.response.data.message)
      }
    })
  }
}

export default {
  actions
}
