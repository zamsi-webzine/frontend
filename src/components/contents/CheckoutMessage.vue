<template>
  <div class="col-sm-12">
    <!--에러 메시지가 발견되면 창을 띄우고 아니면 가린다-->
    <div v-if="checkoutMessage === null" class="alert alert-danger alert-dismissible fade show d-none" role="alert"/>
    <div v-else class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>{{checkoutMessage}}</strong>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'checkout-message',
  computed: {
    // Store에 에러 메시지가 관측되는 순간 그 값을 리턴한다
    ...mapGetters([
      'checkoutMessage'
    ])
  }
}
</script>

<style scoped>

</style>
