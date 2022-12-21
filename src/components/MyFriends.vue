<template>
  <transition name="friendsAnimation"><div v-if="getData.friends.length>0" class="friends_wrapper scroll" @mouseup="scrolling" @mousemove="scrolling" @mouseout="scrolling">
    <div class="user_wrapper" v-for="user in getData.friends">
      <img @click="visitUser(user[3])" :src="user[1]" class="userImg"/>
      <span>{{ user[0] }}</span>
    </div>
  </div>
  <div v-else class="friends_wrapper"><span class="warn">Список друзей пуст.</span></div>
</transition>
</template>

<script>
export default {
  name: "MyFriends",
  props: {
    getData: Object,
  },
  methods:{
    visitUser(user){
      this.$router.push({name:'userPage',params:{id:user}})
        this.$store.commit('friendsMode')
    },
    scrolling(){
      const block = document.querySelector('.scroll');

block.addEventListener('mousemove', (e) => {
  const t = e.currentTarget;
  const xx = Math.min(1, e.clientX / t.clientWidth);
  const yy = Math.min(1, e.clientY / t.clientHeight);
  block.scrollLeft = (t.scrollWidth - t.clientWidth) * xx;
  block.scrollTop = (t.scrollHeight - t.clientHeight) * yy;
});
    }
  }
};
</script>

<style scoped>
.friends_wrapper {
  width: 100%;
  height: 25rem;
  position: fixed;
  bottom: 0rem;
  background: white;
  box-shadow: 0rem 0rem 0.3rem 0rem;
  display: flex;
  align-items: center;
  overflow-x: auto;
  animation: showBlock .5s ease
}
.scroll {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
.userImg {
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  box-shadow:0rem 0rem 0.3rem 0.1rem ;
  cursor:pointer;
}
.user_wrapper {
  margin-left: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 25rem;
  max-width: 35rem;
  height: 20rem;
  justify-content: space-around;
}
.user_wrapper:last-child{
  margin-right: 5rem;
}
span {
  font-size: 1.8rem;
  font-family: 'Open Sans-400';
  text-align: center;
  cursor:pointer;
}
.warn{
  font-size: 2.4rem;
  margin: auto;
}
@keyframes showBlock {
  0% {
    opacity: 0;
    transform: translateY(6rem);
  }
  80% {
    transform: translateY(-3rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0rem);
  }
}

.friendsAnimation-enter-active {
  animation: friendsAnimation-in .5s;
}
.friendsAnimation-leave-active {
  animation: friendsAnimation-in .5s reverse;
}
@keyframes friendsAnimation-in {
  0% {
    opacity: 0;
    transform: translateY(6rem);
  }
  80% {
    transform: translateY(-3rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0rem);
  }
}


</style>
