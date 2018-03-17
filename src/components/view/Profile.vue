<template>
  <div class="container-fluid p-0">
    <div class="row m-0">
      <sidebar v-bind:property="nickname"/>
      <router-view v-bind:property="nickname" v-on:updateNickname="updateNickname" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '../structure/Sidebar'
import Settings from '../contents/Settings'
export default {
  name: 'dashboard',
  data () {
    return {
      nickname: localStorage.getItem('nickname')
    }
  },
  methods: {
    updateNickname (nickname) {
      this.nickname = nickname
    }
  },
  computed: {
    ...mapGetters([
      'getInfo'
    ])
  },
  components: {
    Sidebar,
    Settings
  }
}
</script>

<style scoped>

</style>
