<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Bottom/>
  </div>
</template>

<script>
import Navbar from '@/components/structure/Navbar'
import Bottom from '@/components/structure/Bottom'

export default {
  name: 'App',
  components: {
    Navbar,
    Bottom
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web:200,400,700');

  body {
    font-family: 'Titillium Web', sans-serif;
    font-weight: 400;
  }

  #app {
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
