<template>
  <div class="collec-list" v-if="collectList!=null">
        <div class="content">
            <div class="item" v-for="(item,index) in collectList" :key="index">
                <img :src="item.avatarUrl" alt="">
                <div class="text">{{item.nickname}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:{
    collectList:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.collec-list{
    width: 100%;
}
.content{
display: flex;
flex-wrap: wrap;
}
.content .item{
    padding: 50px;
    text-align: center;
    font-size: 12px;
}
.item img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.text{
  margin-top: 5px;
}
</style>