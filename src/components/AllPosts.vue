<template>
  <div class="app">
    <div v-if="$store.getters.currentUser">
      <AllUsers :users="users"></AllUsers>
    <div class="lenta_wrapper">
      <div class="userPost" v-for="item,i in nameSurname  ">
        <div class="userName">
          <img class="miniPhoto" :src="item[6]" />
          <div class="about">{{ item[1] }}</div>
        </div>
        <img @click="openPhoto(item,i)" :src="item[0]" class="bigPhoto" />
        <LikeCommForPosts :photo="item[0]" :users="users" :i="i"></LikeCommForPosts>
      </div>
    </div>
    <OpenedPhoto
      v-if="$store.getters.IncreasePhoto "
      :getData="$store.getters.userInfo"
      :i="$store.getters.photoId"
    ></OpenedPhoto>
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
import OpenedPhoto from "@/components/OpenedPhoto.vue";
export default {
  components: {
    AllUsers,
    LikeCommForPosts,
    OpenedPhoto,
  },
  name: "AllPosts",
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(["loadData", "loadLenta"]),
    openPhoto(photo, i) {
      let index= this.nameSurname[i][3] -1 ;
      let photoIndex= this.nameSurname[i][4]
      this.$store.commit('userInfo',this.users[index])
        this.$store.state.photoLink = photo[0];
      this.$store.commit("IncreasePhoto");
      this.$store.state.photoId = photoIndex;
    },
  },
  mounted() {
    this.loadData();
    this.loadLenta();
  },
  computed: {
    ...mapGetters(["users", "nameSurname",]),
  },
};
</script>

<style scoped>
.userPost {
  font-size: 1.9rem;
  font-weight: 500;
  font-family: "Open Sans-400";
  width: 65rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  background: rgb(243, 241, 241);
  justify-content: space-around;
  border-radius:0.6rem;
  box-shadow: 0rem 0rem 0.3rem 0.1rem;
  margin-top:2rem;
  align-items:center;
  padding-bottom: 2rem;
}
.about{
  margin-left: 1rem;
}
.userName {
  display: flex;
  align-items: center;
margin: 2rem 0; 

}
.miniPhoto {
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  border: 0px;
  box-shadow: 0rem 0rem 0.3rem 0.1rem;

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
  text-align: center;
}
.denyPhoto {
  width: 50rem;
}
.goHome {
  color: rgb(10, 10, 221);
  cursor: pointer;
}
.lenta_wrapper {
  width: 100rem;
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background: white;
padding-bottom: 2rem;
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
  margin-bottom: 2rem;

}
</style>
