<template>
  <div id="app">
    <!--Header Navigation bar-->
    <Navbar/>
    <!--Main Contents-->
    <router-view/>
    <!--Footer-->
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
  @font-face {
    font-family: 'Titillium Web';
    font-style: italic;
    font-weight: 200;
    src: url("/src/assets/fonts/TitilliumWeb-ExtraLightItalic.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    src: url("/src/assets/fonts/TitilliumWeb-Regular.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    src: url("/src/assets/fonts/TitilliumWeb-Bold.woff2") format('woff2');
  }

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
