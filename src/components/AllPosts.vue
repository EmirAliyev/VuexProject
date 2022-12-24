<template>
  <div class="app">
    <div v-if="currentUser">
      <AllUsers :users="users"></AllUsers>
    <div class="lenta_wrapper">
      <div @click="sortMode=!sortMode" class="sort_block">
<div class="title">Сортировать</div>
      </div>
      <div @click="sortByMin" class="selection" v-if="sortMode">Лайки &#129177</div>
<div @click="sortByMax" class="selection" v-if="sortMode">Лайки &#129179	
</div>
<div @click="withoutSort" class="selection" v-if="sortMode">Без сортировки</div>
      <div class="userPost" v-for="item,i in postsData  ">
        <div class="userName">
          <img @click="visit(i)" class="miniPhoto" :src="item[6]" />
          <div @click="visit(i)" class="about">{{ item[1] }}</div>
        </div>
        <img @click="openPhoto(item,i)" :src="item[0]" class="bigPhoto" />
        <LikeCommForPosts :postsData="postsData" :photo="item[0]" :users="users" :i="i" ></LikeCommForPosts>
      </div>
    </div>
    <OpenedPhoto
      v-if="IncreasePhoto"
      :getData="userInfo"
      :i="photoId
      "
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
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
      standart:true,
      maxLikes:false,
      minLikes:false,
      sortMode:false,
    };
  },
  methods: {
    ...mapActions(["loadData", "loadLenta"]),
    ...mapMutations(['userInfo_f','visitedUser_f','IncreasePhoto_f']),
    openPhoto(photo, i) {
      let index= this.nameSurname[i][3] -1 ;
      let photoIndex= this.nameSurname[i][4]
      this.userInfo_f(this.users[index])
      this.$store.state.photoLink = photo[0];
      this.IncreasePhoto_f()
      this.$store.state.photoId = photoIndex;
    },
    visit(i){
      let index= this.nameSurname[i][3] -1 ;
      this.$router.push({name:'userPage', params:{id: this.users[index].login}})
      this.visitedUser_f(this.users[index])
      this.$store.statefriendsMode=false;
   },
    sortMass(){
      this.loadLenta();
      let newMass=this.nameSurname
      for (let i=0;i<newMass.length;i++){
          for (let j=0;j<newMass.length-1;j++)
            if(newMass[j][2]>newMass[j+1][2]){
            let temp=newMass[j];
            newMass[j]=newMass[j+1]
            newMass[j+1]=temp
          }
        }
        return newMass
    },
     withoutSort(){
      this.standart=true,
      this.maxLikes=false,
      this.minLikes=false
  
    },
    sortByMax(){
      this.standart=false,
      this.maxLikes=true,
      this.minLikes=false
    },
    sortByMin(){
      this.standart=false,
      this.maxLikes=false,
      this.minLikes=true
    }
  },
  mounted() {
    this.loadData();
    this.loadLenta();
  },
  computed: {
    ...mapGetters(["users", "nameSurname",'photoId','currentUser','IncreasePhoto','userInfo']),
    postsData(){
      if(this.standart){
        return this.nameSurname
      } else if(this.minLikes){
         return this.sortMass()
      } else {
        return this.sortMass().reverse()
      }

    }
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
.sort_block{
  max-height: 30rem;
  min-height: 4rem;
  flex-direction: column;
  display: flex;
  font-size: 2rem;
margin: auto;
margin-top: 2rem;
background:rgb(48, 47, 47);
  width: 20rem;
  border-radius:0.3rem;
  justify-content:center;
  color:white;
  box-shadow:0rem 0rem 0.2rem 0.1rem;
  cursor:pointer;
}
.selection{
  max-height: 15rem;
  min-height: 4rem;
  width: 20rem;
  border-radius:0.3rem;
  margin: auto;
  cursor:pointer;
  font-size: 2rem;
  display: flex;
  justify-content:center;
  align-items:center;
  background:rgb(48, 47, 47);
  border-top: 0.1rem solid black;
  color:white;
  box-shadow:0rem 0rem 0.2rem 0.1rem
}
.sort_block:hover{
  background:rgb(214, 211, 211);
  color:black;
  transform: scale(1.05);
}
.selection:hover{
  background:rgb(214, 211, 211);
  color:black;
  transform: scale(1.05);
}
.about{
  margin-left: 1rem;
  cursor:pointer;
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
  cursor:pointer;
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
flex-direction: column;

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
