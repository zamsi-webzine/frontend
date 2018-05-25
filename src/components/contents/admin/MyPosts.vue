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
    <div class="">
      <div class="card" v-for="index in getUserPostList" :key="index.id">
        <div class="card-body">
          <h5 class="card-title"><strong>{{index.title}}</strong></h5>
          <p>{{index.date_created}}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'my-posts',
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$store.dispatch('getUserPostList')
    }
  },
  computed: {
    ...mapGetters([
      'getUserPostList'
    ])
  }
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
