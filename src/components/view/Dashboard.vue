<template>
  <div class="container-fluid p-0">
    <div class="row m-0">
      <sidebar/>
      <my-posts/>
    </div>
  </div>
</template>

<script>
import Sidebar from '../contents/Sidebar'
import MyPosts from '../contents/MyPosts'
import * as types from '@/store/types'
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  props: ['nickname'],
  computed: {
    ...mapGetters([
      types.GET_INFO
    ])
  },
  components: {
    Sidebar,
    MyPosts
  }
}
</script>

<style>
  header {
    margin: 0 !important;
  }
  footer {
    margin: 0 !important;
  }
</style>
