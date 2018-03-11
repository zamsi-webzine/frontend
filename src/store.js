import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwtDecode from 'jwt-decode'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    jwt: localStorage.getItem('t'),
    endpoints: {
      obtainJWT: 'http://localhost:8000/auth/obtain_token/',
      refreshJWT: 'http://localhost:8000/auth/refresh_token/'
    }
  },
  mutations: {
    updateToken (state, newToken) {
      localStorage.setItem('t', newToken)
      state.jwt = newToken
    },
    removeToken (state) {
      localStorage.removeItem('t')
      state.jwt = null
    }
  },
  actions: {
    obtainToken ({commit}, formData) {
      axios({
        method: 'post',
        url: this.state.endpoints.obtainJWT,
        data: {
          email: formData.email,
          password: formData.password
        },
        headers: {
          'X-CSRFToken': 'csrfToken',
          'Content-Type': 'application/json'
        },
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRFTOKEN',
        credentials: true
      }).then((response) => {
        this.commit('updateToken', response.data.token)
      })
        .catch((error) => {
          console.log(error)
        })
    },
    refreshToken () {
      const payload = {
        token: this.state.jwt
      }

      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
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
