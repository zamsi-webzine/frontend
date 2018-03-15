<template>
  <div class="container">
      <p>Hello, {{GET_INFO.nickname}} ({{GET_INFO.email}})</p>
  </div>
</template>

<script>
import * as types from '@/store/types'
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  props: ['nickname'],
  computed: {
    ...mapGetters([
      types.GET_INFO
    ])
  }
}
</script>

<style scoped>

</style>
