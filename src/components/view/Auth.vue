<template>
  <div class="container">
    <form>
      <div class="form-group row justify-content-md-center">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-6">
          <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
        </div>
      </div>
      <div class="form-group row justify-content-md-center">
        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-6">
          <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
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
}

</script>

<style scoped>
form {
  margin: 200px 0 200px 0;
}
</style>
