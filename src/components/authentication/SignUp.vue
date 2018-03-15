<template>
  <div class="container" id="signUp">
    <div class="row align-items-end">
      <div class="col-sm"/>
      <div class="col-sm-6">
        <!--로그인 폼 필드-->
        <form @submit.prevent="SIGMUP_DATA({
        email: email,
        nickname: nickname,
        password1: password1,
        password2: password2
        })" method="post">
          <!--제목-->
          <div class="form-group row">
            <h2 id="signUp-title">Sign Up</h2>
          </div>
          <!--아이디 입력 그룹-->
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-4 col-form-label">Email</label>
            <div class="col-sm-8">
              <input type="email"
                     class="form-control"
                     id="inputEmail3"
                     placeholder="Email"
                     v-model="email">
            </div>
          </div>
          <!--닉네임 입력 그룹-->
          <div class="form-group row">
            <label for="inputNickname3" class="col-sm-4 col-form-label">Nickname</label>
            <div class="col-sm-8">
              <input type="text"
                     class="form-control"
                     id="inputNickname3"
                     placeholder="Nickname"
                     v-model="nickname">
            </div>
          </div>
          <!--비밀번호1 입력 그룹-->
          <div class="form-group row">
            <label for="inputPassword1" class="col-sm-4 col-form-label">Password 1</label>
            <div class="col-sm-8">
              <input type="password"
                     class="form-control"
                     id="inputPassword1"
                     placeholder="Password"
                     v-model="password1">
            </div>
          </div>
          <!--비밀번호2 입력 그룹-->
          <div class="form-group row">
            <label for="inputPassword2" class="col-sm-4 col-form-label">Password 2</label>
            <div class="col-sm-8">
              <input type="password"
                     class="form-control"
                     id="inputPassword2"
                     placeholder="Password Repeat"
                     v-model="password2">
            </div>
          </div>
          <!--submit 그룹-->
          <div class="form-group row">
            <div class="col-sm-4 col-12">
              <button type="submit" class="btn btn-primary">Sign Up</button>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
import CheckoutMessage from '../contents/CheckoutMessage'
export default {
  components: {CheckoutMessage},
  name: 'signUp',
  data: function () {
    return {
      email: '',
      nickname: '',
      password1: '',
      password2: ''
    }
  },
  methods: {
    ...mapActions([
      types.SIGNUP_DATA
    ])
  }
}
</script>

<style scoped>
  form {
    margin: 200px 0 200px 0;
  }
  #signUp-title {
    padding-left: 15px;
    margin-bottom: 25px;
  }
</style>
