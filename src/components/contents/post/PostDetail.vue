<template>
  <div class="mt-5 mb-5">
    <h2 id="post-title" class="mb-4"><strong>{{getAuthorPostRetrieve.title}}</strong></h2>
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
          <p class="mb-0 text-muted">
            <span>{{getPostCreatedTime}}</span>
            <span v-if="getAuthorPostRetrieve.is_published === true" class="ml-2 badge badge-pill badge-primary">발행 중</span>
            <span v-if="getAuthorPostRetrieve.is_published === false" class="ml-2 badge badge-pill badge-secondary">미발행</span>
          </p>
        </div>
      </div>
      <div class="d-flex">
        <button type="button" class="btn btn-primary ml-2" data-toggle="modal" data-target="#publishModal">
          <strong v-if="getAuthorPostRetrieve.is_published === true">발행 취소</strong>
          <strong v-if="getAuthorPostRetrieve.is_published === false">발행하기</strong>
        </button>
        <!-- Modal -->
        <div class="modal fade" id="publishModal" tabindex="-1" role="dialog" aria-labelledby="publishModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="publishModalLabel">포스트 발행</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>
                  현재 포스트의 상태는
                  <span v-if="getAuthorPostRetrieve.is_published === true" class="text-primary"><strong>발행 중</strong></span>
                  <span v-if="getAuthorPostRetrieve.is_published === false" class="text-secondary"><strong>미발행</strong></span>
                  입니다.
                  <span v-if="getAuthorPostRetrieve.is_published === true" class="text-danger"><strong>발행 취소</strong></span>
                  <span v-if="getAuthorPostRetrieve.is_published === false" class="text-primary"><strong>발행</strong></span>
                  하시겠습니까?
                </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">취소</button>
                <button type="button" @click="publishPost(getAuthorPostRetrieve.is_published)" class="btn btn-primary" data-dismiss="modal">변경</button>
              </div>
            </div>
          </div>
        </div>

        <router-link :to="{name: 'UpdatePost', params: {pk: getAuthorPostRetrieve.pk}}" tag="button" class="btn btn-outline-warning ml-2"><strong>수정</strong></router-link>

        <button type="button" class="btn btn-outline-danger ml-2" data-toggle="modal" data-target="#destroyModal"><strong>삭제</strong></button>
        <!-- Modal -->
        <div class="modal fade" id="destroyModal" tabindex="-1" role="dialog" aria-labelledby="destroyModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="destroyModalLabel">포스트 삭제</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                정말 삭제하시겠습니까?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">취소</button>
                <button type="button" @click="destroyPost" class="btn btn-danger" data-dismiss="modal">삭제</button>
              </div>
            </div>
          </div>
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
      }, 100)
    },
    publishPost (payload) {
      const formData = {
        pk: this.getAuthorPostRetrieve.pk,
        is_published: !payload
      }
      this.$store.dispatch('authorPostPublish', formData)
    },
    destroyPost () {
      this.$store.dispatch('authorPostDestroy', this.getAuthorPostRetrieve.pk)
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
