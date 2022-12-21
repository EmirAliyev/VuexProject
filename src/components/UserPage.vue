<template>
  <div class="app" @click="standartPage">
    <AllUsers :users="users"></AllUsers>
    <AllPhotos :getData="getData" v-if="$store.getters.allPhotos && getData.photo"></AllPhotos>
    <Registration
      v-if="$store.getters.editMode"
      :getData="getData"
    ></Registration>
    <OpenedPhoto
      v-if="$store.getters.IncreasePhoto && getData.photo"
      :getData="getData"
      :i="$store.getters.photoId"
    ></OpenedPhoto>
    <div class="info-wrapper">
      <div
        v-if="
          getData.token !== $store.getters.currentUser.token && !checkFriend
        "
        class="addUser"
        @click="addToMyFriends"
      >
        <img class="icon" src="@//assets/add-friend.png" />
        <span>Добавить в друзья</span>
      </div>
      <div
        v-if="getData.token !== $store.getters.currentUser.token && checkFriend"
        class="addUser"
        @click="removeFromMyFriends"
        :key="user.id"
      >
        <img class="icon remove" src="@//assets/removeUser.png" />
        <span>Удалить из друзей</span>
      </div>
      <div
        class="changeData"
        v-if="
          $store.getters.currentUser.token == getData.token ||
          $store.getters.currentUser.role == 'admin'
        "
        @click="goEditMode"
        @click.stop
      >
        <img class="changeDataIcon" src="@/assets/changeDataIcon.png" />
        <p>Изменить данные</p>
      </div>
      <img
        v-if="getData.avatar"
        class="mainPhoto"
        :src="getData.avatar"
        @click="openPhoto(getData.avatar, getData.mainPhotoId)"
      />      <img v-else class="mainPhoto" src="@/assets/newUser.png" />
      <div class="info-block">
        <div class="FIO_block desc">
          <img src="@/assets/id-card.png" class="icon" />
          <span>
            {{ getData.description.name }} {{ getData.description.surname }} -
            {{ getData.role }}</span
          >
        </div>
        <div class="age-block desc">
          <img class="icon" src="@/assets/age.png" />
          <span>Возраст: {{ getData.description.age }}</span>
        </div>
        <div class="study-block desc">
          <img class="icon" src="@/assets/free-icon-studying-3108251.png" />
          <span>Место учебы: {{ getData.study }}</span>
        </div>
        <div class="country-block desc">
          <img class="icon" src="@/assets/free-icon-countries-8654413.png" />
          <span>Страна: {{ getData.description.country }},&nbsp;</span>
          <img class="icon" src="@/assets/free-icon-apartment-8382916.png" />
          <span>{{ getData.description.city }}</span>
        </div>
        <div class="friends_and_photos">
          <div
            class="userFriends desc"
            @click.stop
            @click="$store.commit('friendsMode')"
          >
            <img class="icon" src="@//assets/group.png" />
            <span>Друзья</span>
          </div>
          <div
            class="userPhotos desc"
            @click="$store.commit('changeAllPhotos')"
          >
            <img class="icon" src="@//assets/photography.png" />
            <span>Все фото</span>
          </div>
        </div>
        <div class="addPhoto_wrp desc">
          <label
            @click.stop
            for="file"
            class="addNewPhoto btn"
            type="button"
            v-if="
              $store.getters.currentUser.role == 'admin' ||
              getData.token == $store.getters.currentUser.token
            "
            ><img class="icon" src="@/assets/add-image.png" />
            <span>Добавить фото</span></label
          >
          <form id="formElem">
            <input
              ref="myFile"
              id="file"
              name="file"
              type="file"
              accept="image/*,.png,.jpg,.jpeg,"
              @change="uploadImg"
            />
          </form>
        </div>
      </div>
      <div
        v-if="
          $store.getters.currentUser.role == 'admin' ||
          getData.token == $store.getters.currentUser.token
        "
        class="changeMainPhoto btn"
        @click="changeMainPhoto"
      >
        <img class="changePhotoIcon" src="@/assets/changePhoto.png" />
        <p class="changeTitle">Изменить аватарку</p>
      </div>
      <div class="allPhotos__wrapper" v-if="getData.photo.length>0">
        <div class="allPhotos">
          <img
            v-if="getData.photo[0]"
            :src="getData.photo[0]"
            class="sliderPhotos"
            @click="openPhoto(`${getData.photo[0]}`, 0)"
          />
          <img
            v-if="getData.photo[1]"
            :src="getData.photo[1]"
            class="sliderPhotos"
            @click="openPhoto(`${getData.photo[1]}`, 1)"
          />
          <img
            v-if="getData.photo[2]"
            :src="getData.photo[2]"
            class="sliderPhotos"
            @click="openPhoto(`${getData.photo[2]}`, 2)"
          />
          <img
            v-if="getData.photo[3]"
            :src="getData.photo[3]"
            class="sliderPhotos"
            @click="openPhoto(`${getData.photo[3]}`, 3)"
          />
        </div>
      </div>
    </div>
    <div class="user__Lenta" v-if="getData.photo.length>0">
      <div class="post__wrapper" v-for="(photo, i) in getData.photo" :key="i">
        <img @click="openPhoto(photo, i)" :src="photo" class="bigPhoto" />
        <LikeComment v-if="getData.photo" :getData="getData" :i="i"></LikeComment>
        <hr />
      </div>
    </div>
    <MyFriends v-if="$store.getters.friendsMode" :getData="getData"></MyFriends>
  </div>
