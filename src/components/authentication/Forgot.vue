<template>
  <form @submit.prevent="RESET_PW" method="post">
    <!--제목-->
    <div class="form-group row">
      <h2 id="forgot-title">Reset Password</h2>
    </div>
    <!--아이디 입력 그룹-->
    <div class="form-group row">
      <label for="inputEmail3" class="col-sm-4 col-form-label">Email</label>
      <div class="col-sm-8">
        <input type="email"
               class="form-control"
               id="inputEmail3"
               placeholder="Email"
               v-model="email">
      </div>
    </div>
    <!--submit 그룹-->
    <div class="form-group row">
      <div class="col-sm-4 col-12">
        <button type="submit" class="btn btn-primary">Reset Password</button>
      </div>
    </div>
    <!--에러 메시지 그룹 (hidden)-->
    <div class="form-group row">
      <checkout-message/>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@/store/types'
import CheckoutMessage from '../contents/CheckoutMessage'
export default {
  components: {CheckoutMessage},
  name: 'Forgot',
  data: function () {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions([
      types.RESET_PW
    ])
  }
}
</script>

<style scoped>
  #forgot-title {
    padding-left: 15px;
    margin-bottom: 25px;
  }
</style>
