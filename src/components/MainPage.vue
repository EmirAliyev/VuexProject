<template>
  <div>
    <transition name="logIn" v-if="($store.getters.signShow && $store.getters.dialogMode)"><Authorization ></Authorization></transition>
<transition name="newAcc" v-else-if="($store.getters.signShow && $store.getters.dialogMode===false)" > <Registration ></Registration></transition>
<div class="wrapper">
  <div class="title"><span class="spanText">Пройди простейшую регистрацию и начни заводить новые знакомства прямо сейчас!</span>
    <img class="titlePhoto" src="@/assets/test1.jpg">
  </div>
</div>
  </div>
 </template>
 <script>
 import Authorization from './Authorization.vue';
 import Registration from './Registration.vue';
 export default{
   components:{
     Authorization,Registration
   },
   data(){
     return{
     }
   },
   created(){
    if(localStorage.getItem('user')){
      this.$router.push({name:'lenta'})
    }
   }

 }
 </script>
 
 <style scoped>
 html{
   font-size: 10px;
}
.logIn-enter-active,
.logIn-leave-active {
  transition: opacity 0.5s ease;
}

.logIn-enter-from,
.logIn-leave-to {
  opacity: 0;
}
.newAcc-enter-active,
.newAcc-leave-active {
  transition: opacity 0.5s ease;
}

.newAcc-enter-from,
.newAcc-leave-to {
  opacity: 0;
}

.wrapper{
  font-size: 3.2rem;
  color: rgb(255, 255, 255);
  text-align: center;
  margin: auto;
  background: url('@/assets/mainPage.png') 0% /cover ;
  opacity: 0.85;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 89.3vh; 
}
.title{
  max-width: 80rem;
  max-height: 40rem;
  background-color: rgb(5, 93, 255);
  display: flex ;
  align-items: center;
  justify-content: space-around;
  border-radius: 2rem;
  color: rgb(224, 220, 220);
flex-direction: column;
animation: titleAnimation 1.5s ease 0.5s
}
@keyframes titleAnimation{
  0%{
    opacity:0;
    transform: translateX(-8rem);
  }
  80%{
    transform: translateX(4rem);
  }
  100%{
    opacity: 1;
    transform: translateX(0rem);
  }
}
.titlePhoto{
  max-width: 70rem;
  max-height: 30rem;
}
.spanText{
  max-width: 70rem;
  margin-top: 2rem;}
  
</style>
 