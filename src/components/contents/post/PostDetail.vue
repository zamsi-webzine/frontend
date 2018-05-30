<template>
  <div class="mt-5 mb-5">
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
      'getAuthorQuillObject'
    ])
  }
}
</script>

<style scoped>

</style>
