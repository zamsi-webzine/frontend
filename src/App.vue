<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:200i,500,800');
  @import url(//fonts.googleapis.com/earlyaccess/kopubbatang.css);

  body {
    font-family: 'Montserrat', sans-serif;
  }

  #app {
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
