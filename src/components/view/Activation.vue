<template>
  <div class="container">
    <p>{{msg}}</p>
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

</style>
