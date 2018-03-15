<template>
  <div class="container">
    <div class="row align-items-end">
      <div class="col-sm"/>
      <div class="col-sm-6">
        <div class="alert alert-success text-center" role="alert">
          <H3>Almost there!</H3>
          <strong>{{msg}}</strong>
        </div>
      </div>
      <div class="col-sm"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Activation',
  data: function () {
    return {
      msg: this.$store.state.msg
    }
  }
}
</script>

<style scoped>
.col-sm-6 {
  margin: 200px 0 200px 0;
}
</style>
