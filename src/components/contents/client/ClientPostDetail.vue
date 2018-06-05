<template>
  <div class="container mt-5 mb-5">
    <h2 id="post-title" class="mb-4"><strong>{{getPostRetrieve.title}}</strong></h2>
    <div class="d-flex justify-content-between mb-5">
      <div class="d-flex">
        <div class="">
          <img v-if="getThumbnail !== 'null'"
               class="thumbnail"
               :src="getThumbnail" alt="user-thumbnail">
          <img v-else
               class="img-fluid"
               width="100rem"
               src="../../../assets/icons/user-circle.svg" alt="default-user-thumbnail">
        </div>
        <div class="ml-3">
          <p class="mb-0">{{getPostRetrieve.author.nickname}}</p>
          <p class="mb-0 text-muted">
            <span>{{getPostCreatedTime}}</span>
            <span>|</span>
            <span>{{callCategory}}</span>
          </p>
        </div>
      </div>
    </div>
    <div ref="editor" id="content" class="mx-auto"></div>
  </div>
</template>

<script>
import Quill from 'quill/dist/quill.min'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.core.css'
import {mapGetters} from 'vuex'
export default {
  name: 'ClientPostDetail',
  data () {
    return {
      quill: ''
    }
  },
  mounted () {
    this.setQuill()
  },
  beforeDestroy () {
    this.quill = null
    this.$store.commit('clearPostDetail')
  },
  methods: {
    setQuill () {
      this.$store.dispatch('getClientPostRetrieve', this.$route.params.pk)
      setTimeout(() => {
        // Quill 객체에 서버에서 호출한 Delta 객체를 삽입, HTML 형태로 렌더링
        this.quill = new Quill(this.$refs.editor)
        const delta = JSON.parse(this.getQuillObject)
        this.quill.setContents(delta)

        // 이미지를 반응형으로 만들기 위한 클래스 삽입
        let images = document.getElementById('content').querySelector('img')
        images.classList.add('img-fluid')
      }, 1000)
    }
  },
  computed: {
    ...mapGetters([
      'getPostRetrieve',
      'getQuillObject',
      'getThumbnail',
      'getPostCreatedTime',
      'callCategory'
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
  #post-title {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
  }
  #content {
    max-width: 700px;
    font-family: 'Noto Serif', serif;
    font-weight: 400;
  }
</style>
