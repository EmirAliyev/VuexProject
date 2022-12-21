<template>
  <div id="app">
    <nav class="navBar">
      <img
        src="@/assets/login-.png"
        v-if="$store.getters.currentUser == null"
        @click="changeSignMode"
        type="button"
        class="logIn"
      />
      <div class="navBtns" v-else>
        <img
          src="@/assets/logout.png"
          @click="leaveAccount"
          type="button"
          class="logIn"
        />
        <img
          src="@/assets/photos.png"
          @click="$router.push({ name: 'lenta' })"
          class="lenta logIn"
        />
        <img
          src="@/assets/profile.png"
          @click="goMyPage"
          class="myPage logIn"
        />
      </div>
      <img class="logo" src="@/assets/logo.png" />
      <input
        @keydown=""
        v-model="inputValue"
        type="text"
        class="forSearch"
        placeholder="Поиск пользователя"
      />
    </nav>
    <hr />
    <router-view />
    <div class="usersResult" v-if="inputValue">
      <div
        v-if="filteredUsers"
        class="user"
        v-for="user in filteredUsers"
        :key="user.id"
        @click="visitUser(user)"
      >
        <img class="miniPhoto" :src="user.photo[0]" />
        {{ user.description.name }} {{ user.description.surname }} -
        {{ user.role }}
      </div>
      <div class="elseBlock" v-else>Пользователь не найден</div>
    </div>
  </div>
</template>

<script>
import Authorization from "./components/Authorization.vue";
import Registration from "./components/Registration.vue";
export default {
  components: {
    Authorization,
    Registration,
  },
  data() {
    return {
      keyCheck: localStorage.getItem("token"),
      inputValue: "",
    };
  },
  methods: {
    changeSignMode() {
      this.$store.commit("changeSignMode");
      this.$store.state.login = "";
      this.$store.state.pass = "";
      this.$store.state.dialogMode = true;
    },
    leaveAccount() {
      this.$store.commit("cleanInputData");
      this.$router.push({ name: "home" });
      localStorage.clear();
      this.$store.state.currentUser = null;
      this.$state.dialogMode == true;
    },
    visitUser(user) {
      this.$router.push({ name: "userPage", params: { id: user.login } });
      this.inputValue = "";
      this.$store.commit("visitedUser", user);
      this.$store.commit("cleanInputData");
    },
    goMyPage() {
      this.$router.push({
        name: "userPage",
        params: { id: this.$store.getters.currentUser.login },
      });
      this.$store.state.friendsMode = false;
    },
  },
  created() {
    this.$store.dispatch("loadData");
  },
  mounted() {
    this.$store.commit("currentUser", JSON.parse(localStorage.getItem("user")));
  },
  computed: {
    filteredUsers() {
      return this.$store.getters.users.filter((user) => {
        let name = user.description.name
          .toLowerCase()
          .includes(this.inputValue.toLowerCase());
        let surname = user.description.surname
          .toLowerCase()
          .includes(this.inputValue.toLowerCase());
        let nameSurname = (
          user.description.name.toLowerCase() +
          " " +
          user.description.surname.toLowerCase()
        ).includes(this.inputValue.toLowerCase());
        return name || surname || nameSurname;
      });
    },
  },
};
//Debounds
</script>

<style>
html * /* override x.xhtml.ru style */ {
  scrollbar-width: thin;
  scrollbar-color: rgb(91, 145, 196);
}

*::-webkit-scrollbar,
html *::-webkit-scrollbar {
  height: 12px;
  width: 12px;
}
*::-webkit-scrollbar-track,
html *::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  border-radius: 6px 6px 6px 6px;
}
*::-webkit-scrollbar-thumb,
html *::-webkit-scrollbar-thumb {
  background-color: rgb(91, 145, 196);
  border-radius: 5px;
  border: px solid;
}

/* this stuff below doesn't
   affect scrollbar styling */
html {
  background: rgb(238, 233, 233);

  overflow: auto;
}

.navBtns {
  width: 15rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user {
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  font-family: "Open Sans-400";
  margin-top: 0.5rem;
  cursor: pointer;
}

.miniPhoto {
  width: 4rem;
  border-radius: 50%;
  height: 4rem;
  margin-left: 0.5rem;
  align-self: center;
  margin-right: 0.5rem;
  border: 1px solid black;
}
.usersResult {
  width: 30rem;
  height: 40rem;
  position: absolute;
  top: 10.4rem;
  right: 6rem;
  background: rgb(255, 255, 255);
  box-shadow: 0px 0px 0.3rem 0.1rem grey;
  border-radius: 0.3rem;
  overflow-y: auto;
  z-index: 2;
}

html {
  font-size: 10px;
  background: rgb(238, 233, 233);
}
@font-face {
  font-family: "Open Sans-400";
  src: url("@/fonts/OpenSans-Light.woff2") format("woff2"),
    url("@/fonts/OpenSans-Light.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Open Sans-400";
  src: url("@/fonts/OpenSans-Regular.woff2") format("woff2"),
    url("@/fonts/OpenSans-Regular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  margin: auto;
  width: 100%;
  background-color: rgb(238, 233, 233);
  position: relative;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.navBar {
  width: 100%;
  background: white;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 10rem;
}
.logIn {
  font-size: 1.6rem;
  position: relative;
  transition: all 0.5s;
  animation: headerButton 1s ease 0.2s;
  cursor: pointer;
  width: 3.6rem;
}
.myPage {
  margin-top: 0.1rem;
  width: 4rem;
}
.logIn:hover {
  transform: translateY(-0.4rem);
}

@keyframes headerButton {
  0% {
    opacity: 0;
    transform: translateY(5rem);
  }
  80% {
    transform: translateY(-2rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.forSearch {
  height: 3.5rem;
  border-radius: 0.6rem;
  font-size: 1.6rem;
  padding: 0.5rem;
  padding-top: 0.3rem;
  border: 0.1rem solid rgb(5, 79, 177);
  font-family: "Open Sans-400";
  background: url("@/assets/loupe.png") no-repeat scroll 0.7rem 0.7rem;
  background-size: 2rem;
  width: 22rem;
  padding-left: 3.5rem;
  animation: headerSearch 1s ease-out 0.2s;
}

@keyframes headerSearch {
  0% {
    opacity: 0;
    transform: translateY(5rem);
  }
  80% {
    transform: translateY(-2rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.forSearch:focus {
  outline: none;
  border-color: rgb(255, 72, 0);
}
hr {
  border: 0.2rem solid rgb(255, 72, 0);
}
.logo {
  max-width: 20rem;
  animation: headerLogo 1s ease-out 0.2s;
}
@keyframes headerLogo {
  0% {
    opacity: 0;
    transform: translateY(5rem);
  }
  80% {
    transform: translateY(-2rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@media (max-width: 1200px) {
  html {
    font-size: 9px;
  }
}

@media (max-width: 992px) {
  html {
    font-size: 8px;
  }
}
@media (max-width: 767px) {
  html {
    font-size: 7px;
  }
}

@media (max-width: 550px) {
  html {
    font-size: 5px;
  }
}
@media (max-width: 425px) {
  html {
    font-size: 4px;
  }
}
</style>
