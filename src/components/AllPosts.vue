<template>
  <div class="app">
    <AllUsers :users="users" v-if="$store.getters.auth"></AllUsers>
    <div class="wrapper" v-if="$store.getters.auth">
      <div class="userPost" v-for="user in users" :key="user.id">
        <div class="post-wrapper" v-for="(photo, i) in user.photo">
          <div class="userName">
            <img class="miniPhoto" :src="user.photo[0]" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ user.description.name }}
            {{ user.description.surname }} - [{{ user.role }}]
          </div>
          <img :src="photo" class="bigPhoto" />
          <LikeComment :getData="user, i"></LikeComment>
        </div>
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
import LikeComment from "@/components/LikeComment.vue";
import OnePost from '@/components/OnePost.vue'
export default {
  components: {
    AllUsers,
    LikeComment,
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
    ...mapGetters(["users",'lenta']),
    photos() {
      let photos = [];
      this.users.forEach((user) => {
        for (let link of user.photo) {
          photos.push(link);
        }
      });
      return photos;
    },
    likes() {
      let likes = [];
      this.users.forEach((user) => {
        for (let like of user.likes) {
          likes.push(like[0]);
        }
      });
      return likes;
    },
    comments() {
      let comments = [];
      this.users.forEach((user) => {
        for (let comment of user.comments) {
          comments.push(comment.length);
        }
      });
      return comments;
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("changeAuth");
    }
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
