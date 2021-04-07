<template>
  <div class="main">
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="login">
      <div style="width: 400px">
        <login
          v-show="$store.getters.getShowLogin && !$store.state.user"
        ></login>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login/Login";

export default {
  components: {
    Login,
  },
};
</script>

<style scoped>
.main {
  position: relative;
  width: calc(100% - 15%);
  height: calc(100% - 54px - 59px);
  margin-left: 15%;
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 999;
}
</style>