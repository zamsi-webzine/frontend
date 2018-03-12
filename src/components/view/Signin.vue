<template>
  <div class="container">
    <div class="row align-items-end">
      <div class="col-sm"/>
      <div class="col-sm-6">
        <form @submit.prevent="onSubmit" method="post">
          <div class="form-group row">
            <h2 id="login-title">Login</h2>
          </div>
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
          <div class="form-group row">
              <div class="col-sm-4 col-12">
                <button type="submit" class="btn btn-primary">Sign in</button>
              </div>
              <div class="col-sm-4 col-6">
                <button type="button" class="btn btn-link" id="btn-forgot">Forgot Password?</button>
              </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-12">
              <div v-if="this.$store.state.msg !== ''" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{{displayError}}</strong>
              </div>
              <div v-else class="alert alert-danger alert-dismissible fade show d-none" role="alert">
                <strong>{{displayError}}</strong>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="col-sm"/>
    </div>
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
      this.$store.dispatch('obtainToken', {
        email: formData.email,
        password: formData.password
      })
    }
  },
  computed: {
    displayError () {
      return this.$store.state.msg
    }
  }
}

</script>

<style scoped>
  form {
    margin: 200px 0 200px 0;
  }
  #login-title {
    padding-left: 15px;
    margin-bottom: 25px;
  }
  #btn-forgot {
    padding-left: 0;
  }
</style>
