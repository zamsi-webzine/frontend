<template>
  <div class="container-fluid">
    <main-picture/>
    <Tagline/>
  </div>
</template>

<script>
import mainPicture from '../contents/Picture'
import Tagline from '../contents/Tagline'

export default {
  name: 'Index',
  components: {
    mainPicture,
    Tagline
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container-fluid {
    padding: 0;
  }
</style>
