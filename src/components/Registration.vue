<template>
  <div class="dialogMain" @click="$store.commit('changeSignMode')">
    <div class="dialogContent" @click.stop>
      <div class="modal_Desc" v-if="$store.getters.editMode == false">
        Регистрация
      </div>
      <div class="modal_Desc" v-else>Редактировать</div>
      <hr />
      <form>
        <SignForm></SignForm>
        <div class="upperFunc">
          <p
            class="registr"
            @click="changeMode"
            v-if="$store.getters.editMode == false"
          >
            Авторизация
          </p>
          <button type="button" class="btn_del btn_animation" @click="cancel">
            Отмена
          </button>
          <button
            v-if="$store.getters.editMode == false"
            type="button"
            class="btn_go btn_animation"
            @click="createNewUser"
          >
            Подтвердить
          </button>
          <button
            v-else
            type="button"
            class="btn_go btn_animation"
            @click="editUser"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SignForm from "./SignForm.vue";
export default {
  components: {
    SignForm,
  },
  props: {
    getData: Object,
  },
  methods: {
    changeMode() {
      this.$store.commit("changeMode");
    },

    async editUser() {
      if (
        ((3 < this.$store.getters.login.length) && ( this.$store.getters.login.length < 17)) &&
        ((4 < this.$store.getters.pass.length) && (this.$store.getters.pass.length<17)) &&
        ((1 < this.$store.getters.name.length) && (this.$store.getters.name.length<17)) &&
        ((1 < this.$store.getters.surname.length) && (this.$store.getters.surname.length<17)) &&
        ((1 < this.$store.getters.country.length) && (this.$store.getters.country.length < 22)) &&
        ((1 < this.$store.getters.city.length) && ( this.$store.getters.city.length<22)) &&
        ((4 < this.$store.getters.study.length) && (this.$store.getters.study.length <51)) &&
        ((5 < this.$store.getters.age) && (this.$store.getters.age<121))
      ) {
        await axios.patch(`http://localhost:3000/allUsers/${this.getData.id}`, {
          login: this.$store.getters.login,
          password: this.$store.getters.pass,
          description: {
            name: this.$store.getters.name,
            surname: this.$store.getters.surname,
            age: this.$store.getters.age,
            country: this.$store.getters.country,
            city: this.$store.getters.city,
          },
          study: this.$store.getters.study,
        });
      }
      alert(
        "Данные успешно обновлены. Пожалуйста пройдите авторизацию заново."
      );
      //На всякий случай сбрасываю данные, чтобы не возникли помехи
      localStorage.clear();
      this.$store.commit("cleanInputData");
      this.$router.push({ name: "home" });
      this.$store.dispatch("loadData");
      this.$store.state.signShow = false;
      this.$store.state.dialogMode = false;
      this.$store.state.editMode = false;
      this.$store.state.currentUser == null;
      //В противном случае события происходят на главной странице
    },
    async createNewUser() {  
      if (
        ((3 < this.$store.getters.login.length) && ( this.$store.getters.login.length < 17)) &&
        ((4 < this.$store.getters.pass.length) && (this.$store.getters.pass.length<17)) &&
        ((1 < this.$store.getters.name.length) && (this.$store.getters.name.length<17)) &&
        ((1 < this.$store.getters.surname.length) && (this.$store.getters.surname.length<17)) &&
        ((1 < this.$store.getters.country.length) && (this.$store.getters.country.length < 22)) &&
        ((1 < this.$store.getters.city.length) && ( this.$store.getters.city.length<22)) &&
        ((4 < this.$store.getters.study.length) && (this.$store.getters.study.length <51)) &&
        ((5 < this.$store.getters.age) && (this.$store.getters.age<121))
      ) {
        //Генератор токена для пользователя
        let rand = function () {
          return Math.random().toString(36).substr(2);
        };
        let token = function () {
          return rand() + rand();
        };
        let jwt = token();
        await axios.post("http://localhost:3000/allUsers/", {
          role: "user",
          login: this.$store.getters.login,
          password: this.$store.getters.pass,
          token: jwt,
          description: {
            name: this.$store.getters.name,
            surname: this.$store.getters.surname,
            age: this.$store.getters.age,
            country: this.$store.getters.country,
            city: this.$store.getters.city,
          },
          study: this.$store.getters.study,
          avatar: "https://cdn-icons-png.flaticon.com/512/1177/1177443.png",
          likedBy: [],
          likes: [],
          comments:[],
          friends:[],
          photo:[],
        });
        alert("Пользователь успешно зарегестрирован.");
        window.location.reload();
      } else {
        alert("Исправьте красные поля.");
      }
    },

    cancel() {
      if (this.$store.getters.editMode) {
        this.$store.commit("editMode");
      } else {
        this.$store.commit("changeSignMode");
      }
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.dialogMain {
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  animation-name: startAnimation;

  animation-duration: 1s;
  -webkit-animation-duration: 1s;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
  visibility: visible !important;
}

@keyframes startAnimation {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
  }
  80% {
    transform: scale(0.9);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.dialogContent {
  margin: auto;
  background: white;
  min-height: 30rem;
  min-width: 50rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 0.3rem;
}
.registr {
  color: rgb(255, 72, 0);
  font-size: 1.8rem;
  border-bottom: 0.1rem solid;
  padding-bottom: 0.1rem;
  width: 10rem;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}
.upperFunc {
  display: flex;
  justify-content: space-around;
  width: 50rem;
  align-items: center;
  margin-bottom: 2rem;
}
.btn_go {
  width: 12rem;
  height: 3.5rem;
  border-radius: 0.3rem;
  background: rgb(43, 42, 42);
  color: white;
  font-size: 1.5rem;
  border: 0px;
}
.btn_go:hover {
  background-color: rgb(255, 255, 255);
  transition: 0.3s;
  border: 0.1rem solid black;
  color: black;
  transform: scale(1.05);
  transition: 0.5s;
}
.btn_del:hover {
  background: rgb(43, 42, 42);
  color: white;
  border: 0px;
  transition: 0.3s;
  transform: scale(1.05);
  transition: 0.5s;
}

.registr:hover {
  transform: scale(1.05);
  transition: 0.3s;
}
.btn_del {
  width: 12rem;
  height: 3.5rem;
  border-radius: 0.3rem;
  background-color: rgb(255, 255, 255);
  border: 0.1rem solid black;
  margin-right: -4rem;
  font-size: 1.5rem;
}
hr {
  border: 2px solid rgb(255, 72, 0);
  width: 50rem;
}
.modal_Desc {
  font-size: 2.4rem;
  font-weight: 600;
  display: flex;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.btn_animation {
  animation: buttonsAnimation 1.5s ease 0.5s;
}

@keyframes buttonsAnimation {
  0% {
    opacity: 0;
    transform: translateX(-2rem);
  }
  80% {
    transform: translateX(2rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0rem);
  }
}
</style>
