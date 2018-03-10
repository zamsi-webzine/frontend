<template>
  <div class="container-fluid">
    <Picture/>
    <Tagline/>
  </div>
</template>

<script>
import Picture from '../contents/Picture'
import Tagline from '../contents/Tagline'

export default {
  name: 'Index',
  components: {
    Picture,
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
