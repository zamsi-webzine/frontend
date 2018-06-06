<template>
  <div class="container-fluid">
    <!--<main-picture/>-->
    <!--<tagline/>-->
    <client-post-query/>
  </div>
</template>

<script>
import mainPicture from '../contents/client/Picture'
import Tagline from '../contents/client/Tagline'
import ClientPostQuery from '../contents/client/ClientPostQuery'

export default {
  name: 'Index',
  components: {
    // 자식 컴포넌트: 메인 사진 컴포넌트와 홍보 문구 컴포넌트
    mainPicture,
    Tagline,
    ClientPostQuery
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container-fluid {
    padding: 0;
  }
</style>