</template>

<script>
import axios from "axios";
import AllUsers from "@/components/AllUsers.vue";
import AllPhotos from "@/components/AllPhotos.vue";
import OpenedPhoto from "@/components/OpenedPhoto.vue";
import LikeComment from "@/components/LikeComment.vue";
import Registration from "@/components/Registration.vue";
import MyFriends from "@/components/MyFriends.vue";

export default {
  name: "UserPage",
  components: {
    AllUsers,
    AllPhotos,
    OpenedPhoto,
    LikeComment,
    Registration,
    MyFriends,
  },
  data() {
    return {
      users: [],
      user: null,
      inputValue: "",
      file: "",
      changeMode: false,
    };
  },
  methods: {
    openPhoto(photo, i) {
      if(this.getData.photo.lent){
        this.$store.state.photoLink = photo;
      this.$store.commit("IncreasePhoto");
      this.$store.state.photoId = i;
      }

    },
    changeMainPhoto() {
      this.$store.commit("changeAllPhotos");
      this.$store.commit("avatarMode");
    },
    goEditMode() {
      this.$store.commit("editMode");
      this.$store.state.dialogMode = false;
      this.$store.commit("visitedUser", this.getData);
    },
    async uploadImg(event) {
      if (
        //Проверяем типы файлов
        this.$refs.myFile.value.split(".").pop() == "png" ||
        this.$refs.myFile.value.split(".").pop() == "jpg" ||
        this.$refs.myFile.value.split(".").pop() == "jpeg"
      ) {
        this.file = event.target.files[0];
        let id = this.user.id;
        let photoObject = await axios.get(
          `http://localhost:3000/allUsers/${id}`
        );
        let photoMass = photoObject.data.photo;
        const formData = new FormData();
        formData.append("file", this.file);
        let reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = async function () {
          photoMass.unshift(`${reader.result}`);
          await axios.patch(`http://localhost:3000/allUsers/${id}`, {
            photo: photoMass,
            avatar: `${reader.result}`
          });
          this.$store.state.mainPhotoId=0
          this.$store.dispatch('loadData')
        };
        //добавляем к новому фото свойства лайков и комментариев.  ЗАМЕТКА ДЛЯ СЕБЯ -------ЗДЕСЬ НАДО ПРОВЕРИТЬ, НУЖНО СОКРАТИТЬ! =====
        let user = await axios.get(`http://localhost:3000/allUsers/${id}`);
        let likesData = user.data.likes;
        let commentsData = user.data.comments;
        let LikedByMass= user.data.likedBy
        likesData.unshift([0]);
        commentsData.unshift([]);
        LikedByMass.unshift([])
        await axios.patch(`http://localhost:3000/allUsers/${id}`, {
          likes: likesData,
          comments: commentsData,
          likedBy: LikedByMass
        });
        window.location.reload()
      } else {
        alert("Не поддерживаемый тип файла!");
        return false;
      }
    },
    //Получаем с сервера массив с друзьями, закидываем туда нового друга и обратно отправляем. id нужен для проверки, чтобы не проверять весь массив
    async addToMyFriends() {
      let id = this.$store.getters.currentUser.id;
      let myFriends = await axios.get(`http://localhost:3000/allUsers/${id}`);
      let newFriend = [
        `${this.getData.description.name} ${this.getData.description.surname}`,
        `${this.getData.avatar}`,
        `${this.getData.id}`,
        `${this.getData.login}`,
      ];
      let friendsMass = myFriends.data.friends;
      friendsMass.unshift(newFriend);
      await axios.patch(`http://localhost:3000/allUsers/${id}`, {
        friends: friendsMass,
      });
      this.$store.dispatch("loadData");
    },
    //Получаем с сервера массив с друзьми. Берем с массива пользователей, у которых айди не равен айдишнику удаляемого пользователя и закидываем в новый массив
    async removeFromMyFriends() {
      let id = this.$store.getters.currentUser.id - 1;
      let friendsArr = this.users[id].friends;
      let newMass = [];
      friendsArr.filter((friend) => {
        if (friend[2] != this.getData.id) {
          newMass.push(friend);
        }
      });
      //А новый массив уже с удаленным пользователем уже на сервер.
      await axios.patch(`http://localhost:3000/allUsers/${id + 1}`, {
        friends: newMass,
      });
      this.$store.dispatch("loadData");
    },
    standartPage() {
      this.$store.state.editMode = false;
      this.$store.state.friendsMode = false;
    },
  },
  computed: {
    getData() {
      this.users = this.$store.getters.users;
      const user = this.users.find(
        (user) => user.login == this.$route.params.id
      );
      if (user) {
        return (this.user = user);
      } else {
        return (this.user = this.$store.getters.currentUser);
      }
    },
    //Проверка на наличие пользователя у вас в друзьях
    checkFriend() {
      if (this.getData.friends) {
        let id = this.$store.getters.currentUser.id - 1;
        let friendsMass = this.users[id].friends;
        return friendsMass.find((friend) => {
          return friend[2] == this.getData.id;
        });
      }
    },
  },
};
</script>

