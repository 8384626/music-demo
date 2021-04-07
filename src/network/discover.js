import http from './http'

// 获取banner
export function getBannerSwiper(){
  return http.get('/banner',{type:0})
}

// 获取推荐歌单
export function getRecMusicList(){
  return http.get('/personalized',{limit:40})
}