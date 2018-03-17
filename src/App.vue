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
    font-style: normal;
    font-weight: 300;
    src: url("./assets/fonts/TitilliumWeb/TitilliumWeb-Light.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Titillium Web';
    font-style: italic;
    font-weight: 300;
    src: url("./assets/fonts/TitilliumWeb/TitilliumWeb-LightItalic.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 500;
    src: url("./assets/fonts/TitilliumWeb/TitilliumWeb-Regular.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Titillium Web';
    font-style: italic;
    font-weight: 500;
    src: url("./assets/fonts/TitilliumWeb/TitilliumWeb-Italic.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 700;
    src: url("./assets/fonts/TitilliumWeb/TitilliumWeb-Bold.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Titillium Web';
    font-style: italic;
    font-weight: 700;
    src: url("./assets/fonts/TitilliumWeb/TitilliumWeb-BoldItalic.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 300;
    src: url("./assets/fonts/NotoSerifCJKkr-Light-subset.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 500;
    src: url("./assets/fonts/NotoSerifCJKkr-Medium-subset.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 700;
    src: url("./assets/fonts/NotoSerifCJKkr-Bold-subset.woff2") format('woff2');
  }

  body {
    font-family: 'Titillium Web', sans-serif, 'Noto Serif', serif;
    font-weight: 500;
  }

  #app {
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
