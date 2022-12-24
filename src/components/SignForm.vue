<template>
  <div class="form_Container">
    <div class="form-group">
      <label for="name">Ваш Логин</label>
      <input
        ref="myLogin"
        name="login"
        autocomplete="on"
        v-model="$store.state.login"
        type="text"
        class="form-control"
        id="name"
        @keyup="checkInput"
      />
      <p class="warnLogin" v-if="warnMode">От 4 до 16 символов</p>
    </div>
    <div class="form-group">
      <label for="inputPassword">Ваш пороль</label>
      <input
        ref="myPass"
        name="password"
        autocomplete="on"
        v-model="$store.state.pass"
        type="password"
        class="form-control"
        id="inputPassword"
        @keyup="checkInput2"
      />
      <p class="warnPass" v-if="warnMode2">От 5 до 16 символов</p>
    </div>
    <div class="form-group" v-if="dialogMode === false">
      <label for="userName">Имя</label>
      <input
        ref="myName"
        name="userName"
        autocomplete="on"
        type="text"
        class="form-control"
        id="userName"
        v-model="$store.state.name"
        @keyup="checkInputName"
      />
      <p class="warnName" v-if="warnModeName">От 2 до 16 символов</p>
    </div>
    <div class="form-group" v-if="dialogMode === false">
      <label for="surName">Фамилия</label>
      <input
        ref="mySurname"
        name="surName"
        autocomplete="on"
        type="text"
        class="form-control"
        id="surName"
        v-model="$store.state.surname"
        @keyup="checkInputSurname"
      />
      <p class="warnSurname" v-if="warnModeSurname">От 2 до 16 символов</p>
    </div>
    <div class="form-group" v-if="dialogMode === false">
      <label for="age">Возраст</label>
      <input
        ref="myAge"
        name="age"
        autocomplete="on"
        type="number"
        class="form-control"
        id="age"
        v-model="$store.state.age"
        @keyup="checkInputAge"
      />
      <p class="warnAge" v-if="warnModeAge">От 6 до 120 лет</p>
    </div>
    <div class="form-group" v-if="dialogMode === false">
      <label for="country">Страна</label>
      <input
        ref="myCountry"
        name="country"
        autocomplete="on"
        type="text"
        class="form-control"
        id="country"
        v-model="$store.state.country"
        @keyup="checkInputCountry"
      />
      <p class="warnCountry" v-if="warnModeCountry">От 2 до 21 символов</p>
    </div>
    <div class="form-group" v-if="dialogMode === false">
      <label for="city">Город</label>
      <input
        ref="myCity"
        name="city"
        autocomplete="on"
        type="text"
        class="form-control"
        id="city"
        v-model="$store.state.city"
        @keyup="checkInputCity"
      />
      <p class="warnCity" v-if="warnModeCity">От 2 до 21 символов</p>
    </div>
    <div class="form-group" v-if="dialogMode === false">
      <label for="study">Универ/Школа</label>
      <input
        ref="myStudy"
        name="study"
        autocomplete="on"
        type="text"
        class="form-control"
        id="study"
        v-model="$store.state.study"
        @keyup="checkInputStudy"
      />
      <p class="warnStudy" v-if="warnModeStudy">От 5 до 50 символов</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "SignForm",
  data() {
    return {
      warnMode: false,
      warnMode2: false,
      warnModeName: false,
      warnModeSurname: false,
      warnModeAge: false,
      warnModeCountry:false,
      warnModeCity:false,
      warnModeStudy:false,
    };
  },
  methods: {
    checkInput() {
      let loginInput = this.$refs.myLogin;
      if (loginInput.value.length == 0) {
        this.warnMode = false;
        loginInput.style.border = " 0.2rem solid black";
      } else if (4 > loginInput.value.length || loginInput.value.length > 16) {
        loginInput.style.border = " 0.2rem solid red";
        this.warnMode = true;
      } else {
        loginInput.style.border = " 0.2rem solid green";
        this.warnMode = false;
      }
    },
    checkInput2() {
      let loginInput = this.$refs.myPass;
      if (loginInput.value.length == 0) {
        this.warnMode2 = false;
        loginInput.style.border = " 0.2rem solid black";
      } else if (5 > loginInput.value.length || loginInput.value.length > 16) {
        loginInput.style.border = " 0.2rem solid red";
        this.warnMode2 = true;
      } else {
        loginInput.style.border = " 0.2rem solid green";
        this.warnMode2 = false;
      }
    },
    checkInputName() {
      let loginInput = this.$refs.myName;
      if (loginInput.value.length == 0) {
        this.warnModeName = false;
        loginInput.style.border = " 0.2rem solid black";
      } else if (2 > loginInput.value.length || loginInput.value.length > 16) {
        loginInput.style.border = " 0.2rem solid red";
        this.warnModeName = true;
      } else {
        loginInput.style.border = " 0.2rem solid green";
        this.warnModeName = false;
      }
    },
    checkInputSurname() {
      let loginInput = this.$refs.mySurname;
      if (loginInput.value.length == 0) {
        this.warnModeSurname = false;
        loginInput.style.border = " 0.2rem solid black";
      } else if (2 > loginInput.value.length || loginInput.value.length > 16) {
        loginInput.style.border = " 0.2rem solid red";
        this.warnModeSurname = true;
      } else {
        loginInput.style.border = " 0.2rem solid green";
        this.warnModeSurname = false;
      }
    },
    checkInputAge() {
      let loginInput = this.$refs.myAge;
      if (loginInput.value.length == 0) {
        this.warnModeAge = false;
        loginInput.style.border = " 0.2rem solid black";
      } else if (6 <= loginInput.value && loginInput.value <= 120) {
        loginInput.style.border = " 0.2rem solid green";
        this.warnModeAge = false;
      } else {
        loginInput.style.border = " 0.2rem solid red";
        this.warnModeAge = true;
      }
    },
    checkInputCountry() {
      let loginInput = this.$refs.myCountry;
      if (loginInput.value.length == 0) {
        this.warnModeCountry = false;
        loginInput.style.border = " 0.2rem solid black";
      } else if (2 > loginInput.value.length || loginInput.value.length > 21) {
        loginInput.style.border = " 0.2rem solid red";
        this.warnModeCountry = true;
      } else {
        loginInput.style.border = " 0.2rem solid green";
        this.warnModeCountry = false;
      }
    },
    checkInputCity() {
      let loginInput = this.$refs.myCity;
      if (loginInput.value.length == 0) {
        this.warnModeCity = false;
        loginInput.style.border = " 0.2rem solid black";
      } else if (2 > loginInput.value.length || loginInput.value.length > 21) {
        loginInput.style.border = " 0.2rem solid red";
        this.warnModeCity = true;
      } else {
        loginInput.style.border = " 0.2rem solid green";
        this.warnModeCity = false;
      }
    },
    checkInputStudy() {
      let loginInput = this.$refs.myStudy;
      if (loginInput.value.length == 0) {
        this.warnModeStudy = false;
        loginInput.style.border = " 0.2rem solid black";
      } else if (5 > loginInput.value.length || loginInput.value.length > 50) {
        loginInput.style.border = " 0.2rem solid red";
        this.warnModeStudy = true;
      } else {
        loginInput.style.border = " 0.2rem solid green";
        this.warnModeStudy = false;
      }
    },
  },
  computed:{
    ...mapGetters(['dialogMode']),
  }
};
</script>

