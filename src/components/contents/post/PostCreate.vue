<template>
  <div class="mt-5 mb-5">
    <form enctype="multipart/form-data" @submit.prevent="getContents">
      <div class="title">
        <h2>New Story</h2>
        <div class="d-flex justify-content-between">
          <div class="d-flex">
            <div class="">
              <img v-if="getInfo.thumbnail !== 'null'"
                   class="thumbnail"
                   :src="getInfo.thumbnail" alt="user-thumbnail">
              <img v-else
                   class="img-fluid"
                   width="100rem"
                   src="../../../assets/icons/user-circle.svg" alt="default-user-thumbnail">
            </div>
            <div class="ml-3">
              <p class="mb-0">{{getInfo.nickname}}</p>
              <p class="mb-0 text-muted">상태: 초고 <small class="text-info">(발행은 초고 저장이 끝난 뒤에 가능합니다)</small></p>
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
            <input v-model="category" class="form-check-input" type="radio" name="categoryRadios" id="categoryRadios1" value="R" checked>
            <label class="form-check-label" for="categoryRadios1">
              Re-View
            </label>
          </div>
          <div class="form-check">
            <input v-model="category" class="form-check-input" type="radio" name="categoryRadios" id="categoryRadios2" value="E">
            <label class="form-check-label" for="categoryRadios2">
              Enter-View
            </label>
          </div>
          <div class="form-check">
            <input v-model="category" class="form-check-input" type="radio" name="categoryRadios" id="categoryRadios3" value="O">
            <label class="form-check-label" for="categoryRadios3">
              Over-View
            </label>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <h5><strong>Post Thumbnail</strong></h5>
            <input type="file" class="form-control-file" ref="file" accept="image/*" id="thumbnailUpload" @change="handleFileUpload()">
          </div>
          <img :src="imagePreview" v-show="showPreview" class="img-fluid"/>
        </div>
      </div>
      <div class="form-group">
        <input v-model="title" type="text" class="form-control" id="titleInput" aria-describedby="titleHelp"
               placeholder="Title" name="title" required>
      </div>
      <input name="post" type="hidden">
      <div id="editor" ref="editor">
      </div>
    </form>
    <cheeckout-message/>
  </div>
</template>

<script>
import Quill from 'quill/dist/quill.min'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.core.css'
import $ from 'jquery/dist/jquery.min'
import {mapGetters} from 'vuex'
import CheeckoutMessage from '../../contents/common/CheckoutMessage'
export default {
  name: 'PostCreate',
  components: {
    CheeckoutMessage
  },
  data () {
    return {
      title: '',
      quill: '',
      category: 'R',
      file: null,
      imagePreview: '',
      showPreview: false,
      options: {
        modules: {
          toolbar: [
            [{'size': ['small', false, 'large', 'huge']}],
            ['bold', 'italic', 'underline', 'strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'align': []}],
            [{'color': []}, {'background': []}],
            ['image', 'video', 'link']
          ]
        },
        placeholder: 'Tell your story...',
        theme: 'snow'
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.quill = new Quill(this.$refs.editor, this.options)
    },
    getContents () {
      let form = document.querySelector('form')
      let post = document.querySelector('input[name=post]')

      post.value = JSON.stringify(this.quill.getContents())

      const result = $(form).serializeArray()
      console.log(result)
      let formData = new FormData()

      formData.append('category', result[0]['value'])
      formData.append('title', result[1]['value'])
      formData.append('post', result[2]['value'])
      formData.append('thumbnail', this.file)

      this.$store.dispatch('uploadPost', formData)
    },
    handleFileUpload () {
      /*
       Set the local file variable to what the user has selected.
       */
      this.file = this.$refs.file.files[0]
      /*
       Initialize a File Reader object
       */
      let reader = new FileReader()

      /*
       Add an event listener to the reader that when the file
       has been loaded, we flag the show preview as true and set the
       image to be what was read from the reader.
       */
      reader.addEventListener('load', function () {
        this.showPreview = true
        this.imagePreview = reader.result
      }.bind(this), false)

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
          reader.readAsDataURL(this.file)
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getInfo'
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
  /*에디터 높이 조정 및 폰트*/
  #editor {
    height: 500px;
    font-family: 'Noto Serif', serif;
    font-weight: 400;
  }
</style>
