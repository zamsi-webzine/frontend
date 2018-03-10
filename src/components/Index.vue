<template>
  <div class="container-fluid">
    <Navbar/>
    <Bottom/>
  </div>
</template>

<script>
import Navbar from './structure/Navbar'
import Bottom from './structure/Bottom'

export default {
  name: 'Index',
  components: {
    Navbar,
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
