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
  components: {
    Sidebar
  }
}
</script>

<style scoped>

</style>
