<template>
  <main role="main" class="col-md-9 col-sm-12 ml-auto mr-auto">
    <div class="d-flex">
      <h1 class="mr-auto pt-3">Settings</h1>
      <div class="pt-4">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-outline-danger"
                data-toggle="modal" data-target="#destroyModal">
          <strong>Delete Account</strong>
        </button>

        <!-- Modal -->
        <div class="modal fade" id="destroyModal"
             tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete Account</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Do you really want to delete your account?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit"
                        data-dismiss="modal" @click="destroySubmit" class="btn btn-danger">
                  <strong>Delete Anyway</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="ml-sm-auto mr-sm-auto col-sm-6">
      <form @submit.prevent="patchSubmit" method="post">
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
import { mapGetters } from 'vuex';
import CheckoutMessage from '../common/CheckoutMessage.vue';

export default {
  components: { CheckoutMessage },
  name: 'profile',
  props: ['property'],
  data() {
    return {
      newNickname: '',
      password1: '',
      password2: '',
    };
  },
  methods: {
    // 회원 정보 수정을 위한 메소드
    patchSubmit() {
      const formData = {
        nickname: this.newNickname,
        password1: this.password1,
        password2: this.password2,
      };
      // 부모 컴포넌트에 'updateNickname'이라는 이름의 이벤트를 전파
      // 이때 parameter 값은 this.newNickname
      this.$emit('updateNickname', this.newNickname);
      // Vuex store에 지정된 patchProfile action 호출
      this.$store.dispatch('patchProfile', formData);
    },
    // 회원 삭제를 위한 메소드
    destroySubmit() {
      // Vuex store에 지정된 destroyProfile action 호출
      this.$store.dispatch('destroyProfile');
    },
  },
  computed: {
    ...mapGetters([
      'getInfo',
    ]),
  },
};
</script>

<style scoped>
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
