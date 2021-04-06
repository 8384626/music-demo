<template>
  <div class="main">
    <div class="menu-left">
      <menu-left></menu-left>
    </div>
    <div class="login">
      <div style="width:400px">
        <login v-show="$store.getters.getShowLogin && !$store.state.user"></login>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login/Login'
import MenuLeft from 'components/content/MenuLeft/MenuLeft.vue';

export default {
  components:{
    Login,
    MenuLeft
  }
}
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: calc(100% - 54px - 59px);
}
.login{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transform: translateX(-5%);
}
</style>