import http from './http'

// 获取banner
export function getBannerSwiper(){
  return http.get('/banner',{type:0})
}

// 获取推荐歌单
export function getRecMusicList(){
  return http.get('/personalized',{limit:14})
}

// 获取独家放送列表
export function getExcBroadcast(){
  return http.get('/personalized/privatecontent/list',{limit:6})
}

// 获取最新音乐
export function getNewSong(){
  return http.get('/personalized/newsong',{limit:16})
}