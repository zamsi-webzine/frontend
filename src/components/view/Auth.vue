<template>
  <section class="container">
    <div class="row align-items-end">
      <div class="col-sm"/>
      <div class="col-sm-6">
        <!--자식 컴포넌트 호출-->
        <router-view/>
      </div>
      <div class="col-sm"/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'auth',
};
</script>

<style scoped>
  /* 자식 컴포넌트 마진 조절 */
  form {
    margin: 200px 0 200px 0;
  }
  .alert {
    margin: 200px 0 200px 0;
  }
</style>
