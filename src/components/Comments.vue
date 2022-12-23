<template>
  <div class="comments_wrapper">
    <div class="yourComment">
      <label for="commentArea" class="title">Ваш комментарий</label>
      <textarea
        @keydown.enter="postNewComment"
        type="text"
        maxlength="145"
        minlength="1"
        id="commentArea"
        v-model="newComment"
      ></textarea>
      <button @click="postNewComment" type="button" class="sendBtn">
        <span>Отправить</span>
      </button>
    </div>
    <div class="allComents">
      <div
        class="comment"
        v-for="(comment, i) in getData.comments[newI] "
        :key="i"
      >
        <div class="userInfo" v-if="comment[1]">
          <img class="userMiniPhoto" :src="comment[1]" />
          <div class="userName">{{ comment[0] }}</div>
        </div>
        <hr class="line" />
        <p class="userText" v-if="editCommentMode == false">
          {{ comment[2] }}
        </p>
        <p class="userText" v-else>
          <textarea>{{ comment[2] }}</textarea>
        </p>
        <p class="del" @click="deleteComment(i)">Удалить</p>
        <span class="time">{{comment[3]}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let moment=require('moment')
export default {
  name: "Comments",
  props: {
    newI: Number,
    getData: Object,
  },
  data() {
    return {  
      newComment: "",
      editCommentMode: false,
      moment:moment 
    };
  },
  methods: {
    //Получаем массив с комментариями, добавляем новый коммент и отправляем обновленный массив обратно на сервер.
    async postNewComment() {
      let id = this.getData.id;
      let user = await axios.get(`http://localhost:3000/allUsers/${id}`);
      let commentMass = await user.data.comments;
        let newCommentFromUser = [
        `${this.$store.getters.currentUser.description.name} ${this.$store.getters.currentUser.description.surname}`,
        `${this.getData.avatar}`,
        `${this.newComment}`,
        this.moment().format('MMMM Do YYYY, h:mm:ss a')
      ];
      commentMass[this.$store.getters.photoId].unshift(newCommentFromUser);
      await axios.patch(`http://localhost:3000/allUsers/${id}`, {
        comments: commentMass,
      });
      this.newComment = "";
      this.getData;
      await this.$store.dispatch("loadData"); 
      this.$store.commit('userInfo',this.$store.getters.users[id-1])
      this.$store.dispatch('loadLenta')
    },
    //Получаем массив с комментариями, удаляем по ключу нужный коммент и отправляем обратно на сервер.
    async deleteComment(i) {
      let id = this.getData.id;
      let user = await axios.get(`http://localhost:3000/allUsers/${id}`);
      let commentMass = await user.data.comments;
      commentMass[this.newI].splice(i, 1);
      await axios.patch(`http://localhost:3000/allUsers/${id}`, {
        comments: commentMass,
      });
      await this.$store.dispatch("loadData");  
      this.$store.commit('userInfo',this.$store.getters.users[id-1])
      this.$store.dispatch('loadLenta')
    },
    editComment() {
      this.editCommentMode = !this.editCommentMode;
    },
  },
};
</script>

<style scoped>
.allComents {
  width: 39rem;
  text-align: justify;
  font-size: 1.6rem;
  font-family: "Open Sans-400";
  position: absolute;
  top: 18rem;
}
.userInfo {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}
.userName {
  font-size: 1.6rem;
  font-family: "Open Sans-400";
  margin-left: 1rem;
}
.del {
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  color: rgba(240, 7, 7, 0.788);
  cursor: pointer;
}
.time{
  position: absolute;
  bottom: 0.5rem;
  left: 1rem;
  color: rgba(4, 0, 255, 0.788);
}
.line {
  border: 1px solid rgb(223, 221, 218);
  margin-top: 1rem;
}
.edit {
  position: absolute;
  bottom: 0.5rem;
  right: 9rem;
  color: blue;
  cursor: pointer;
}
.comment {
  box-shadow: 0rem 0rem 0.2rem 0rem;
  padding: 0.1rem 0.5rem;
  margin-bottom: 0.5rem;
  width: 38rem;
  max-height: 18rem;
  margin-left: 1rem;
  position: relative;
  border-radius: 0.2rem;
}
.userText {
  width: 37rem;
  max-height: 8rem;
  text-align: justify;
  word-wrap: break-word;
  margin-top: 1rem;
  margin-bottom: 3rem;
}

::-webkit-scrollbar-track {
  position: absolute;
  top: 0;
  left: 0;
}
.userMiniPhoto {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
}
.comments_wrapper {
  max-width: 44rem;
  margin-right: 0.6rem;
  margin-top: 0.6rem;
  height: 97.5%;
  background: rgb(255, 255, 255);
  position: absolute;
  right: 0rem;
  top: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-left: 0.5rem;
}
.yourComment {
  max-width: 41rem;
  height: 16.5rem;
  position: relative;
  margin-bottom: 0.5rem;
}
.title {
  font-family: "Open Sans-400";
  font-size: 1.8rem;
  display: inline-block;
  border-bottom: 0.1rem grey solid;
  height: 3rem;
  width: 40rem;
  margin-right: 1rem;
  text-align: center;
}
#commentArea {
  position: absolute;
  max-height: 9rem;
  min-height: 9rem;
  min-width: 37.8rem;
  max-width: 37.8rem;
  border: 1px;
  font-size: 1.8rem;
  padding-left: 0.5rem;
  box-shadow: 0rem 0rem 0.2rem 0rem;
  top: 4rem;
  right: 2rem;
}

#commentArea:focus {
  outline: none;
  border: 0.1rem solid rgb(111, 159, 223);
}

.sendBtn {
  width: 10rem;
  height: 3rem;
  color: #fff;
  border-radius: 5px;
  padding: 0.1rem 2.5rem;
  font-family: "Open Sans-400", sans-serif;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  font-size: 1.6rem;
}
/* 3 */
.sendBtn {
  background: rgb(0, 45, 168);
  background: linear-gradient(0deg, rgb(8, 91, 124) 0%, rgb(39, 107, 175) 100%);
  line-height: 3.2rem;
  padding: 0;
  border: none;
  position: absolute;
  bottom: -0.5rem;
  right: 2rem;
}
.sendBtn span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.sendBtn:before,
.sendBtn:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}
.sendBtn:before {
  height: 0%;
  width: 2px;
}
.sendBtn:after {
  width: 0%;
  height: 2px;
}
.sendBtn:hover {
  background: transparent;
  box-shadow: none;
}
.sendBtn:hover:before {
  height: 100%;
}
.sendBtn:hover:after {
  width: 100%;
}
.sendBtn span:hover {
  color: rgba(2, 126, 251, 1);
}
.sendBtn span:before,
.sendBtn span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}
.sendBtn span:before {
  width: 2px;
  height: 0%;
}
.sendBtn span:after {
  width: 0%;
  height: 2px;
}
.sendBtn span:hover:before {
  height: 100%;
}
.sendBtn span:hover:after {
  width: 100%;
}
</style>
