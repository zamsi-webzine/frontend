<template>
  <section class="container" id="login">
    <div class="row align-items-end">
      <div class="col-sm"/>
      <div class="col-sm-6">
        <!--로그인 폼 필드-->
        <form @submit.prevent="onSubmit" method="post">
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
                     v-model="email">
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
                <button type="button" class="btn btn-link" id="btn-forgot">Forgot Password?</button>
              </div>
          </div>
          <!--에러 메시지 그룹 (hidden)-->
          <div class="form-group row">
            <div class="col-sm-12">
              <!--에러 메시지가 발견되면 창을 띄우고 아니면 가린다-->
              <div v-if="this.$store.state.msg !== ''" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{{displayMessage}}</strong>
              </div>
              <div v-else class="alert alert-danger alert-dismissible fade show d-none" role="alert">
                <strong>{{displayMessage}}</strong>
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
export default {
  name: 'SignIn',
  data: function () {
    return {
      // 사용자가 입력한 이메일과 패스워드 값
      email: '',
      password: ''
    }
  },
  methods: {
    // 사용자가 'signin' 요청을 했을 경우의 메소드
    onSubmit () {
      // 사용자가 입력한 값을 formData 상수 값에 넣는다
      const formData = {
        email: this.email,
        password: this.password
      }
      // Store에 있는 obtainToken을 호출하면서 이메일, 패스워드를 전송한다
      this.$store.dispatch('obtainInfo', {
        email: formData.email,
        password: formData.password
      })
    }
  },
  computed: {
    // 게으른 연산: displayMessage
    // Store에 에러 메시지가 관측되는 순간 그 값을 리턴한다
    displayMessage () {
      return this.$store.state.msg
    }
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
