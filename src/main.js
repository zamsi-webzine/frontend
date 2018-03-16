// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss'

import { routes } from './router/index'
import store from './store/index'

Vue.config.productionTip = false

/* Axios Configuration */
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

/* VueRouter */
Vue.use(VueRouter)

export const router = new VueRouter({
  routes,
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
