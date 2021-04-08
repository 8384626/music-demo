import http from './http'

// 获取歌单详细信息
export function getMusicDetail(id){
  return http.get('/playlist/detail/dynamic',id)
}