<template>
  <main role="main" class="col-md-9 col-sm-12 ml-auto mr-auto">
    <div class="d-flex">
      <h1 class="mr-auto pt-3">My Posts</h1>
      <div class="pt-4">
        <router-link :to="{name: 'NewPost'}" tag="button" class="btn btn-outline-secondary p-2">
          Let's Post
        </router-link>
      </div>
    </div>
    <hr>
  </main>
</template>

<script>
export default {
  name: 'my-posts'
}
</script>

<style scoped>
  .btn-outline-secondary {
    color: #0081D5;
    border-color: #0081D5;
  }
  .btn-outline-secondary:hover {
    color: #fff;
    border-color: #fff;
    background-color: #A133D5;
  }
</style>
