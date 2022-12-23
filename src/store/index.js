import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "axios";

export default new Vuex.Store({
  state: {
    signShow: false,
    dialogMode: true,
    users: [],
    login: "",
    pass: "",
    name: "",
    city: "",
    country: "",
    age: "",
    study: "",
    surname: "",
    auth: false,
    userShow: false,
    AllPhotos: false,
    IncreasePhoto: false,
    photoLink: "",
    currentUser: [],
    editMode: false,
    photoId:'',
    avatarMode:false,
    friendsMode:false,
    nameSurname:[],
    userInfo:[],
  },
  mutations: {
    changeSignMode(state) {
      state.signShow = !state.signShow;
    },
    changeMode(state) {
      state.dialogMode = !state.dialogMode;
    },
    setProducts(state, response) {
      state.users = response;
    },
    changeAuth(state) {
      state.auth = true;
    },
    changeUserShow(state) {
      state.userShow = !state.userShow;
    },
    changeAllPhotos(state) {
      state.AllPhotos = !state.AllPhotos;
    },
    IncreasePhoto(state) {
      state.IncreasePhoto = !state.IncreasePhoto;
    },
    currentUser(state, user) {
      state.currentUser = user;
    },
    editMode(state) {
      state.editMode = !state.editMode;
    },
    visitedUser(state, user) {
      state.login = user.login;
      state.pass = user.password;
      state.name = user.description.name;
      state.surname = user.description.surname;
      state.age = user.description.age;
      state.city = user.description.city;
      state.country = user.description.country;
      state.study = user.study;
    },
    cleanInputData(state) {
      state.login = "";
      state.pass = "";
      state.name = "";
      state.surname = "";
      state.age = "";
      state.study = "";
      state.country = "";
      state.city = "";
    },
    avatarMode(state){
      state.avatarMode=!state.avatarMode
    },
    friendsMode(state){
      state.friendsMode=!state.friendsMode
    },
    setLenta(state,response){
      state.nameSurname=[],
      response.forEach(user=>{
        let index=0;
        for(let i=0;i<user.photo.length;i++){
          let id= user.id
          let info= `${user.description.name} ${user.description.surname}`
          state.nameSurname.push([user.photo[i] ,info, user.likes[i][0],id,index++,user.comments[i],user.avatar])
        }
      })
    },
    userInfo(state,data){
      state.userInfo=data
    }
  },
  getters: {
    signShow(state) {
      return state.signShow;
    },
    dialogMode(state) {
      return state.dialogMode;
    },
    users(state) {
      return state.users;
    },
    login(state) {
      return state.login;
    },
    pass(state) {
      return state.pass;
    },
    name(state) {
      return state.name;
    },
    age(state) {
      return state.age;
    },
    surname(state) {
      return state.surname;
    },
    city(state) {
      return state.city;
    },
    country(state) {
      return state.country;
    },
    study(state) {
      return state.study;
    },
    auth(state) {
      return state.auth;
    },
    showMode(state) {
      return state.userShow;
    },
    allPhotos(state) {
      return state.AllPhotos;
    },
    IncreasePhoto(state) {
      return state.IncreasePhoto;
    },
    photoLink(state) {
      return state.photoLink;
    },
    currentUser(state) {
      return state.currentUser;
    },
    editMode(state) {
      return state.editMode;
    },
    visitedUser(state) {
      return state.visitedUser;
    },
    photoId(state){
      return state.photoId
    },
    avatarMode(state){
      return state.avatarMode
    },
    friendsMode(state){
      return state.friendsMode
    },
    nameSurname(state){
      return state.nameSurname
    },
    userInfo(state){
      return state.userInfo
    }
  },
  actions: {
    async loadData({ commit }) {
      return axios.get("http://localhost:3000/allUsers").then((response) => {
        commit("setProducts", response.data);
      });
    },
    async loadLenta({commit}){
      return axios.get('http://localhost:3000/allUsers').then(response=>{
        commit('setLenta', response.data)
      })
    }
  },
});
