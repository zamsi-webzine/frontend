<template>
  <div class="alert alert-success text-center" role="alert">
    <H3>Almost there!</H3>
    <strong>{{checkoutMessage}}</strong>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Activation',
  computed: {
    ...mapGetters([
      'checkoutMessage'
    ])
  }
}
</script>

<style scoped>
.col-sm-6 {
  margin: 200px 0 200px 0;
}
</style>
