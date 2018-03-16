<template>
  <div class="container-fluid p-0">
    <div class="row m-0">
      <sidebar/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from '../structure/Sidebar'
export default {
  name: 'dashboard',
  props: ['nickname'],
  components: {
    Sidebar
  }
}
</script>

<style>
  header {
    margin: 0 !important;
  }
  footer {
    margin: 0 !important;
  }
</style>
