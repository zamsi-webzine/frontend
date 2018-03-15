<template>
  <section class="container" id="picture">
    <div class="row align-items-end">
      <div class="col-sm">

      </div>
      <div class="col-sm-10">
        <div class="text-center">
          <button class="btn btn-link rounded-circle" v-on:click="randomNum">
            <img id="popover" data-toggle="popover" data-placement="bottom" title="어디일까?"
                 data-content="우리 곁에 있었던 골목길, 교차로, 그리고 낙서들."
                 :src="imagePath+imageNum+extensions"
                 class="rounded-circle img-fluid" alt="도시">
          </button>
        </div>
      </div>
      <div class="col-sm">

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'main-picture',
  data: function () {
    return {
      imagePath: 'https://doy0iundk4hjr.cloudfront.net/static/assets/images/cities/landing_0',
      imageNum: 1,
      extensions: '.jpg'
    }
  },
  methods: {
    randomNum: function (event) {
      let num = Math.floor(Math.random() * 7) + 1
      this.imageNum = num
    }
  }
}
</script>

<style scoped>
  #picture {
    padding: 50px 0 50px 0;
  }

  .col-sm-10 {
    padding: 0 30px 0 30px;
  }

</style>
