<template>
  <header class="container-fluid shadow-sm">
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <a id="main-logo" class="nav-link disabled p-0 ml-md-3 ml-sm-0" href="/" data-log-event="home">
        <img src="../../assets/icons/logo_black.svg" alt="">
      </a>
      <!--hamburger-->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">

        <!--로그인 시 유저 창-->
        <div v-if="token" class="dropdown mr-2">
          <a v-if="token" href="#" role="button"
             id="dropdownMenuLink"
             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img v-if="getInfo.thumbnail !== 'null'"
                 class="thumbnail"
                 :src="getInfo.thumbnail" alt="user-thumbnail">
            <img v-else
                 class="img-fluid thumbnail"
                 width="100rem"
                 src="../../assets/icons/user-circle.svg" alt="default-user-thumbnail">
          </a>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <router-link tag="a" :to="{name: 'MyPosts'}" class="dropdown-item" href="#">My Posts</router-link>
            <a class="dropdown-item" @click="signOut">Sign Out</a>
          </div>
        </div>

        <!--카테고리 메뉴-->
        <ul class="navbar-nav mr-4">
          <li class="nav-item">
            <a class="nav-link" href="#"
               data-toggle="collapse" data-target=".navbar-collapse.show">About</a>
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" :to="{name: 'ReView'}"
               data-toggle="collapse" data-target=".navbar-collapse.show">Re-View</router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" :to="{name: 'EnterView'}"
                         data-toggle="collapse" data-target=".navbar-collapse.show">Enter-View</router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" :to="{name: 'OverView'}"
               data-toggle="collapse" data-target=".navbar-collapse.show">Over-View</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
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
  .container-fluid {
    padding: 0;
    margin: 0;
  }

  @media (max-width: 1680px) {
    #main-logo {
      width: 160px;
    }
  }

  @media (max-width: 414px) {
    #main-logo {
      width: 120px;
    }
  }

  /*썸네일 정사각형으로 만들기*/
  .thumbnail {
    object-fit: cover;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }
</style>
