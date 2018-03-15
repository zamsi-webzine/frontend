<template>
  <section class="container" id="signin">
    <div class="row align-items-end">
      <div class="col-sm"/>
      <div class="col-sm-6">
        <!--로그인 폼 필드-->
        <form @submit.prevent="OBTAIN_INFO({email: email, password: password})" method="post">
          <!--제목-->
          <div class="form-group row">
            <h2 id="signin-title">Sign In</h2>
          </div>
          <!--아이디 입력 그룹-->
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-4 col-form-label">Email</label>
            <div class="col-sm-8">
              <input type="email"
                     class="form-control"
                     id="inputEmail3"
                     placeholder="Email"
                     v-model="email"
              >
            </div>
          </div>
          <!--비밀번호 입력 그룹-->
          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-4 col-form-label">Password</label>
              <div class="col-sm-8">
                <input type="password"
                       class="form-control"
                       id="inputPassword3"
                       placeholder="Password"
                       v-model="password">
              </div>
          </div>
          <!--submit 그룹-->
          <div class="form-group row">
              <div class="col-sm-4 col-12">
                <button type="submit" class="btn btn-primary">Sign in</button>
              </div>
              <div class="col-sm-4 col-6">
                <a type="button" class="btn btn-link" id="btn-forgot" href="/#/forgot-password">Forgot Password?</a>
              </div>
          </div>
          <!--에러 메시지 그룹 (hidden)-->
          <div class="form-group row">
            <checkout-message/>
          </div>
        </form>
      </div>
      <div class="col-sm"/>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
import CheckoutMessage from '../contents/CheckoutMessage'
export default {
  components: {CheckoutMessage},
  name: 'SignIn',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      types.OBTAIN_INFO
    ])
  }
}

</script>

<style scoped>
  form {
    margin: 200px 0 200px 0;
  }
  #signin-title {
    padding-left: 15px;
    margin-bottom: 25px;
  }
  #btn-forgot {
    padding-left: 0;
  }
</style>
