<template>
  <div class="container">
    <div class="row align-items-end">
      <div class="col-sm"/>
      <div class="col-sm-6">
        <div class="alert alert-success text-center" role="alert">
          <H3>Almost there!</H3>
          <strong>{{CHECKOUT_MSG}}</strong>
        </div>
      </div>
      <div class="col-sm"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/types'
export default {
  name: 'Activation',
  computed: {
    ...mapGetters([
      types.CHECKOUT_MSG
    ])
  }
}
</script>

<style scoped>
.col-sm-6 {
  margin: 200px 0 200px 0;
}
</style>