<style scoped>
.post__wrapper {
  width: 60rem;
  margin: auto;
  max-height: 80rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
}
.addUser {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: max-content;
  position: absolute;
  right: 4rem;
  top: 2rem;
}
.userFriends {
  cursor: pointer;
  width: max-content;
}
.userPhotos {
  cursor: pointer;
  margin-left: 3rem;
  margin-top: 0.2rem;
}
.friends_and_photos {
  display: flex;
}

.desc {
  display: flex;
  align-items: center;
}
span {
  margin-left: 1rem;
}
.icon {
  width: 3.5rem;
}
.remove {
  width: 2.8rem;
  margin-top: 0.2rem;
}

.post__wrapper:last-child {
  margin-bottom: 0rem;
}
.changePhotoIcon {
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
}
.changeData {
  min-width: 21rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.changeDataIcon {
  width: 2.4rem;
}
.changeTitle {
  margin-left: 3.2rem;
}
.addNewPhoto {
  display: flex;
  font-family: "Open Sans-400";
  border-radius: 0.5rem;
  color: rgb(0, 0, 0);
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.changeMainPhoto {
  min-width: 19.5rem;
  height: 4rem;
  font-size: 1.8rem;
  position: absolute;
  left: 6.5rem;
  color: rgb(6, 6, 224);
  align-items: center;
  display: flex;
  cursor: pointer;
}
.changeMainPhoto:hover {
  transform: scale(1.05);
  transition: 0.4s;
}
.changeMainPhoto:hover > img {
  transform: rotate(360deg);
  transition: 1s;
}
.info-wrapper {
  font-family: "Open Sans-400";
  font-size: 2rem;
  max-width: 100rem;
  height: 75rem;
  margin: auto;
  position: relative;
  background: white;
  animation: infoAnimation 1.5s ease 0.2s;
  border-bottom: 1px solid rgb(199, 197, 197);
}
.info-block {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: absolute;
  top: 7rem;
  left: 37rem;
}
.info-block > div {
  margin-bottom: 2rem;
}
.mainPhoto {
  width: 30rem;
  max-height: 38rem;
  margin-top: 5rem;
  margin-left: 2rem;
  border-radius: 0.3rem;
  box-shadow: 0rem 0rem 0.3rem 0rem;
  animation: mainPhoto 1.5s ease 0.2s;
  animation-fill-mode: backwards;
}
input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  bottom: 6rem;
  right: 40rem;
}
.allPhotos__wrapper {
  display: flex;
  position: absolute;
  bottom: 7rem;
  left: 50%;
  transform: translateX(-50%);
  border: 0.5rem solid rgb(221, 224, 224);
  justify-content: space-around;
  max-width: 65rem;
  height: 17rem;
  padding: 0 1rem;
}
.allPhotos {
  display: flex;
  justify-content: space-around;
  max-width: 70rem;
  align-items: center;
  animation: allPhotos 1.5s ease 0.2s;
  animation-fill-mode: backwards;
}
.sliderPhotos {
  width: 15rem;
  height: 15rem;
  border-radius: 1rem;
  margin-left: 1rem;
}
.sliderPhotos:first-child {
  width: 15rem;
  height: 15rem;
  border-radius: 1rem;
  margin-left: 0rem;
}
.app {
  background: rgb(238, 233, 233);
  height: 100%;
}
.user__Lenta {
  font-family: "Open Sans-400";
  font-size: 2rem;
  max-width: 100rem;
  margin: auto;
  position: relative;
  background: white;
  padding: 4rem 4rem 0rem 4rem;
  overflow: hidden;
}
.bigPhoto {
  width: 60rem;
  max-height: 70rem;
  box-shadow: 0px 0px 0.2rem 0rem;
  border-radius: 0.3rem;
  margin-bottom: 2rem;
}

hr {
  width: 100rem;
  border: 1px solid rgb(199, 197, 197);
  transform: translateX(-20%);
  margin-top: 5rem;
}

@keyframes btnAnimation {
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
@keyframes mainPhoto {
  0% {
    opacity: 0;
    transform: translateX(-4rem);
  }
  80% {
    transform: translateX(2rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0rem);
  }
}

@keyframes allPhotos {
  0% {
    opacity: 0;
    transform: translateX(6rem);
  }
  80% {
    transform: translateX(-3rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0rem);
  }
}

@keyframes infoAnimation {
  0% {
    opacity: 0;
    transform: translateX(-4rem);
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
