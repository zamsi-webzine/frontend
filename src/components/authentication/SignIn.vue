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
            <div class="col-sm-12">
              <!--에러 메시지가 발견되면 창을 띄우고 아니면 가린다-->
              <div v-if="CHECKOUT_MSG === null" class="alert alert-danger alert-dismissible fade show d-none" role="alert">
                <strong>{{CHECKOUT_MSG}}</strong>
              </div>
              <div v-else class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{{CHECKOUT_MSG}}</strong>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="col-sm"/>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as types from '@/store/types'
export default {
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
  },
  computed: {
    // Store에 에러 메시지가 관측되는 순간 그 값을 리턴한다
    ...mapGetters([
      types.CHECKOUT_MSG
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
