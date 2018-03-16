<template>
  <section class="container">
    <div class="row align-items-end">
      <div class="col-sm"/>
      <div class="col-sm-6">
        <router-view/>
      </div>
      <div class="col-sm"/>
    </div>
  </section>
</template>

<script>
import signIn from './SignIn'
import signUp from './SignUp'
import forgot from './Forgot'
import Activation from './Activation'
export default {
  name: 'auth',
  data: function () {
    return {
      selectedComponent: 'signIn'
    }
  },
  components: {
    signIn: signIn,
    signUp: signUp,
    forgot: forgot,
    Activation: Activation
  }
}
</script>

<style scoped>
  form {
    margin: 200px 0 200px 0;
  }
</style>
