<template>
  <div class="container-fluid p-0">
    <div class="row m-0">
      <!-- v-bind = 부모 컴포넌트의 데이터 'nickname'을 'property'라는 이름으로 자식 컴포넌트에 연결 -->
      <sidebar v-bind:property="nickname"/>
      <!-- 자식 컴포넌트 호출  -->
      <!-- v-on = 자식 컴포넌트의 이벤트 요소가 감지되면 부모 컴포넌트의 메소드를 작동시킴 -->
      <router-view v-bind:property="nickname" v-on:updateNickname="updateNickname" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '../structure/Sidebar'
import MyPosts from '../contents/MyPosts'
import Settings from '../contents/Settings'
export default {
  name: 'dashboard',
  data () {
    return {
      // 부모 컴포넌트의 데이터
      nickname: localStorage.getItem('nickname')
    }
  },
  methods: {
    // 자식 컴포넌트에서 updateNickname 이벤트가 발생하면 작동하는 메소드
    // updateNickname 이벤트에 담겨 온 parameter인 this.newNickname을 부모 컴포넌트의 nickname에 대입
    // 그러면 자식 컴포넌트에서 바뀐 닉네임이 전체 부모 컴포넌트를 통해 sidebar 컴포넌트까지 전파됨
    updateNickname (nickname) {
      this.nickname = nickname
    }
  },
  computed: {
    ...mapGetters([
      'getInfo'
    ])
  },
  components: {
    Sidebar,
    MyPosts,
    Settings
  }
}
</script>

<style scoped>

</style>
