import http from './http'

// 手机号登录
export function requestLogin(data) {
  return http.get("/login/cellphone",data)
}
// 热搜榜
export function TopSearch() {
  return http.get("/search/hot/detail")
}
// 用户收藏歌单
export function getUserSongList(uid){
  return http.get('/user/playlist',{uid})
}