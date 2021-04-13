<template>
  <div class="exc-broadcast">
    <div class="content">
      <div class="item" v-for="(item,index) in broadcastList" :key="index">
        <div class="loco">
          <img src="~assets/img/discover/exc-videoicon.svg" alt />
        </div>
        <img :src="item.picUrl" alt />
        <div class="bottom">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    broadcastList:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.exc-broadcast {
  width: 100%;
  padding: 10px 0 0 0;
}
.content {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.item {
  position: relative;
  width: 300px;
  overflow: hidden;
  margin-right: 5px;
}
.item img {
  width: 300px;
}
.bottom {
  font-size: 13px;
  margin: 5px 0 10px 0;
}
.loco {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loco img {
  width: 20px;
  border: 50%;
}
</style>