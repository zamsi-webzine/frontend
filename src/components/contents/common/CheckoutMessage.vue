<template>
  <div class="col-sm-12">
    <!--에러 메시지가 발견되면 창을 띄우고 아니면 가린다-->
    <div v-show="checkoutMsg !== null"
         class="alert alert-danger alert-dismissible fade show"
         role="alert">
      <strong>{{ checkoutMsg }}</strong>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'checkout-message',
  computed: {
    ...mapGetters([
      'checkoutMsg',
    ]),
  },
};
</script>

<style scoped>

</style>
