<template>
  <div
    tabindex="0"
    @keydown.left="goLeft"
    @keydown.right="goRight"
    class="wrapper"
    @click="IncreasePhoto_f"
  >
    <div class="content__block" @click.stop>
      <img :src="photoLink" class="photo" />
      <LikeComment
        class="likeComments"
        :getData="getData"
        :i="photoId"
      ></LikeComment>
      <Comments
        :newI="photoId"
        :getData="getData"
      ></Comments>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapMutations } from "vuex";
import LikeComment from "@/components/LikeComment.vue";
import Comments from "@/components/Comments.vue";
export default {
  name: "OpenedPhoto",
  components: {
    LikeComment,
    Comments,
  }, 
  props: {
    getData: Object,
  },
  data() {
    return {};
  },
  methods: {
...mapMutations(['IncreasePhoto_f']),
    goLeft() {
      //Если мы открыли первую фотку с айди 0, то следующий раз когда мы нажмем "влево"
      if (this.photoId == 0) {
        //получим айди последней фотки в массиве
        this.$store.state.photoId = this.getData.photo.length - 1;
        //найдем эту фотку в массиве и присвоим ссылку переменной в src
        this.$store.state.photoLink =
          this.getData.photo[this.photoId];
      } else {
        this.$store.state.photoLink =
          this.getData.photo[this.photoId - 1];
        this.$store.state.photoId = this.photoId - 1;
      }
    },
    goRight() {
      //Принцип тот же
      if (this.photoId == this.getData.photo.length - 1) {
        this.$store.state.photoId = 0;
        this.$store.state.photoLink =
          this.getData.photo[this.photoId];
      } else {
        this.$store.state.photoLink =
          this.getData.photo[this.photoId + 1];
        this.$store.state.photoId = this.photoId + 1;
      }
    },
  },
  mounted() {
    document.querySelector(".wrapper").focus();
  },
  computed:{
    ...mapGetters(['photoId','photoLink'])
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
.content__block {
  width: 96rem;
  max-height: 70rem;
  background: white;
  border-radius: 0.5rem;
  margin: auto;
  padding: 0.5rem;
  position: relative;
}
.photo {
  width: 50rem;
  border-radius: 0.5rem;
  min-height: 35rem;
  max-height: 60rem;
  margin-bottom: 1.2rem;
}
.likeComments {
  width: 50rem;
  margin-bottom: 1rem;
}
</style>
