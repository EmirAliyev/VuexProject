<template>
  <div class="like_comments_wrapper">
    <div class="likes">
      <img src="@/assets/heart.png" />&nbsp;
      <span class="text">{{ postsData[i][2] }}</span>
    </div>
    <div class="comments">
      <img src="@/assets/comments.png" @click="openPhoto(i)" />&nbsp;&nbsp;
      <span class="text_com">{{ postsData[i][5].length }}</span>
    </div>
    <button
      :style="{
        background: checkLikes ? 'red' : 'white',
        color: checkLikes ? 'white' : 'black',
      }"
      class="like"
      @click="likePhoto"
    >
      Мне нравится
    </button>
  </div>
</template>
<script>
import { mapGetters, mapMutations,mapActions } from "vuex";
import axios from "axios";
export default {
  name: "LikeCommForPosts",
  props: {
    i: Number,
    users: Array,
    photo: String,
    postsData:Array,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["loadData"]),
    ...mapMutations(['setLenta','IncreasePhoto_f']),
    openPhoto(i) {
      let index = this.nameSurname[i][4];
      let userInd = this.nameSurname[i][[3]] - 1;
      this.$store.state.userInfo = this.users[userInd];
      this.$store.state.photoLink = this.photo;
      this.IncreasePhoto_f()
      this.$store.state.photoId = index;
    },
    async likePhoto() {
      //likesID это массив, первый элемент которого содержит id Usera, а второй index его фотографии
      let id = this.nameSurname[this.i][3];
      let index = this.nameSurname[this.i][4];
      //this[i] это номер итерации цикла с компонента AllPosts,чтобы мы понимали на какой именно фотографии происходят действия и какие лайки и комменты для него подбирать
      //из другого массива.
      let user = this.users;
      let likedPhoto = user[id - 1].likedBy[index];
      let newLikes = user[id - 1].likes[index];
      let likesCount = user[id - 1].likes[index][0];
      if (likedPhoto.includes(this.currentUser.id)) {
        newLikes.shift();
        likesCount--;
        likedPhoto.shift(this.currentUser.id);
        newLikes.unshift(likesCount);
      } else {
        newLikes.shift();
        likesCount++;
        newLikes.unshift(likesCount);
        likedPhoto.unshift(this.currentUser.id);
      }
      await axios.patch(`http://localhost:3000/allUsers/${id}`, {
        likedBy: user[id - 1].likedBy,
        likes: user[id - 1].likes,
      });
      await this.loadData()
      this.setLenta(this.users);
      
    },
  },
  computed: {
    ...mapGetters(["nameSurname",'currentUser']),
    checkLikes() {
      let id = this.nameSurname[this.i][3];
      let index = this.nameSurname[this.i][4];
      let checkId = this.users[id - 1].likedBy[index];
      return checkId.includes(this.currentUser.id);
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
  background: rgb(226, 222, 222);
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
.like {
  width: 15rem;
  height: 3rem;
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  border: 0.1rem solid black;
  border-radius: 0.3rem;
  font-size: 1.7rem;
  font-family: "Open Sans-400";
  padding-bottom: 0.2rem;
  transition: 0.2s;
  cursor: pointer;
}

.like:active {
  transform: rotateZ(-3deg);
  position: absolute;
  top: 1rem;
}

img {
  width: 2.4rem;
}
</style>
