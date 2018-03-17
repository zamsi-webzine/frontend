<template>
  <nav class="col-md-2 d-md-block d-none bg-light sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <h3 id="user-title">{{property}}</h3>
          </li>
          <li class="nav-item">
            <span id="email-break">{{getInfo.email}}</span>
          </li>
          <li class="nav-item">
            <hr id="hr-line">
          </li>
          <router-link :to="{name: 'MyPosts'}" tag="li" class="nav-item">
            <a href="" class="nav-link hovering">
              <img src="../../assets/icons/pencil-alt.svg" class="icons" alt="pencil-icon">
              My Posts
            </a>
          </router-link>
          <router-link :to="{name: 'Settings'}" tag="li" class="nav-item">
            <a href="" class="nav-link hovering">
              <img src="../../assets/icons/user-circle.svg" class="icons" alt="user-icon">
              Settings
            </a>
          </router-link>
          <li class="nav-item hovering">
            <a @click="signOut" class="nav-link" id="sign-out-btn">
              <img src="../../assets/icons/sign-out-alt.svg" class="icons" alt="out-icon">
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'sidebar',
  props: ['property'],
  methods: {
    ...mapActions([
      'signOut'
    ])
  },
  computed: {
    ...mapGetters([
      'getInfo'
    ])
  }
}
</script>

<style scoped>
  nav {
    border-right: 1px solid lightgrey;
  }
  .sidebar-sticky {
    margin: 70px 0 70px 0;
  }
  #user-title {
    padding-left: 7px;
  }
  #email-break {
    display: inline-block;
    word-break: break-all;
    padding-left: 7px;
  }
  #hr-line {
    margin-left: 7px;
  }
  .hovering:hover {
    color: #A133D5;
  }
  .nav-link {
    text-decoration: none;
    color: black;
    padding-left: 7px;

  }
  .icons {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
  #sign-out-btn{
    cursor: pointer;
  }
</style>
