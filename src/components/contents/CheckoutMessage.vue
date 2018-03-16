<template>
  <div class="col-sm-12">
    <!--에러 메시지가 발견되면 창을 띄우고 아니면 가린다-->
    <div v-if="check === null" class="alert alert-danger alert-dismissible fade show d-none" role="alert">
      <strong>{{ check }}</strong>
    </div>
    <div v-else class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>{{ check }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checkout-message',
  computed: {
    check () {
      return this.$store.getters.checkoutMsg
    }
  }
}
</script>

<style scoped>

</style>
