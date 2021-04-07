<template>
  <div class="top-swiper">
    <el-carousel :interval="3000" type="card" height="300px" trigger="click">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>

<style>
</style>