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
    <div class="clearfix">
      <p class="float-right">포스트 총 <span class="text-primary">{{getAuthorPostList.count}}</span> 개</p>
    </div>
    <div class="card mb-3" v-for="index in getAuthorPostList.results" :key="index.id">
        <router-link :to="{name: 'AuthorPostDetail', params: {pk: index.pk}}" class="text-dark hovering">
        <div class="card-body">
          <h5 class="card-title"><strong>{{index.title}}</strong></h5>
          <p>{{dateCreated(index.date_created)}}</p>
          <div class="">
            <span v-if="index.is_published === true" class="badge badge-pill badge-primary">발행 중</span>
            <span v-if="index.is_published === false" class="badge badge-pill badge-secondary">미발행</span>
          </div>
        </div>
        </router-link>
      </div>
    <div class="mt-5 mb-5">
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" v-for="num in pageListCount" :key="num.id">
            <button @click="callPaginatedList(num)" class="page-link">{{num}}</button>
          </li>
        </ul>
      </nav>
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
    // 리스트로 들어오는 파이썬 생성 일자를 자바스크립트 생성 일자로 변환
    dateCreated (payload) {
      const date = new Date(payload)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    callPaginatedList (payload) {
      const pageNum = '?page=' + String(payload)
      this.$store.dispatch('getAuthorPostList', pageNum)
    },
    fetchData () {
      this.$store.dispatch('getAuthorPostList', '?page=1')
    }
  },
  computed: {
    ...mapGetters([
      'getAuthorPostList'
    ]),
    pageListCount () {
      let total
      let resultArray = []

      if (Number.isInteger(parseInt(this.getAuthorPostList.count) / 6)) {
        total = parseInt(this.getAuthorPostList.count) / 6
      } else {
        total = parseInt(this.getAuthorPostList.count / 6) + 1
      }

      for (let key = 1; key < total + 1; key++) {
        resultArray.push(key)
      }
      return resultArray
    }
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
  .card:hover {
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    transition: box-shadow .4s;
  }
  .hovering:hover {
    text-decoration: none;
  }
  .card-title {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
  }
</style>
