<template>
  <div class="container mt-5 mb-5">
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
          <p class="mb-0">
            <span>{{callCategory}}</span>
            <span class="text-muted"> ❖ <em>{{getPostCreatedTime}}</em></span>
          </p>
        </div>
      </div>
    </div>
    <img v-if="getPostRetrieve.thumbnail"
         :src="getPostRetrieve.thumbnail"
         class="img-fluid d-block mx-auto"/>
    <div v-if="loading" id="loading" class="d-flex justify-content-center align-items-center">
      <div class="loader mx-auto"></div>
    </div>
    <div v-show="false" ref="editor"></div>
    <transition name="fade">
      <div v-show="post" id="content" class="ql-editor mt-5 mx-auto"></div>
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
  name: 'ClientPostDetail',
  data() {
    return {
      loading: true,
      post: false,
      quill: '',
    };
  },
  created() {
    this.$store.dispatch('getClientPostRetrieve', this.$route.params.pk);
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
        // Quill 객체에 서버에서 호출한 Delta 객체를 삽입, HTML 형태로 렌더링
        this.quill = new Quill(this.$refs.editor);
        const delta = JSON.parse(this.getQuillObject);
        this.quill.setContents(delta);

        // quill 객체의 HTML 값을 새로운 div에 삽입
        document.getElementById('content').innerHTML = this.quill.root.innerHTML;

        // 이미지를 반응형으로 만들기 위한 클래스 삽입
        const images = document.getElementById('content').querySelectorAll('img');

        if (images) {
          images.forEach((value) => {
            value.classList.add('img-fluid');
          });
        }

        this.loading = false;
        this.post = true;
      }, 1000);
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
