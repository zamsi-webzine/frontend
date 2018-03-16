<template>
    <div class="row">
      <sidebar/>
      <main class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"></main>
    </div>
</template>

<script>
import Sidebar from '../contents/Sidebar'
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
    Sidebar
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
