<template>
 <div class="app">
    <AllUsers :users="users" ></AllUsers>
    <div class="wrapper">
<div class="userPost"  v-for="photo,i in lenta">
  <img  :src="photo">
  <div>{{ nameSurname[i] }}</div> 
  <LikeCommForPosts :i="i"></LikeCommForPosts>
</div>
    </div>
    <div class="else-block" >
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

<!-- <div class="userPost"  v-for="photo,i in lenta">
  <img  :src="photo">
  <div>{{ nameSurname[i] }}</div> 
</div> -->

<script>
import { mapActions, mapGetters } from "vuex";
import AllUsers from "@/components/AllUsers.vue";
import LikeCommForPosts from "@/components/LikeCommForPosts.vue";
import OnePost from '@/components/OnePost.vue'
export default {
  components: {
    AllUsers,
    LikeCommForPosts,
    OnePost
  },
  name: "AllPosts",
  data() {
    return {
      lentaMass: [],
    };
  },
  methods: {
    ...mapActions(["loadData", "loadLenta"]),
  },
  mounted() {
    this.loadData();
    this.loadLenta();
  },
  computed: {
    ...mapGetters(["users",'lenta','nameSurname','allLikes']),

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
.denyPhoto {
  width: 50rem;
}
.post-wrapper {
  width: 60rem;
  border: 1px solid black;
}
.else-block {
  background: white;
  font-size: 24px;
  font-family: "Open Sans-400";
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 89.3vh;
  width: 100%;
}
.goHome {
  color: rgb(10, 10, 221);
  cursor: pointer;
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
  max-height: 70rem;
}
</style>
