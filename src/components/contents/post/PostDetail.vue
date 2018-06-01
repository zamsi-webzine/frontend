<template>
  <div class="mt-5 mb-5">
    <h2 class="mb-4"><strong>{{getAuthorPostRetrieve.title}}</strong></h2>
    <div class="d-flex justify-content-between mb-5">
      <div class="d-flex">
        <div class="">
          <img v-if="getAuthorThumbnail !== 'null'"
               class="thumbnail"
               :src="getAuthorThumbnail" alt="user-thumbnail">
          <img v-else
               class="img-fluid"
               width="100rem"
               src="../../../assets/icons/user-circle.svg" alt="default-user-thumbnail">
        </div>
        <div class="ml-3">
          <p class="mb-0">{{getAuthorPostRetrieve.author.nickname}}</p>
          <p class="mb-0 text-muted">{{getPostCreatedTime}}</p>
        </div>
      </div>
      <div class="d-flex">
        <button type="submit" class="btn btn-primary ml-2"><strong>저장</strong></button>
      </div>
    </div>
    <div v-show="false" ref="editor"></div>
    <div id="content"></div>
  </div>
</template>

<script>
import Quill from 'quill/dist/quill.min'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.core.css'
import {mapGetters} from 'vuex'
export default {
  name: 'PostDetail',
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
    this.$store.commit('clearAuthorPostDetail')
  },
  methods: {
    setQuill () {
      this.$store.dispatch('getAuthorPostRetrieve', this.$route.params.pk)
      setTimeout(() => {
        this.quill = new Quill(this.$refs.editor)
        const delta = JSON.parse(this.getAuthorQuillObject)

        this.quill.setContents(delta)
        let content = window.document.getElementById('content')
        content.innerHTML = this.quill.root.innerHTML
      }, 100)
    }
  },
  computed: {
    ...mapGetters([
      'getAuthorPostRetrieve',
      'getAuthorQuillObject',
      'getAuthorThumbnail',
      'getPostCreatedTime'
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
