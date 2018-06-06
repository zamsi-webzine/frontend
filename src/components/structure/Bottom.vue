<template>
  <footer class="jumbotron jumbotron-fluid bg-dark align-items-center mb-0">
    <div class="row">
      <div class="col-6 offset-3">
        <p class="text-center text-muted mb-0">
          <span><em>© 2018. Zamsee all rights reserved.</em></span>
        </p>
      </div>
      <div class="col-3 text-center">
        <router-link tag="button" class="btn btn-sm btn-outline-secondary"
                     :to="{name: 'SignIn'}">Editor SignIn</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
