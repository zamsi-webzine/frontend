<template>
  <div class="mt-5 mb-5">
    <h2 id="post-title" class="mb-4"><strong>{{getPostRetrieve.title}}</strong></h2>
    <div class="d-flex justify-content-between mb-5">
      <div class="d-flex">
        <div class="">
          <img v-if="getThumbnail !== null"
               class="thumbnail"
               :src="getThumbnail" alt="user-thumbnail">
          <img v-else
               class="img-fluid thumbnail"
               width="100rem"
               src="../../../assets/icons/user-circle.svg" alt="default-user-thumbnail">
        </div>
        <div class="ml-3">
          <p class="mb-0">{{getPostRetrieve.author.nickname}}</p>
          <p class="mb-0 text-muted">
            <span>{{getPostCreatedTime}}</span>
            <span>|</span>
            <span>{{callCategory}}</span>
            <span v-if="getPostRetrieve.is_published === true"
                  class="ml-2 badge badge-pill badge-primary">발행 중</span>
            <span v-if="getPostRetrieve.is_published === false"
                  class="ml-2 badge badge-pill badge-secondary">미발행</span>
          </p>
        </div>
      </div>
      <div class="d-flex">
        <button type="button" class="btn btn-primary ml-2"
                data-toggle="modal" data-target="#publishModal">
          <strong v-if="getPostRetrieve.is_published === true">발행 취소</strong>
          <strong v-if="getPostRetrieve.is_published === false">발행하기</strong>
        </button>
        <!-- Modal -->
        <div class="modal fade" id="publishModal"
             tabindex="-1" role="dialog" aria-labelledby="publishModalLabel" aria-hidden="true">
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
                  <span v-if="getPostRetrieve.is_published === true"
                        class="text-primary"><strong>발행 중</strong></span>
                  <span v-if="getPostRetrieve.is_published === false"
                        class="text-secondary"><strong>미발행</strong></span>
                  입니다.
                  <span v-if="getPostRetrieve.is_published === true"
                        class="text-danger"><strong>발행 취소</strong></span>
                  <span v-if="getPostRetrieve.is_published === false"
                        class="text-primary"><strong>발행</strong></span>
                  하시겠습니까?
                </p>
              </div>
              <div class="modal-footer">
                <button type="button"
                        class="btn btn-outline-secondary" data-dismiss="modal">취소</button>
                <button type="button"
                        @click="publishPost(getPostRetrieve.is_published)"
                        class="btn btn-primary" data-dismiss="modal">변경</button>
              </div>
            </div>
          </div>
        </div>

        <router-link :to="{name: 'UpdatePost', params: {pk: params}}"
                     tag="button" class="btn btn-info ml-2"><strong>수정</strong></router-link>

        <button type="button" class="btn btn-outline-danger ml-2"
                data-toggle="modal" data-target="#destroyModal"><strong>삭제</strong></button>
        <!-- Modal -->
        <div class="modal fade" id="destroyModal"
             tabindex="-1" role="dialog" aria-labelledby="destroyModalLabel" aria-hidden="true">
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
                <button type="button" class="btn btn-outline-secondary"
                        data-dismiss="modal">취소</button>
                <button type="button" @click="destroyPost" class="btn btn-danger"
                        data-dismiss="modal">삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img v-if="getPostRetrieve.thumbnail"
         :src="getPostRetrieve.thumbnail" class="img-fluid d-block mx-auto"/>
    <div v-if="loading" id="loading" class="d-flex justify-content-center align-items-center">
      <div class="loader mx-auto"></div>
    </div>
    <div v-show="false" ref="editor"></div>
    <transition name="fade">
      <div v-show="post" id="content" class="mt-5 mx-auto"></div>
    </transition>
  </div>
</template>

<script>
import Quill from 'quill/dist/quill.min';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';
import { mapGetters } from 'vuex';

export default {
  name: 'PostDetail',
  data() {
    return {
      loading: true,
      post: false,
      quill: '',
      params: this.$route.params.pk,
    };
  },
  created() {
    this.$store.dispatch('getAuthorPostRetrieve', this.$route.params.pk);
  },
  mounted() {
    this.setQuill();
  },
  beforeDestroy() {
    this.quill = null;
    this.$store.commit('clearPostDetail');
  },
  methods: {
    setQuill() {
      this.loading = true;
      this.post = false;

      setTimeout(() => {
        this.quill = new Quill(this.$refs.editor);
        const delta = JSON.parse(this.getQuillObject);
        this.quill.setContents(delta);

        // quill 객체의 HTML 값을 새로운 div에 삽입
        document.getElementById('content').innerHTML = this.quill.root.innerHTML;

        // 이미지를 반응형으로 만들기 위한 클래스 삽입
        const images = document.getElementById('content').querySelectorAll('img')
        console.log(images)
        if (images) {
          images.forEach((value) => {
            value.classList.add('img-fluid')
          })
        }

        this.loading = false;
        this.post = true;
      }, 1000);
    },
    publishPost(payload) {
      const formData = {
        pk: this.getPostRetrieve.pk,
        is_published: !payload,
      };
      this.$store.dispatch('authorPostPublish', formData);
    },
    destroyPost() {
      this.$store.dispatch('authorPostDestroy', this.getPostRetrieve.pk);
    },
  },
  computed: {
    ...mapGetters([
      'getPostRetrieve',
      'getQuillObject',
      'getThumbnail',
      'getPostCreatedTime',
      'callCategory',
    ]),
  },
};
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

  /*트랜지션 애니메이션*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.6s ease-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  /*로딩 애니메이션*/
  #loading {
    min-height: calc(100vh - 88px);
  }
  .loader {
    border: 6px solid #f3f3f3;
    border-radius: 50%;
    border-top: 6px solid #3498db;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
