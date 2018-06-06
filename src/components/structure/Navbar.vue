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
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ml-auto mr-4">
          <li class="nav-item">
            <a class="nav-link" href="#"
               data-toggle="collapse" data-target=".navbar-collapse.show">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
               data-toggle="collapse" data-target=".navbar-collapse.show">Re-View</a>
          </li>
          <li class="nav-item">
            <router-link tag="a" class="nav-link" :to="{name: 'EnterView'}"
                         data-toggle="collapse" data-target=".navbar-collapse.show">Enter-View</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
               data-toggle="collapse" data-target=".navbar-collapse.show">Over-View</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

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
</style>
