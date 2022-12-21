<template>
  <div class="dialogMain" @click="$store.commit('changeSignMode')" @keyup.enter="goToLenta">
    <div class="dialogContent" @click.stop>
      <div class="modal_Desc">Войти</div>
      <hr />
      <form>
        <SignForm></SignForm>
        <div class="upperFunc">
          <p class="registr" @click="changeMode">Регистрация</p>
          <button
            type="button"
            class="btn_del btn_animation"
            @click="$store.commit('changeSignMode')"
          >
            Отмена
          </button>
          <button type="button" class="btn_go btn_animation" @click="goToLenta">
            Подтвердить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SignForm from "./SignForm.vue";
export default {
  components: {
    SignForm,
  },
  data() {
    return {
      allUsers: this.$store.getters.users,
      access: false,
    };
  },
  methods: {
    changeMode() {
      this.$store.commit("changeMode");
    },
    goToLenta() {
      this.allUsers.find((user) => {
        if (
          user.login == this.$store.getters.login &&
          user.password == this.$store.getters.pass
        ) {
          this.$router.push({ name: "lenta" });
          this.access = true;
          this.$store.commit("changeAuth");
          localStorage.setItem("token",user.token);
          localStorage.setItem('user',JSON.stringify(user))
          this.$store.commit('currentUser',user)
        }
      });
      if (this.access == false) {
        alert("Логин или пароль введен неверно!");
      }
    },
  },
};
</script>

<style scoped>
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
.dialogMain { 
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  animation-name: startAnimation;
  animation-duration: 1s;
  -webkit-animation-duration: 1s;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
  visibility: visible !important;
}
.dialogContent {
  margin: auto;
  background: white;
  height: 30rem;
  max-width: 50rem;
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
.registr:hover{
  transform: scale(1.05);
  transition: 0.3s;

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
  border: 0rem;
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
  border: 0rem;
  transition: 0.3s;
  transform: scale(1.05);
  transition: 0.5s;
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
  border: 0.2rem solid rgb(255, 72, 0);
  width: 50rem;
}
.modal_Desc {
  font-size: 2.4rem;
  font-weight: 600;
  display: flex;
  margin-left: 1rem;
  margin-top: 0.5rem;
}
.btn_animation{
  animation: buttonsAnimation 1.5s ease 0.5s
}

@keyframes buttonsAnimation{
  0%{
    opacity:0;
    transform: translateX(-2rem);
  }
  80%{
    transform: translateX(2rem);
  }
  100%{
    opacity: 1;
    transform: translateX(0rem);
  }
}
</style>
