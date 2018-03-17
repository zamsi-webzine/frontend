<template>
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
        <router-link tag="a" type="button" class="btn btn-link" id="btn-forgot" :to="{name: 'Forgot'}">Forgot Password?</router-link>
      </div>
    </div>
    <!--에러 메시지 그룹 (hidden)-->
    <div class="form-group row">
      <checkout-message/>
    </div>
  </form>
</template>

<script>
import CheckoutMessage from '../contents/CheckoutMessage'
export default {
  components: {CheckoutMessage},
  name: 'signIn',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signIn', {email: formData.email, password: formData.password})
    }
  }
}

</script>

<style scoped>
  #signin-title {
    padding-left: 15px;
    margin-bottom: 25px;
  }
  #btn-forgot {
    padding-left: 0;
  }
</style>
