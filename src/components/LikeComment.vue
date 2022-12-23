<template>
  <div class="like_comments_wrapper">
    <div class="likes">
      <img src="@/assets/heart.png" />&nbsp;
      <span class="text">{{ getData.likes[i][0] }}</span>
    </div>
    <div class="comments">
      <img
        src="@/assets/comments.png"
        @click="openPhoto(getData.photo[i], i)"
      />&nbsp;&nbsp;<span class="text_com">{{
        getData.comments[i].length
      }}</span>
    </div>
    <button :style="{ background: checkLikes? 'red' :'white',color: checkLikes? 'white' :'black'}"  class="like" @click="likePhoto">Мне нравится</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LikeComment",
  props: {
    getData: Object,
    i: Number,
  },
  data() {
    return {
    };
  },
  methods: {
    openPhoto(link, i) {
      this.$store.state.photoLink = link;
      this.$store.commit("IncreasePhoto");
      this.$store.state.photoId = i;
    },
    async likePhoto() {
      let id = this.getData.id;
      let likedPhoto = this.getData.likedBy[this.i];
      let newLikes = this.getData.likes[this.i];
      let likesCount = this.getData.likes[this.i][0];
      if (likedPhoto.includes(this.$store.getters.currentUser.id)) {
        newLikes.shift();
        likesCount--;
        likedPhoto.shift(this.$store.getters.currentUser.id);
        newLikes.unshift(likesCount);
      } else {
        newLikes.shift();
        likesCount++;
        newLikes.unshift(likesCount);
        likedPhoto.unshift(this.$store.getters.currentUser.id);
      }
      await axios.patch(`http://localhost:3000/allUsers/${id}`, {
        likedBy: this.getData.likedBy,
        likes: this.getData.likes,
      });
      await this.$store.dispatch("loadData");
      this.$store.commit("setLenta", this.$store.getters.users);

    },
  },
  computed: {
    //Функция берет массив с айдишниками пользователей, которые лайкнули данный пост и проверяет нет ли там айди текущего пользователя
    checkLikes() {
      let checkId = this.getData.likedBy[this.i];
      return checkId.includes(this.$store.getters.currentUser.id)
    },
  },
};
</script>
<style scoped>
.like_comments_wrapper {
  width: 60rem;
  min-height: 5rem;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.3rem 2rem 0rem 1rem;
  background: rgb(238, 237, 237);
  box-shadow: 0px 0px 0.1rem 0rem;
  border-radius: 0.3rem;
}
.text {
  position: absolute;
  top: 1rem;
  font-family: "Open Sans-400";
  font-size: 2rem;
}
.text_com {
  font-family: "Open Sans-400";
  position: absolute;
  top: -0.4rem;
  font-size: 2rem;
}
.comments {
  position: absolute;
  left: 8rem;
  top: 1.4rem;
}
.like{
  width: 15rem;
  height: 3rem;
  position: absolute;
  right: 3rem;
  top:50%;
  transform: translateY(-50%);
  border:0.1rem solid black;
  border-radius:0.3rem;
  font-size: 1.7rem;
  font-family: "Open Sans-400";
  padding-bottom: 0.2rem;
  transition: 0.2s;
  cursor:pointer;
}

.like:active{
  transform: rotateZ(-3deg);
  position: absolute;
  top:1rem;
}

img {
  width: 2.4rem;
}
</style>
