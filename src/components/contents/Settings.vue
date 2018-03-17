<template>
  <main role="main" class="col-md-9 col-sm-12 ml-auto mr-auto">
    <div class="d-flex">
      <h1 class="mr-auto pt-3">Settings</h1>
    </div>
    <hr>
    <div class="ml-sm-auto mr-sm-auto col-sm-6">
      <form @submit.prevent="onSubmit" method="post">
        <!--이메일은 수정 불가-->
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-4 col-form-label">Email</label>
          <div class="col-sm-8">
            <input type="text"
                   readonly class="form-control-plaintext"
                   id="staticEmail"
                   :value="getInfo.email">
          </div>
        </div>
        <!--닉네임 입력 그룹-->
        <div class="form-group row">
          <label for="inputNickname3" class="col-sm-4 col-form-label">Nickname</label>
          <div class="col-sm-8">
            <input type="text"
                   class="form-control"
                   id="inputNickname3"
                   :placeholder="'current: '+ property"
                   v-model="newNickname">
          </div>
        </div>
        <!--비밀번호1 입력 그룹-->
        <div class="form-group row">
          <label for="inputPassword1" class="col-sm-4 col-form-label">Password 1</label>
          <div class="col-sm-8">
            <input type="password"
                   class="form-control"
                   id="inputPassword1"
                   placeholder="New Password"
                   v-model="password1">
          </div>
        </div>
        <!--비밀번호2 입력 그룹-->
        <div class="form-group row">
          <label for="inputPassword2" class="col-sm-4 col-form-label">Password 2</label>
          <div class="col-sm-8">
            <input type="password"
                   class="form-control"
                   id="inputPassword2"
                   placeholder="Password Repeat"
                   v-model="password2">
          </div>
        </div>
        <!--submit 그룹-->
        <div class="form-group row">
          <div class="col-sm-4 col-12">
            <button type="submit" class="btn btn-outline-secondary">Confirm</button>
          </div>
        </div>
        <!--에러 메시지 그룹 (hidden)-->
        <div class="form-group row">
          <checkout-message/>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckoutMessage from '../contents/CheckoutMessage'
export default {
  components: {CheckoutMessage},
  name: 'profile',
  props: ['property'],
  data: function () {
    return {
      newNickname: '',
      password1: '',
      password2: ''
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        nickname: this.newNickname,
        password1: this.password1,
        password2: this.password2
      }
      this.$emit('updateNickname', this.newNickname)
      this.$store.dispatch('patchProfile', formData)
    }
  },
  computed: {
    ...mapGetters([
      'getInfo'
    ])
  }
}
</script>

<style scoped>
  main {
    border: 1px solid black;
  }
  form {
    margin: 200px 0 200px 0;
  }
  .btn-outline-secondary {
    color: #0081D5;
    border-color: #0081D5;
  }
  .btn-outline-secondary:hover {
    color: #fff;
    border-color: #fff;
    background-color: #A133D5;
  }
</style>
