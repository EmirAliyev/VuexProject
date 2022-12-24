<template>
  <div class="wrapper" @click="changeAllPhotos_f">
    <OpenedPhoto
      v-if="IncreasePhoto"
      :getData="getData"
    ></OpenedPhoto>
    <div class="photos__content" @click.stop>
      <div class="title">
        <span>Выберите фотографию</span>
        <hr />
      </div>
      <div class="photo_wrapper" v-for="photo in getData.photo">
        <img class="photo" :src="photo" @click="changePhoto(photo)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations,mapState } from "vuex";
import axios from "axios";
import OpenedPhoto from "@/components/OpenedPhoto.vue";
export default {
  name: "AllPhotos",
  props: {
    getData: Object,
  },
  components: {
    OpenedPhoto,
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(['IncreasePhoto_f','changeAllPhotos_f']),

    async changePhoto(photo) {
      if (this.avatarMode) {
        await axios.patch(`http://localhost:3000/allUsers/${this.getData.id}`, {
          avatar: photo,
          mainPhotoId: this.getData.photo.indexOf(photo),
        });
        window.location.reload();
      } else {
        this.IncreasePhoto_f()
        this.photoLink = photo;
      }
    },
  },
  computed:{
    ...mapState(['photoLink']),
    ...mapGetters(['avatarMode','IncreasePhoto'])
  }
};
</script>

<style scoped>
.wrapper {
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
.photos__content {
  margin: auto;
  background: white;
  max-height: 40rem;
  width: 50rem;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.3rem;
  padding: 0 1rem 1rem 1rem;
}
.photo {
  width: 15rem;
  height: 15rem;
  border-radius: 0.3rem;
  margin-top: 1rem;
  box-shadow: 0rem 0rem 0.3rem 0.2rem rgb(189, 189, 189);
  border: 1px solid rgb(236, 201, 201);
  margin-right: 1rem;
}
.title {
  font-size: 2.4rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 5rem;
  justify-content: space-around;
  text-align: center;
  font-family: "Open Sans-400";
}
</style>
