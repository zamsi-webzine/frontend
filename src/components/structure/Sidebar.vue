<template>
  <nav class="col-md-2 d-md-block d-none sidebar">
      <div class="sidebar-sticky mt-5 mb-5">
        <ul class="nav flex-column">
          <li class="nav-item mx-auto mb-3">
            <button class="btn btn-link p-0"
                    data-toggle="modal" data-target="#thumbnailModal">
              <!--썸네일 유무에 따라 기본 이미지가 제공되거나 유저 이미지가 제공됨-->
              <span class="d-block">
                <img v-if="getInfo.thumbnail !== 'null'"
                     class="thumbnail"
                     :src="getInfo.thumbnail" alt="user-thumbnail">
                <img v-else
                     class="img-fluid"
                     width="100rem"
                    src="../../assets/icons/user-circle.svg" alt="default-user-thumbnail">
              </span>
            </button>

            <!-- Modal -->
            <div class="modal fade" id="thumbnailModal" tabindex="-1" role="dialog" aria-labelledby="thumbnailModalTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="thumbnailModalLongTitle">Update Thumbnail</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form enctype="multipart/form-data" @submit.prevent="onImageUpload">
                    <div class="modal-body">
                      <div class="form-group">
                        <p class="card-text">썸네일을 지우려면 아무것도 선택하지 않은 채로 'confirm'을 누르세요.</p>
                        <label for="imageUpload">썸네일 업로드</label>
                        <input type="file" ref="file" accept="image/*" class="form-control-file" id="imageUpload" @change="handleFileUpload()">
                      </div>
                      <img :src="imagePreview" v-show="showPreview" class="img-fluid"/>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-outline-primary">Confirm</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </li>
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
  data () {
    return {
      file: '',
      showPreview: false,
      imagePreview: ''
    }
  },
  methods: {
    handleFileUpload () {
      /*
       Set the local file variable to what the user has selected.
       */
      this.file = this.$refs.file.files[0]
      /*
       Initialize a File Reader object
       */
      let reader = new FileReader()

      /*
       Add an event listener to the reader that when the file
       has been loaded, we flag the show preview as true and set the
       image to be what was read from the reader.
       */
      reader.addEventListener('load', function () {
        this.showPreview = true
        this.imagePreview = reader.result
      }.bind(this), false)

      /*
       Check to see if the file is not empty.
       */
      if (this.file) {
        /*
         Ensure the file is an image file.
         */
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          /*
           Fire the readAsDataURL method which will read the file in and
           upon completion fire a 'load' event which we will listen to and
           display the image in the preview.
           */
          reader.readAsDataURL(this.file)
        }
      }
    },
    onImageUpload () {
      /*
       Initialize the form data
       */
      let formData = new FormData()

      /*
       Add the form data we need to submit
       */
      formData.append('thumbnail', this.file)

      this.$store.dispatch('patchThumbnail', formData)
    },
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
  /*썸네일 정사각형으로 만들기*/
  .thumbnail {
    object-fit: cover;
    height: 7rem;
    width: 7rem;
    border-radius: 50%;
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
