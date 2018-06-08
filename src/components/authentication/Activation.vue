<template>
  <div class="alert alert-success text-center" role="alert">
    <H3>Almost there!</H3>
    <strong>{{checkoutMsg}}</strong>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Activation',
  computed: {
    ...mapGetters([
      'checkoutMsg',
    ]),
  },
};
</script>

<style scoped>
</style>
