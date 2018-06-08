<template>
  <div id="app">
    <!--Header Navigation bar-->
    <navbar/>
    <!--Main Contents-->
    <router-view id="wrapper"/>
    <!--Footer-->
    <bottom/>
  </div>
</template>

<script>
import Navbar from '@/components/structure/Navbar'
import Bottom from '@/components/structure/Bottom'

export default {
  name: 'App',
  components: {
    // 항상 호출되는 자식 컴포넌트 정의 (헤더와 푸터)
    // 그 사이에 있는 router-view를 통해 세 가지 주요 컴포넌트 (Home, Auth, Profile)가 호출된다
    Navbar,
    Bottom
  }
}
</script>

<style>
  /* 폰트 정의 시작 */
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
    src: url("./assets/fonts/NotoSerifCJKkr/NotoSerifCJKkr-Light-subset.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 500;
    src: url("./assets/fonts/NotoSerifCJKkr/NotoSerifCJKkr-Medium-subset.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 700;
    src: url("./assets/fonts/NotoSerifCJKkr/NotoSerifCJKkr-Bold-subset.woff2") format('woff2');
  }

  #app {
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Titillium Web', sans-serif;
    font-weight: 500;
  }
  #wrapper {
    padding: 88px 0 0 0;
    position: relative;
    min-height: calc(100vh - 88px);
  }
</style>
