<template>
  <div class="container-fluid">
    <Navbar/>
    <Picture/>
    <Tagline/>
    <Bottom/>
  </div>
</template>

<script>
import Navbar from '../structure/Navbar'
import Picture from '../contents/Picture'
import Tagline from '../contents/Tagline'
import Bottom from '../structure/Bottom'

export default {
  name: 'Index',
  components: {
    Navbar,
    Picture,
    Tagline,
    Bottom
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container-fluid {
    padding: 0;
  }
</style>
