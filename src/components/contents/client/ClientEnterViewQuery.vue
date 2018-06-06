<template>
  <div class="mt-5 mb-5">
    <router-link :id="index"
                 :to="{name: 'ClientPost', params: {pk: value.pk}}"
                 class="card mb-3 hovering text-dark"
                 v-for="(value, index) in getPostList.results"
                 :key="index.id">
      <img v-if="value.thumbnail" :src="value.thumbnail" class="card-img-top pt-3" alt="post-thumbnail">
      <div class="card-body">
        <h3 class="card-title">{{value.title}}</h3>
        <p class="card-text">
          <span>{{value.author.nickname}}</span>
          <br>
          <span>{{callCategory(value.category)}}</span>
          <span class="text-muted"> ❖ <em>{{dateCreated(value.date_created)}}</em></span>
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'ClientEnterViewQuery',
  created () {
    this.fetchData()
  },
  methods: {
    // 리스트로 들어오는 파이썬 생성 일자를 자바스크립트 생성 일자로 변환
    dateCreated (payload) {
      const date = new Date(payload)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    callCategory (payload) {
      const categoryObject = {
        'R': 'Re-View',
        'E': 'Enter-View',
        'O': 'Over-View'
      }
      return categoryObject[payload]
    },
    fetchData () {
      this.$store.dispatch('getClientPostEnterViewList')
    }
  },
  computed: {
    ...mapGetters([
      'getPostList'
    ])
  }
}
</script>

<style scoped>
  .hovering:hover {
    text-decoration: none;
  }
  .card-title {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
  }
</style>
