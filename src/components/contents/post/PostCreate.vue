<template>
  <div class="mt-5 mb-5">
    <form @submit.prevent="getContents">
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
      <div class="form-group">
        <input v-model="title" type="text" class="form-control" id="titleInput" aria-describedby="titleHelp"
               placeholder="Title" name="title" required>
      </div>
      <input name="post" type="hidden">
      <div ref="editor">
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
      options: {
        modules: {
          toolbar: [
            [{header: [1, 2, false]}],
            ['bold', 'italic', 'underline'],
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

      let formData = new FormData()

      formData.append('title', result[0]['value'])
      formData.append('post', result[1]['value'])

      this.$store.dispatch('uploadPost', formData)
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
</style>
