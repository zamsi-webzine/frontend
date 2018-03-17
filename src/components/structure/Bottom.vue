<template>
  <footer class="jumbotron jumbotron-fluid">
    <div class="container">
      <p class="text-center text-muted"><em>© 2018. Zamsee all rights reserved.</em></p>
    </div>
  </footer>
</template>

<style scoped>
  .jumbotron {
    margin: 0;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1680px) {
    .jumbotron {
      height: 300px;
    }
    .text-center {
      font-weight: 200;
      font-size: 1.5rem;
    }
  }

  @media (max-width: 414px) {
    .jumbotron {
      height: 200px;
    }
    .text-center {
      font-weight: 200;
      font-size: 1rem;
    }
  }
</style>
