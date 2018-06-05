<template>
  <div class="mt-5 mb-5">
    <h2 id="post-title" class="mb-4"><strong>{{getPostRetrieve.title}}</strong></h2>
    <div class="d-flex justify-content-between mb-5">
      <div class="d-flex">
        <div class="">
          <img v-if="getThumbnail !== 'null'"
               class="thumbnail"
               :src="getThumbnail" alt="user-thumbnail">
          <img v-else
               class="img-fluid"
               width="100rem"
               src="../../../assets/icons/user-circle.svg" alt="default-user-thumbnail">
        </div>
        <div class="ml-3">
          <p class="mb-0">{{getPostRetrieve.author.nickname}}</p>
          <p class="mb-0 text-muted">
            <span>{{getPostCreatedTime}}</span>
            <span>|</span>
            <span>{{callCategory}}</span>
          </p>
        </div>
      </div>
    </div>
    <div ref="editor" id="content" class="mx-auto"></div>
  </div>
</template>

<script>
  export default {
    name: 'clientPostRetrieve'
  }
</script>

<style scoped>

</style>
