<template>
  <div class="col-sm-12">
    <!--에러 메시지가 발견되면 창을 띄우고 아니면 가린다-->
    <div v-if="CHECKOUT_MSG === null" class="alert alert-danger alert-dismissible fade show d-none" role="alert">
      <strong>{{CHECKOUT_MSG}}</strong>
    </div>
    <div v-else class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>{{CHECKOUT_MSG}}</strong>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/types'
export default {
  name: 'checkout-message',
  computed: {
    // Store에 에러 메시지가 관측되는 순간 그 값을 리턴한다
    ...mapGetters([
      types.CHECKOUT_MSG
    ])
  }
}
</script>

<style scoped>

</style>
