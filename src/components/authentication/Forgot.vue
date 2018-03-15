<template>
  <div class="container" id="forgot-password">
    <div class="row align-items-end">
      <div class="col-sm"></div>
      <div class="col-sm-6">
        <form @submit.prevent="resetPWD" method="post">
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
            <div class="col-sm-12">
              <!--에러 메시지가 발견되면 창을 띄우고 아니면 가린다-->
              <div v-if="this.$store.state.msg !== ''" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{{displayMessage}}</strong>
              </div>
              <div v-else class="alert alert-danger alert-dismissible fade show d-none" role="alert">
                <strong>{{displayMessage}}</strong>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forgot',
  data: function () {
    return {
      email: ''
    }
  },
  methods: {
    resetPWD () {
      const formData = {
        email: this.email
      }
      this.$store.dispatch('resetPWD', {
        email: formData.email
      })
    }
  },
  computed: {
    // 게으른 연산: displayMessage
    // Store에 에러 메시지가 관측되는 순간 그 값을 리턴한다
    displayMessage () {
      return this.$store.state.msg
    }
  }
}
</script>

<style scoped>
  form {
    margin: 200px 0 200px 0;
  }
  #forgot-title {
    padding-left: 15px;
    margin-bottom: 25px;
  }
</style>
