<template>
   <div class="app">
      <div>{{ getData.description.name }}</div>
      <img :src="photo[i]">
      <OnePost v-for="photo,i in getData.photo" :getData="photo,i" :key="getData.id"></OnePost>
   </div>
 </template>
 <script>
export default{
   name:"OnePost",
   props:{
      getData:Array,
      i:Number,
   }
}

</script>
<style scoped>
.app{
   display: flex;
   flex-direction: column;
   font-size: 2rem;
   width: 20rem;
}
</style>
 