<style scoped>
.form_Container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
  position: relative;
}
.warnLogin {
  font-size: 1.4rem;
  position: absolute;
  top: 6.3rem;
  left: 52.5%;
  z-index: 2;
  color: red;
}
.warnPass {
  font-size: 1.4rem;
  position: absolute;
  top: 12.3rem;
  left: 52.5%;
  z-index: 2;
  color: red;
}
.warnName {
  font-size: 1.4rem;
  position: absolute;
  top: 18.3rem;
  left: 52.5%;
  z-index: 2;
  color: red;
}
.warnSurname {
  font-size: 1.4rem;
  position: absolute;
  top: 24.3rem;
  left: 52.5%;
  z-index: 2;
  color: red;
}
.warnAge {
  font-size: 1.4rem;
  position: absolute;
  top: 30.3rem;
  left: 52.5%;
  z-index: 2;
  color: red;
}
.warnCountry {
  font-size: 1.4rem;
  position: absolute;
  top: 36.3rem;
  left: 52.5%;
  z-index: 2;
  color: red;
}
.warnCity {
  font-size: 1.4rem;
  position: absolute;
  top: 42.3rem;
  left: 52.5%;
  z-index: 2;
  color: red;
}
.warnStudy {
  font-size: 1.4rem;
  position: absolute;
  top: 48.3rem;
  left: 52.5%;
  z-index: 2;
  color: red;
}
.form-group {
  width: 35rem;
  display: flex;
  justify-content: space-between;
  height: 5rem;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 500;
  color: rgb(0, 0, 0);
  margin-bottom: 1rem;
}
input {
  border-radius: 0.6rem;
  height: 3.5rem;
  font-size: 1.6rem;
  border: 0.2rem solid rgb(0, 0, 0);
  padding-left: 0.5rem;
}
input:focus {
  outline: none;
  border-color: red;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
