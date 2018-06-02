<template>
  <div class="mt-5 mb-5">
    <form @submit.prevent="getContents">
      <div class="title">
        <h2>Update Story</h2>
        <div class="d-flex justify-content-between">
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
              <p class="mb-0 text-muted">상태: 수정 <small class="text-info">(발행은 저장이 끝난 뒤에 가능합니다)</small></p>
            </div>
          </div>
          <div class="d-flex">
            <button type="submit" class="btn btn-primary ml-2"><strong>저장</strong></button>
          </div>
        </div>
      </div>
      <hr>
      <div class="form-group">
        <input v-model="title" type="text" class="form-control" id="titleInput" aria-describedby="titleHelp"
               :placeholder="'기존 제목: ' + getAuthorPostRetrieve.title" name="title" required>
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
  name: 'PostUpdate',
  components: {
    CheeckoutMessage
  },
  data () {
    return {
      title: '',
      quill: '',
      options: {
        modules: {
          toolbar: [
            [{'size': ['small', false, 'large', 'huge']}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'align': []}],
            [{'color': []}, {'background': []}],
            ['image', 'video', 'link']
          ]
        },
        theme: 'snow'
      }
    }
  },
  mounted () {
    this.setQuill()
  },
  methods: {
    setQuill () {
      this.$store.dispatch('getAuthorPostRetrieve', this.$route.params.pk)
      setTimeout(() => {
        this.quill = new Quill(this.$refs.editor, this.options)
        const delta = JSON.parse(this.getAuthorQuillObject)

        this.quill.setContents(delta)
      }, 100)
    },
    getContents () {
      let form = document.querySelector('form')
      let post = document.querySelector('input[name=post]')

      post.value = JSON.stringify(this.quill.getContents())

      const result = $(form).serializeArray()

      let formData = new FormData()

      formData.append('title', result[0]['value'])
      formData.append('post', result[1]['value'])

      const payload = {
        pk: this.$route.params.pk,
        formData: formData
      }

      this.$store.dispatch('updatePost', payload)
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
  /*에디터 높이 조정 및 폰트*/
  #editor {
    height: 500px;
    font-family: 'Noto Serif', serif;
    font-weight: 400;
  }
</style>
