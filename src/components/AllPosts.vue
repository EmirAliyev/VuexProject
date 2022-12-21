<template>
  <div class="app">
    <AllUsers :users="users" v-if="$store.getters.auth"></AllUsers>
    <div class="wrapper" v-if="$store.getters.auth">
      <div class="userPost" v-for="(photo, i) in lenta">
        <img :src="photo" class="bigPhoto" />
        <div>{{ nameSurname[i] }}</div>
        <LikeCommForPosts :users="users" :i="i"></LikeCommForPosts>
      </div>
    </div>
    <div class="else-block" v-else>
      <img src="@/assets/deny.jpg" class="denyPhoto" />
      <p>
        Доступ закрыт. Пожалуйста пройдите регистрацию или авторизуйтесь на
        <span class="goHome" @click="$router.push({ name: 'home' })"
          >Главной странице.</span
        >
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AllUsers from "@/components/AllUsers.vue";
import LikeCommForPosts from "@/components/LikeCommForPosts.vue";
export default {
  components: {
    AllUsers,
    LikeCommForPosts,
  },
  name: "AllPosts",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["loadData", "loadLenta"]),
  },
  mounted() {
    this.loadData();
    this.loadLenta();
  },
  computed: {
    ...mapGetters(["users", "lenta", "nameSurname", "allLikes"]),
  },
};
</script>

<style scoped>
.userPost {
  font-size: 1.9rem;
  font-weight: 500;
  font-family: "Open Sans-400";
  background: rgb(212, 212, 212);
  width: 60rem;
  margin: auto;
  padding: 4rem 0rem;
  display: flex;
  flex-direction: column;
  background: white;
}
.userName {
  display: flex;
  align-items: center;
}
.miniPhoto {
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
}
.wrapper {
  width: 100rem;
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background: white;
}
.app {
  display: flex;
  position: relative;
  background: rgb(238, 233, 233);
  flex-direction: column;
}
.bigPhoto {
  width: 60rem;
  max-height: 80rem;
}
</style>
