<template>
  <div class="container-fluid p-0">
    <div class="row m-0">
      <sidebar/>
      <profile/>
    </div>
  </div>
</template>

<script>
import Sidebar from '../contents/Sidebar'
import Profile from '../contents/Profile'
export default {
  name: 'profile-setting',
  props: ['nickname'],
  components: {
    Sidebar,
    Profile
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
