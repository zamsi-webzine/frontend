<template>
  <div class="container-fluid">
    <div class="row m-5">
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
    makeCSS () {
      // 첫 번째 요소 추출
      const firstEl = document.getElementById('0')
      // 그리드로 쓸 col 요소 생성
      const newCol = '<div id="other-query" class="col-md-6 col-sm"></div>'

      // 첫 번째 요소에 col 클래스 추가
      firstEl.classList.add('col-md-6')
      firstEl.classList.add('col-sm')
      // 첫 번째 요소 다음에 newCol 요소 추가
      firstEl.insertAdjacentHTML('afterend', newCol)

      // 추가된 newCol 요소를 DOM에서 다시 불러들임
      const otherQuery = document.getElementById('other-query')
      // 클래스 이름이 card인 모든 요소 추출
      const otherEls = document.getElementsByClassName('card')

      // 첫 번째 요소를 제외한 나머지 모든 카드를 순회하면서
      // 모든 카드 요소가 newCol 요소의 자식으로 들어가도록 함
      for (let step = 1; step < otherEls.length; step++) {
        otherQuery.appendChild(document.getElementById(String(step)))
      }
    },
    fetchData () {
      this.$store.dispatch('getClientPostList')
      setTimeout(() => {
        this.makeCSS()
      }, 1000)
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
  /*썸네일 정사각형으로 만들기*/
  .thumbnail {
    object-fit: cover;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }
  .hovering:hover {
    text-decoration: none;
  }
  .card-title {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
  }
</style>
