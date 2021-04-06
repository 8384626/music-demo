<template>
  <div class="navbar">
    <div class="left">
      <div class="left-login">
        <img src="~assets/img/navbar/login.jpg" alt />
        <span>LastCode music</span>
      </div>
      <img class="left-back" src="~assets/img/navbar/back.svg" alt />
    </div>
    <div class="center">
      <music-search></music-search>
    </div>
    <div class="right">
      <div class="login" @click="showLogin">
        <div class="profile">
          <img :src="getImage" alt />
        </div>
        <div class="login-text">{{ getUserName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicSearch from "../Search/music-search";
export default {
  name: "NavBar",
  data() {
    return {
      image: "",
      statu: "未登录",
    };
  },
  methods:{
    showLogin(){
      this.$store.commit("showLogin")
    }
  },
  computed: {
    getImage() {
      this.image =
        this.$store.state.user && this.$store.state.user.profile.avatarUrl;
      return this.image;
    },
    getUserName() {
      if (this.$store.state.user == null) return this.statu;
      return (this.statu =
        this.$store.state.user && this.$store.state.user.profile.nickname);
    },
  },
  components: {
    MusicSearch,
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  height: 54px;
  line-height: 54px;
  background-color: rgb(46, 46, 46);
}
.left,
.right {
  display: flex;
  align-items: center;
  height: 54px;
  width: 300px;
}
.center {
  flex: 1;
}
/* 设置左侧部分 */
.left {
  justify-content: space-between;
  padding: 0 20px;
}
.left-login {
  display: flex;
  align-items: center;
}
.left-login img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.left-login span {
  margin-left: 8px;
  color: rgb(206, 206, 206);
}
.left-back {
  opacity: 0.6;
  transform: scale(0.7);
}
.left-back:hover {
  opacity: 0.9;
}
/* 设置右侧微信 */
.login{
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile{
  display: flex;
  align-content: center;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
}
.profile img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.login-text{
  margin-left: 10px;
  color: #eee;
}
</style>