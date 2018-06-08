<template>
  <div class="mt-5 mb-5">
    <div id="about" class="mx-auto p-2" v-html="callAbout"></div>
  </div>
</template>

<script>
const about = require('../../../assets/markdown/about.md');

export default {
  name: 'About',
  computed: {
    callAbout() {
      return about;
    },
  },
};
</script>

<style scoped>
#about {
  max-width: 700px;
  font-family: 'Noto Serif', serif;
  font-weight: 400;
}
</style>
