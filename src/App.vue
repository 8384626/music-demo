<template>
  <div id="app">
    <nav-bar></nav-bar>
    <menu-left></menu-left>
    <Main></Main>
    <play-music></play-music>
  </div>
</template>
<script>
import NavBar from "components/content/NavBar/NavBar";
import Main from "components/content/Main.vue";
import MenuLeft from 'components/content/MenuLeft/MenuLeft.vue';
import PlayMusic from 'components/content/PlayMusic/PlayMusic.vue';

export default {
  name: "App",
  components: {
    NavBar,
    Main,
    MenuLeft,
    PlayMusic
  },
};
</script>

<style>
@import "assets/css/base.css";
#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  user-select: none;
  background: #16181c;
  color: #fff;
}
</style>
