import http from './http'

// 获取热门标签分类
export function getHotTags(){
  return http.get('/playlist/hot')
}
// 获取热门标签列表
export function getHotTagsList(data){
  return http.get('/top/playlist/highquality',data)
}