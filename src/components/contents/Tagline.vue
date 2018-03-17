<template>
  <section class="container" id="tagline">
    <article class="container" id="d-day-title">
      <h1 class="text-center">2018.05</h1>
    </article>
    <article class="container" id="description">
      <h3 class="text-center display-4">잠시,</h3>
      <h3 class="text-center display-4">들어가도 되겠습니까</h3>
    </article>
  </section>
</template>

<style scoped>
  @font-face {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 200;
    src: url("/src/assets/fonts/NotoSerifCJKkr-Light-subset.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 400;
    src: url("/src/assets/fonts/NotoSerifCJKkr-Medium-subset.woff2") format('woff2');
  }

  @font-face {
    font-family: 'Noto Serif';
    font-style: normal;
    font-weight: 600;
    src: url("/src/assets/fonts/NotoSerifCJKkr-Bold-subset.woff2") format('woff2');
  }

  #tagline {
    padding: 0;
    margin-bottom: 70px;
  }

  #d-day-title > h1 {
    margin-bottom: 30px;
    font-weight: 700 !important;
  }

  #description {
    font-family: 'Noto Serif', serif;
    font-weight: 400;
  }

  @media (max-width: 1680px) {

    #description > h3 {
      font-size: 4rem !important;
    }
  }

  @media (max-width: 414px) {

    #description > h3 {
      font-size: 2rem !important;
    }
  }
</style>
