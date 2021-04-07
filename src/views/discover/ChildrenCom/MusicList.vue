<template>
  <div class="music-list">
    <div class="list-item" v-for="item in recMusicList" :key="item.id">
      <img :src="item.picUrl" alt="">
      <div class="title">{{item.name}}</div>
      <div class="count">
        <img src="~assets/img/discover/music-count.svg" alt />
        {{item.playCount}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    recMusicList:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.music-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
.list-item {
  position: relative;
  margin: 5px 6px;
  width: 150px;
  padding-bottom: 10px;
  font-size: 13px;
}
img{
  width: 100%;
}
.count {
  position: absolute;
  top: 0px;
  right: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: right;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))
}
.count img {
  display: inline-block;
  height: 15px;
  width: 15px;
  transform: translateY(3px);
}
</style>