<template>
  <footer class="jumbotron jumbotron-fluid bg-dark mb-0">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-sm">
          <p class="text-center text-muted">
            <span><em>© 2018. Zamsee all rights reserved.</em></span>
          </p>
        </div>
        <div class="col-md-3 col-sm text-center">
          <router-link tag="button" class="btn btn-sm btn-outline-secondary"
                       :to="{name: 'SignIn'}">Editor SignIn</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
