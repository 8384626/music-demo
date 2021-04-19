<template>
  <div>
    <div>
      <singer-item :singer-list="singers"/>
    </div>
  </div>
</template>

<script>
import SingerItem from 'views/discover/ChildrenCom/SingerItem'
import {getSimiSinger} from 'network/singer'
export default {
  data(){
    return{
      artist: null,
      user:null,
      singers:[]
    }
  },
  components:{
    SingerItem
  },
  created(){
    this.artist = this.$store.state.artist;
    this.user = this.$store.state.user;
    if(this.artist !== null && this.user !== null ){
      getSimiSinger(this.artist.id).then(res =>{
        this.singers=res.artists;
      })
    }else{
      this.$message.warning('请先登录')
    }
  }
}
</script>

<style>

</style>