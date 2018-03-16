<template>
  <nav class="col-md-2 d-md-block d-none bg-light sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <h3 id="user-title">{{GET_INFO.nickname}}</h3>
          </li>
          <li class="nav-item">
            <span id="email-break">{{GET_INFO.email}}</span>
          </li>
          <li class="nav-item">
            <hr id="hr-line">
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fas fa-pencil-alt"></i>
              My Posts
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fas fa-user-circle"></i>
              Profile
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fas fa-sign-out-alt"></i>
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
import * as types from '@/store/types'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'sidebar',
  methods: {
    ...mapActions([
      types.GET_DASHBOARD
    ])
  },
  computed: {
    ...mapGetters([
      types.GET_INFO
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
    padding-left: 10px;
  }
  #email-break {
    display: inline-block;
    word-break: break-all;
    padding-left: 10px;
  }
  #hr-line {
    margin-left: 10px;
  }
  .nav-link {
    text-decoration: none;
    color: black;

  }
</style>
