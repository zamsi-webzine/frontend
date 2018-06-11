<template>
  <div class="mt-5 mb-5">
    <form @submit.prevent="getContents">
      <div class="title">
        <h2>Update Story</h2>
        <div class="d-flex justify-content-between">
          <div class="d-flex">
            <div class="">
              <img v-if="getThumbnail !== 'null'"
                   class="thumbnail"
                   :src="getThumbnail" alt="user-thumbnail">
              <img v-else
                   class="img-fluid thumbnail"
                   width="100rem"
                   src="../../../assets/icons/user-circle.svg" alt="default-user-thumbnail">
            </div>
            <div class="ml-3">
              <p class="mb-0">{{getPostRetrieve.author.nickname}}</p>
              <p class="mb-0 text-muted">상태: 수정
                <small class="text-info">(발행은 저장이 끝난 뒤에 가능합니다)</small>
              </p>
            </div>
          </div>
          <div class="d-flex">
            <button type="submit" class="btn btn-primary ml-2"><strong>저장</strong></button>
          </div>
        </div>
      </div>
      <hr>
      <div class="row mb-4">
        <div class="col-6">
          <h5><strong>Category</strong></h5>
          <div class="form-check">
            <input v-model="category" class="form-check-input"
                   type="radio" name="categoryRadios" id="categoryRadios1" value="R" checked>
            <label class="form-check-label" for="categoryRadios1">
              Re-View
            </label>
          </div>
          <div class="form-check">
            <input v-model="category" class="form-check-input"
                   type="radio" name="categoryRadios" id="categoryRadios2" value="E">
            <label class="form-check-label" for="categoryRadios2">
              Enter-View
            </label>
          </div>
          <div class="form-check">
            <input v-model="category" class="form-check-input"
                   type="radio" name="categoryRadios" id="categoryRadios3" value="O">
            <label class="form-check-label" for="categoryRadios3">
              Over-View
            </label>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <h5><strong>Post Thumbnail</strong></h5>
            <input type="file" class="form-control-file"
                   ref="file" accept="image/*" id="thumbnailUpload" @change="handleFileUpload()">
          </div>
          <figure class="figure" v-if="getPostRetrieve.thumbnail">
            <figcaption class="figure-caption">기존 사진</figcaption>
            <img class="figure-img img-fluid" :src="getPostRetrieve.thumbnail" alt="">
          </figure>
          <figure class="figure" v-if="showPreview">
            <figcaption class="figure-caption">새로운 사진</figcaption>
            <img :src="imagePreview" class="img-fluid"/>
          </figure>
        </div>
      </div>
      <div class="form-group">
        <input v-model="title" type="text"
               class="form-control" id="titleInput" aria-describedby="titleHelp"
               :placeholder="'기존 제목: ' + getPostRetrieve.title" name="title" required>
      </div>
      <div v-if="loading" id="loading" class="d-flex justify-content-center align-items-center">
        <div class="loader mx-auto"></div>
      </div>
      <input name="post" type="hidden">
      <transition name="fade">
        <div v-show="post" id="editor" ref="editor"></div>
      </transition>
    </form>
    <cheeckout-message/>
  </div>
</template>

<script>
import Quill from 'quill/dist/quill.min';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';
import $ from 'jquery/dist/jquery.min';
import { mapGetters } from 'vuex';
import CheeckoutMessage from '../../contents/common/CheckoutMessage.vue';

export default {
  name: 'PostUpdate',
  components: {
    CheeckoutMessage,
  },
  data() {
    return {
      loading: true,
      post: false,
      title: '',
      quill: '',
      category: 'R',
      file: '',
      imagePreview: '',
      showPreview: false,
      options: {
        modules: {
          toolbar: [
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ['image', 'video', 'link'],
          ],
        },
        theme: 'snow',
      },
    };
  },
  created() {
    this.$store.dispatch('getAuthorPostRetrieve', this.$route.params.pk);
  },
  mounted() {
    this.setQuill();
  },
  methods: {
    setQuill() {
      this.loading = true;
      this.post = false;

      setTimeout(() => {
        this.quill = new Quill(this.$refs.editor, this.options);
        const delta = JSON.parse(this.getQuillObject);
        this.quill.setContents(delta);

        this.loading = false;
        this.post = true;
      }, 1000);
    },
    getContents() {
      const form = document.querySelector('form');
      const post = document.querySelector('input[name=post]');

      post.value = JSON.stringify(this.quill.getContents());

      const result = $(form).serializeArray();

      const formData = new FormData();

      formData.append('category', result[0].value);
      formData.append('title', result[1].value);
      formData.append('post', result[2].value);
      formData.append('thumbnail', this.file);

      const payload = {
        pk: this.$route.params.pk,
        formData,
      };

      this.$store.dispatch('updatePost', payload);
    },
    handleFileUpload() {
      /*
       Set the local file variable to what the user has selected.
       */
      this.file = this.$refs.file.files[0];
      /*
       Initialize a File Reader object
       */
      const reader = new FileReader();

      /*
       Add an event listener to the reader that when the file
       has been loaded, we flag the show preview as true and set the
       image to be what was read from the reader.
       */
      reader.addEventListener('load', () => {
        this.showPreview = true;
        this.imagePreview = reader.result;
      }, false);

      /*
       Check to see if the file is not empty.
       */
      if (this.file) {
        /*
         Ensure the file is an image file.
         */
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          /*
           Fire the readAsDataURL method which will read the file in and
           upon completion fire a 'load' event which we will listen to and
           display the image in the preview.
           */
          reader.readAsDataURL(this.file);
        }
      }
    },
  },
  computed: {
    ...mapGetters([
      'getPostRetrieve',
      'getQuillObject',
      'getThumbnail',
      'getPostCreatedTime',
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
  /*에디터 높이 조정 및 폰트*/
  #editor {
    height: 500px;
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
