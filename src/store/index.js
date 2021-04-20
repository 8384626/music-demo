import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    user:null,
    // 记录用户的唯一id
    uid:null,
    // 是否展示登录页面
    isShowLogin: false,
    // 记录当前controltab的ID
    ControlTabCurrentId:1,
    // 记录当前leftmenu的Id
    leftMenuId:2,
    artist:null,
    // 获取用户歌单
    SongList:[]
  },
  mutations: {
    showLogin(state){
      state.isShowLogin = !state.isShowLogin
    },
    addUserInfo(state,payload){
      state.user = payload
      state.uid = payload.profile.userId
    },
    setConrtrolTabCurrentId(state,payload){
      state.ControlTabCurrentId = payload
    },
    setLeftMenuId(state,payload){
      state.leftMenuId = payload
    },
    addArtist(state,payload){
      state.artist = payload
    },
    addSonglist(state,payload){
      state.SongList = payload
      console.log(state.SongList);
    }
  },
  actions: {
  },
  getters: {
    getShowLogin(state) {
      return state.isShowLogin;
    },
  },
  modules: {
  }
})
