<template>
  <div class="container">
      <p>Hello, {{userInfo.nickname}} ({{userInfo.email}})</p>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  props: ['pk'],
  computed: {
    userInfo () {
      return {
        email: this.$store.state.email,
        nickname: this.$store.state.nickname
      }
    }
  }
}
</script>

<style scoped>

</style>
