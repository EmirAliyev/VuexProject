<template>
   <div class="left-wrapper">
      <transition name="animationShow"><div class="usersBlock" v-if="$store.getters.showMode">
         <p class="title">Список пользователей</p>
         <hr>
         <div class="eachUser" v-for="user in users" @click="visit(user)">
            <img :src="user.avatar" class="miniPhoto"> &nbsp;&nbsp;
{{user.description.name}} {{user.description.surname}}
         </div>
      </div>
   </transition>
      <div class="showUsers" @click="$store.commit('changeUserShow')">
<div class="arrow-right">
   <img src="@/assets/right.png" width="40px" v-if="$store.getters.showMode==false">
<img  v-else src="@/assets/left.png" width="40px">
</div>
</div>
   </div>
</template>


<script>
export default{
name: 'AllUsers',
props:{
   users:Array
},
data(){
   return{
      
   }
},
methods:{
   visit(user){
      this.$router.push({name:'userPage', params:{id: user.login}})
      this.$store.commit('visitedUser',user)
      this.$store.state.friendsMode=false;
   }
},
}
</script>
<style scoped>
.showUsers{
border-radius: 10px 20px 20px 10px;
background: white;
height: 150px;
width: 40px;
margin-left: 10px;
margin-top: 290px;
}
.showUsers:hover{
   background: rgb(221, 221, 221);
}
.arrow-right{
   display: flex;
   justify-content: center;
margin-top: 55px;
}
.usersBlock{
   width: 300px;
   height: 80vh;
   background:rgb(255, 255, 255);
   border-radius: 0px 6px 6px 0px;
   overflow-y: scroll;
   min-height: 600px;
   position: relative;
   box-shadow: 0rem 0rem 0.3rem 0.1rem grey
}

.animationShow-enter-active{
   animation: animationShow-in .5s;
}
.animationShow-leave-active {
   animation: animationShow-in .5s reverse;
}

@keyframes animationShow-in {
   0% {
        transform: translateX(-150%);
    }

    100%{
      transform: translateX();
    }
}

.left-wrapper{
   display: flex;
   justify-content: space-around;
   max-width: 350px;
   position: fixed;
   z-index: 2;
}
.eachUser{
height: 50px;
display: flex;
align-items: center;
font-size: 17px;
font-family: "Open Sans-400";
cursor: pointer;
}
.miniPhoto{
   width: 40px;
   border-radius: 50%;
   height: 40px;
   margin-left: 5px;
}
.title{
   font-size: 18px;
   font-family: "Open Sans-400";
   display: inline-block;
   margin-top: 10px;
   margin-bottom: 10px;
   margin-left: 15px;
}
hr{
border: rgb(206, 204, 204) 2px solid;
}

</style>