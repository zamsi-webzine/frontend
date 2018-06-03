<template>
  <div class="container mt-5 mb-5">
    <div class="card mb-3"
         v-for="index in getAuthorPostList.results"
         :key="index.id">
      <div class="card-body">
        <h3 class="card-title">{{index.title}}</h3>
        <p class="card-text">
          <span>{{index.author.nickname}}</span>
          <span>|</span>
          <span>{{callCategory(index.category)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'ClientPostQuery',
  created () {
    this.fetchData()
  },
  methods: {
    callCategory (payload) {
      const categoryObject = {
        'R': 'Re-View',
        'E': 'Enter-View',
        'O': 'Over-View'
      }
      return categoryObject[payload]
    },
    fetchData () {
      this.$store.dispatch('getClientPostList')
    }
  },
  computed: {
    ...mapGetters([
      'getAuthorPostList'
    ])
  }
}
</script>

<style scoped>
  /*썸네일 정사각형으로 만들기*/
  .thumbnail {
    object-fit: cover;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }
</style>
