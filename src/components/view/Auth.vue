<template>
  <div class="container">
    <form @submit.prevent="onSubmit" method="post">
      <div class="row justify-content-md-center col-sm-6">
        <h2 id="login-title">Login</h2>
      </div>
      <div class="form-group row justify-content-md-center">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-6">
          <input type="email"
                 class="form-control"
                 id="inputEmail3"
                 placeholder="Email"
                 v-model="email">
        </div>
      </div>
      <div class="form-group row justify-content-md-center">
        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-6">
          <input type="password"
                 class="form-control"
                 id="inputPassword3"
                 placeholder="Password"
                 v-model="password">
        </div>
      </div>
      <div class="form-group row justify-content-md-center">
        <label class="col-sm-2 col-form-label"></label>
        <div class="col-sm-6">
          <button type="submit" class="btn btn-primary">Sign in</button>
          <button type="button" class="btn btn-link">Forgot Password?</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
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
      console.log(formData)
      this.$store.dispatch('obtainToken', {email: formData.email, password: formData.password})
    }
  }
}

</script>

<style scoped>
  form {
    margin: 200px 0 200px 0;
  }
  #login-title {
    margin-bottom: 25px;
  }
</style>
